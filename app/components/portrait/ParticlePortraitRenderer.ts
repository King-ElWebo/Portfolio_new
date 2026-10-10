import * as THREE from "three";
import {
  portraitVertexShader,
  portraitFragmentShader,
} from "./portraitShaders";
import {
  type ParticleConfig,
  DEFAULT_PARTICLE_CONFIG,
} from "./types";

export class ParticlePortraitRenderer {
  private canvas: HTMLCanvasElement;
  private config: ParticleConfig;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private points: THREE.Points | null = null;
  private geometry: THREE.BufferGeometry | null = null;
  private material: THREE.ShaderMaterial | null = null;

  private animationFrameId: number | null = null;
  private clock: THREE.Clock = new THREE.Clock();

  // State
  private isDisposed = false;
  private isVisible = true;
  private assemblyProgress = 0.0;
  private scrollProgress = 0.0;
  private prefersReducedMotion = false;

  // Pointer tracking
  private targetPointer = new THREE.Vector3(999, 999, 0); // start far away
  private currentPointer = new THREE.Vector3(999, 999, 0);
  private lastPointer = new THREE.Vector3(999, 999, 0);
  private pointerVelocity = new THREE.Vector2(0, 0);
  private targetRotation = new THREE.Vector2(0, 0);
  private currentRotation = new THREE.Vector2(0, 0);

