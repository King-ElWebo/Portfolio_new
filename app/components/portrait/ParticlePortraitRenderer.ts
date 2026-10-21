import * as THREE from "three";
import { portraitVertexShader, portraitFragmentShader } from "./portraitShaders";
import { type ParticleConfig, DEFAULT_PARTICLE_CONFIG } from "./types";

export type PortraitStatus = "loading" | "ready" | "context-lost" | "unavailable";

export class ParticlePortraitRenderer {
  private readonly config: ParticleConfig;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(-1.04, 1.04, 1.3, -1.3, 0.1, 20);
  private readonly material: THREE.ShaderMaterial;
  private readonly abortController = new AbortController();
  private readonly motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  private geometry: THREE.BufferGeometry | null = null;
  private points: THREE.Points | null = null;
  private animationFrameId: number | null = null;
  private isDisposed = false;
  private isVisible = false;
  private contextLost = false;
  private shaderFailed = false;
  private failed = false;
  private ready = false;
  private lastFrameTime: number | null = null;
  private elapsedTime = 0;
  private assemblyProgress = 0;
  private targetScroll = 0;
  private currentScroll = 0;
  private targetActivity = 0;
  private pointerActivity = 0;
  private readonly targetPointer = new THREE.Vector3();
  private readonly currentPointer = new THREE.Vector3();
  private readonly lastPointer = new THREE.Vector3();
  private readonly pointerVelocity = new THREE.Vector2();
  private width = 0;
  private height = 0;
  private frameInterval = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    config?: Partial<ParticleConfig>,
    private readonly onStatus: (status: PortraitStatus) => void = () => {},
  ) {
    this.config = { ...DEFAULT_PARTICLE_CONFIG, ...config };
    // A preflight getContext() would lock in defaults and allocate extra contexts.
    this.renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: false, depth: false, powerPreference: "default",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.debug.onShaderError = () => {
      this.shaderFailed = true;
      console.warn("Portrait shader compilation failed; using the static sculpture.");
    };
    this.camera.position.z = 3.5;
    this.material = new THREE.ShaderMaterial({
      vertexShader: portraitVertexShader, fragmentShader: portraitFragmentShader,
      transparent: true, depthTest: false, depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 }, uProgress: { value: 0 }, uScrollProgress: { value: 0 },
        uPointer: { value: new THREE.Vector3() }, uPointerVelocity: { value: new THREE.Vector2() },
        uPointerActivity: { value: 0 },
        uPointerInfluence: { value: this.config.pointerInfluence },
        uPointerStrength: { value: this.config.repulsionStrength },
        uPixelRatio: { value: 1 }, uPointScale: { value: 1 },
        uReducedMotion: { value: this.motionQuery.matches ? 1 : 0 },
        uIdleNoiseAmp: { value: this.config.idleNoiseAmp },
      },
    });
    // Three restores its internal context before our listener resumes drawing.
    canvas.addEventListener("webglcontextlost", this.onContextLost);
    canvas.addEventListener("webglcontextrestored", this.onContextRestored);
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.motionQuery.addEventListener("change", this.onMotionChange);
    this.updateDimensions();
    void this.loadDataset();
  }

  private async loadDataset() {
    try {
      const response = await fetch("/assets/portrait-photo.bin", { signal: this.abortController.signal });
      if (!response.ok) throw new Error(`Portrait asset: HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();
      if (this.isDisposed) return;
      const stride = 12;
      if (!buffer.byteLength || buffer.byteLength % (stride * 4) !== 0) {
        throw new Error("Portrait asset has an invalid stride.");
      }
      const floats = new Float32Array(buffer);
      if (!floats.every(Number.isFinite)) throw new Error("Portrait asset contains invalid values.");
      // One immutable interleaved GPU buffer instead of four copied arrays.
      const particles = new THREE.InterleavedBuffer(floats, stride);
      this.geometry = new THREE.BufferGeometry();
      for (const [name, size, offset] of [
        ["position", 3, 0], ["aOriginalColor", 3, 3], ["aData", 4, 6],
        ["aDispersal", 2, 10],
      ] as const) {
        this.geometry.setAttribute(name, new THREE.InterleavedBufferAttribute(particles, size, offset));
      }
      this.points = new THREE.Points(this.geometry, this.material);
      // Resting bounds don't include shader flight paths.
      this.points.frustumCulled = false;
      this.scene.add(this.points);
      this.updateDrawRange();
      this.renderer.compile(this.scene, this.camera);
      if (this.shaderFailed) throw new Error("Portrait shader unavailable.");
      this.requestRender();
    } catch (error) {
      if (this.isDisposed || this.abortController.signal.aborted) return;
      console.warn("Could not initialize the particle sculpture:", error);
      this.failed = true;
      this.destroy();
      this.onStatus("unavailable");
    }
  }

  private updateDrawRange() {
    if (!this.geometry) return;
    const viewport = window.innerWidth;
    const count = viewport < 640 ? this.config.maxMobileParticles
      : viewport < 1024 ? this.config.maxTabletParticles : this.config.maxDesktopParticles;
    this.geometry.setDrawRange(0, Math.min(count, this.geometry.getAttribute("position").count));
  }

  public updateDimensions() {
    if (this.isDisposed) return;
    const { width, height } = this.canvas.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;
    const viewport = window.innerWidth;
    const cap = viewport < 640 ? 1.25 : viewport < 1024 ? 1.5 : 1.75;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, cap);
    this.frameInterval = viewport < 640 ? 1000 / 30 : 0;
    if (this.width !== width || this.height !== height || this.renderer.getPixelRatio() !== pixelRatio) {
      this.width = width;
      this.height = height;
      this.renderer.setPixelRatio(pixelRatio);
      this.renderer.setSize(width, height, false);
      this.camera.left = -1.3 * width / height;
      this.camera.right = 1.3 * width / height;
      this.camera.updateProjectionMatrix();
      this.material.uniforms.uPixelRatio.value = pixelRatio;
      this.material.uniforms.uPointScale.value = height / 600;
    }
    this.updateDrawRange();
    this.requestRender();
  }

  public setPointer(clientX: number, clientY: number) {
    if (this.motionQuery.matches || !this.points) return;
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height || clientX < rect.left || clientX > rect.right
      || clientY < rect.top || clientY > rect.bottom) {
      this.onPointerLeave();
      return;
    }
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = 1 - ((clientY - rect.top) / rect.height) * 2;
    this.targetPointer.set(ndcX * this.camera.right, ndcY * this.camera.top, 0);
    if (this.targetActivity === 0) {
      this.currentPointer.copy(this.targetPointer);
      this.lastPointer.copy(this.targetPointer);
    }
    this.targetActivity = 1;
    this.requestRender();
  }

  public onPointerLeave() {
    this.targetActivity = 0;
    this.requestRender();
  }

  public setScrollProgress(progress: number) {
    const next = THREE.MathUtils.clamp(progress, 0, 1);
    if (next === this.targetScroll) return;
    this.targetScroll = next;
    this.onPointerLeave();
    this.requestRender();
  }

  public setVisible(visible: boolean) {
    this.isVisible = visible;
    if (visible) this.requestRender();
    else this.stopRendering();
  }

  private canRender() {
    return !this.isDisposed && !this.failed && !this.contextLost && this.isVisible
      && !document.hidden && this.points !== null;
  }

  private requestRender() {
    if (!this.canRender() || this.animationFrameId !== null) return;
    this.animationFrameId = requestAnimationFrame(this.render);
  }

  private stopRendering() {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    this.lastFrameTime = null;
  }

  private onVisibilityChange = () => {
    if (document.hidden) this.stopRendering();
    else this.requestRender();
  };

  private onMotionChange = () => {
    this.material.uniforms.uReducedMotion.value = this.motionQuery.matches ? 1 : 0;
    this.onPointerLeave();
    this.pointerActivity = 0;
    this.pointerVelocity.set(0, 0);
    this.requestRender();
  };

  private onContextLost = (event: Event) => {
    event.preventDefault();
    this.contextLost = true;
    this.stopRendering();
    this.onStatus("context-lost");
  };

  private onContextRestored = () => {
    if (this.isDisposed) return;
    this.contextLost = false;
    this.ready = false;
    // Reuse CPU geometry/material. Three reuploads the GPU resources.
    this.requestRender();
  };

  private render = (timestamp: number) => {
    this.animationFrameId = null;
    if (!this.canRender()) return;
    if (this.lastFrameTime !== null && timestamp - this.lastFrameTime < this.frameInterval - 1) {
      this.requestRender();
      return;
    }
    const delta = this.lastFrameTime === null ? 0 : Math.min((timestamp - this.lastFrameTime) / 1000, 0.06);
    this.lastFrameTime = timestamp;
    const reduced = this.motionQuery.matches;
    if (!reduced) this.elapsedTime += delta;
    this.assemblyProgress = reduced ? 1 : Math.min(1, this.assemblyProgress + delta / this.config.assemblyDuration);
    const damping = 1 - Math.pow(1 - this.config.damping, delta * 60);
    this.currentPointer.lerp(this.targetPointer, damping);
    this.pointerVelocity.set(
      (this.currentPointer.x - this.lastPointer.x) / Math.max(delta, 0.001),
      (this.currentPointer.y - this.lastPointer.y) / Math.max(delta, 0.001),
    ).clampLength(0, 1.5);
    this.lastPointer.copy(this.currentPointer);
    this.pointerActivity += (this.targetActivity - this.pointerActivity) * damping;
    this.currentScroll = reduced ? this.targetScroll : THREE.MathUtils.lerp(this.currentScroll, this.targetScroll, 1 - Math.exp(-delta * 12));
    const uniforms = this.material.uniforms;
    uniforms.uTime.value = reduced ? 0 : this.elapsedTime;
    uniforms.uProgress.value = this.assemblyProgress;
    uniforms.uScrollProgress.value = this.currentScroll;
    uniforms.uPointer.value.copy(this.currentPointer);
    uniforms.uPointerVelocity.value.copy(this.pointerVelocity);
    uniforms.uPointerActivity.value = reduced ? 0 : this.pointerActivity;
    try {
      this.renderer.render(this.scene, this.camera);
      if (this.shaderFailed) throw new Error("Portrait shader unavailable.");
      if (!this.ready) {
        this.ready = true;
        this.onStatus("ready");
      }
      // Reduced motion renders once, then on resize/scroll/restore events only.
      if (!reduced) this.requestRender();
      else this.lastFrameTime = null;
    } catch (error) {
      console.warn("Portrait render failed:", error);
      this.failed = true;
      this.destroy();
      this.onStatus("unavailable");
    }
  };

  public destroy() {
    if (this.isDisposed) return;
    this.isDisposed = true;
    this.abortController.abort();
    this.stopRendering();
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.motionQuery.removeEventListener("change", this.onMotionChange);
    this.scene.clear();
    this.geometry?.dispose();
    this.material.dispose();
    this.renderer.dispose();
    // Strict Mode can immediately reuse this canvas; don't force context loss.
    this.geometry = null;
    this.points = null;
  }
}