  // Resize handling
  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement, config?: Partial<ParticleConfig>) {
    this.canvas = canvas;
    this.config = { ...DEFAULT_PARTICLE_CONFIG, ...config };
    this.init();
  }

  private init() {
    if (typeof window === "undefined") return;

    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.prefersReducedMotion = motionQuery.matches;
    if (this.prefersReducedMotion) {
      this.assemblyProgress = 1.0;
    }

    // Set up WebGLRenderer
    const gl = this.canvas.getContext("webgl2") || this.canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported on this device/browser.");
      return;
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      depth: false,
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setClearColor(0x000000, 0);

    // Camera
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    this.camera.position.set(0, 0, 3.5);

    // Scene
    this.scene = new THREE.Scene();

    // Setup initial dimensions
    this.updateDimensions();

    // Material
    this.material = new THREE.ShaderMaterial({
      vertexShader: portraitVertexShader,
      fragmentShader: portraitFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: this.assemblyProgress },
        uScrollProgress: { value: 0 },
        uPointer: { value: new THREE.Vector3(999, 999, 0) },
        uPointerVelocity: { value: new THREE.Vector2(0, 0) },
        uPointerInfluence: { value: this.config.pointerInfluence },
        uPointerStrength: { value: this.config.repulsionStrength },
        uPixelRatio: { value: pixelRatio },
        uReducedMotion: { value: this.prefersReducedMotion ? 1.0 : 0.0 },
        uIdleNoiseAmp: { value: this.config.idleNoiseAmp },
      },
    });

    // Load particle binary dataset
    this.loadDataset();

    // Context loss handlers
    this.canvas.addEventListener("webglcontextlost", this.onContextLost, false);
    this.canvas.addEventListener("webglcontextrestored", this.onContextRestored, false);

    // Start render loop
    this.clock.start();
    this.render();
  }

  private async loadDataset() {
    try {
      const response = await fetch(`/assets/portrait-particles.bin?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Failed to load particle asset: HTTP ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      if (this.isDisposed || !this.scene || !this.material) return;

      const floats = new Float32Array(buffer);
      const stride = 13;
      const totalParticles = Math.floor(floats.length / stride);

      // Separate attributes
      const positions = new Float32Array(totalParticles * 3);
      const colors = new Float32Array(totalParticles * 3);
      const data = new Float32Array(totalParticles * 4);
      const dispersal = new Float32Array(totalParticles * 3);

      for (let i = 0; i < totalParticles; i++) {
        const offset = i * stride;
        // Position x, y, z
        positions[i * 3 + 0] = floats[offset + 0];
        positions[i * 3 + 1] = floats[offset + 1];
        positions[i * 3 + 2] = floats[offset + 2];

        // Color r, g, b
        colors[i * 3 + 0] = floats[offset + 3];
        colors[i * 3 + 1] = floats[offset + 4];
        colors[i * 3 + 2] = floats[offset + 5];

        // Data x(size), y(alpha), z(featWeight), w(phase)
        data[i * 4 + 0] = floats[offset + 6];
        data[i * 4 + 1] = floats[offset + 7];
        data[i * 4 + 2] = floats[offset + 8];
        data[i * 4 + 3] = floats[offset + 9];

        // Dispersal x, y, z
        dispersal[i * 3 + 0] = floats[offset + 10];
        dispersal[i * 3 + 1] = floats[offset + 11];
        dispersal[i * 3 + 2] = floats[offset + 12];
      }

      this.geometry = new THREE.BufferGeometry();
      this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      this.geometry.setAttribute("aOriginalColor", new THREE.BufferAttribute(colors, 3));
      this.geometry.setAttribute("aData", new THREE.BufferAttribute(data, 4));
      this.geometry.setAttribute("aDispersal", new THREE.BufferAttribute(dispersal, 3));

      // Choose draw count based on screen width
      this.updateDrawRange(totalParticles);

      this.points = new THREE.Points(this.geometry, this.material);
      this.scene.add(this.points);
    } catch (err) {
      console.warn("Could not load portrait particle buffer:", err);
    }
  }

  private updateDrawRange(totalAvailable: number) {
    if (!this.geometry) return;
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    let count = this.config.maxDesktopParticles;
    if (w < 640) {
      count = this.config.maxMobileParticles;
    } else if (w < 1024) {
      count = this.config.maxTabletParticles;
    }
    const finalCount = Math.min(count, totalAvailable);
    this.geometry.setDrawRange(0, finalCount);
  }

  public updateDimensions() {
    if (!this.renderer || !this.camera || !this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 100);
    const height = Math.max(rect.height, 100);

    if (this.width !== width || this.height !== height) {
      this.width = width;
      this.height = height;
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      if (this.material) {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.material.uniforms.uPixelRatio.value = pixelRatio;
      }

      if (this.geometry) {
        const total = this.geometry.attributes.position ? this.geometry.attributes.position.count : 42000;
        this.updateDrawRange(total);
      }
    }
  }

  /**
   * Translates client pointer coordinates (relative to canvas) into 3D world space
   */
  public setPointer(clientX: number, clientY: number) {
    if (!this.canvas || !this.camera) return;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Check if pointer is within or approaching canvas
    const margin = 120; // extra influence margin around canvas
    if (
      clientX < rect.left - margin ||
      clientX > rect.right + margin ||
      clientY < rect.top - margin ||
      clientY > rect.bottom + margin
    ) {
      this.onPointerLeave();
      return;
    }

    // Normalized Device Coordinates (-1 to 1)
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);

    // Unproject to portrait plane (z = 0)
    // In perspective camera at z = 3.5:
    const vFovRad = (this.camera.fov * Math.PI) / 180;
    const planeHeightAtZ0 = 2 * Math.tan(vFovRad / 2) * this.camera.position.z;
    const planeWidthAtZ0 = planeHeightAtZ0 * this.camera.aspect;

    const worldX = (ndcX * planeWidthAtZ0) / 2;
    const worldY = (ndcY * planeHeightAtZ0) / 2;

    this.targetPointer.set(worldX, worldY, 0);

    // Subtle whole-cloud rotation for depth parallax
    this.targetRotation.set(
      -ndcY * this.config.depthParallaxAmp,
      ndcX * this.config.depthParallaxAmp
    );
  }

  public onPointerLeave() {
    // Return pointer to far-away position
    this.targetPointer.set(999, 999, 0);
    this.targetRotation.set(0, 0);
  }

  public setScrollProgress(progress: number) {
    this.scrollProgress = Math.max(0, Math.min(progress, 1));
  }

  public setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  private onContextLost = (e: Event) => {
    e.preventDefault();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  };

  private onContextRestored = () => {
    this.init();
  };

  private render = () => {
    if (this.isDisposed) return;

    this.animationFrameId = requestAnimationFrame(this.render);

    if (!this.isVisible || !this.renderer || !this.scene || !this.camera || !this.material) {
      return;
    }

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Advance initial assembly animation
    if (!this.prefersReducedMotion && this.assemblyProgress < 1.0) {
      this.assemblyProgress += delta / this.config.assemblyDuration;
      if (this.assemblyProgress > 1.0) this.assemblyProgress = 1.0;
      this.material.uniforms.uProgress.value = this.assemblyProgress;
    }

    // 2. Smooth pointer position tracking (lerp damping)
    this.currentPointer.lerp(this.targetPointer, this.config.damping);
    this.material.uniforms.uPointer.value.copy(this.currentPointer);

    // Pointer velocity
    const vx = (this.currentPointer.x - this.lastPointer.x) / (delta + 0.001);
    const vy = (this.currentPointer.y - this.lastPointer.y) / (delta + 0.001);
    this.pointerVelocity.set(vx, vy);
    this.material.uniforms.uPointerVelocity.value.copy(this.pointerVelocity);
    this.lastPointer.copy(this.currentPointer);

    // 3. Smooth cloud rotation for depth parallax
    this.currentRotation.lerp(this.targetRotation, 0.06);
    if (this.points) {
      this.points.rotation.x = this.currentRotation.x;
      this.points.rotation.y = this.currentRotation.y;
    }

    // 4. Update uniforms
    this.material.uniforms.uTime.value = elapsedTime;
    this.material.uniforms.uScrollProgress.value = this.scrollProgress;

    // Render scene
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDisposed = true;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.canvas) {
      this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
      this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
    }

    if (this.points && this.scene) {
      this.scene.remove(this.points);
    }

    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }

    if (this.material) {
      this.material.dispose();
      this.material = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }

    this.scene = null;
    this.camera = null;
  }
}
