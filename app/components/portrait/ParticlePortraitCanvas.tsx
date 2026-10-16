import { useEffect, useRef, useState } from "react";
import type { ParticlePortraitRenderer, PortraitStatus } from "./ParticlePortraitRenderer";
import { DEFAULT_PARTICLE_CONFIG, type ParticlePortraitProps } from "./types";
import "./portrait.css";

export function ParticlePortraitCanvas({ className = "", config }: ParticlePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<PortraitStatus>("loading");
  const {
    maxDesktopParticles, maxTabletParticles, maxMobileParticles, pointerInfluence,
    repulsionStrength, damping, idleNoiseAmp, depthParallaxAmp, assemblyDuration,
  } = { ...DEFAULT_PARTICLE_CONFIG, ...config };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    let cancelled = false;
    let renderer: ParticlePortraitRenderer | null = null;
    let cleanupListeners: (() => void) | undefined;
    setStatus("loading");

    // Keep Three.js out of the SSR/initial route bundle. Strict Mode may cancel
    // this import before it resolves; it must not create an orphan renderer.
    void import("./ParticlePortraitRenderer").then(({ ParticlePortraitRenderer }) => {
      if (cancelled) return;
      renderer = new ParticlePortraitRenderer(canvas, {
        maxDesktopParticles, maxTabletParticles, maxMobileParticles, pointerInfluence,
        repulsionStrength, damping, idleNoiseAmp, depthParallaxAmp, assemblyDuration,
      }, (next) => { if (!cancelled) setStatus(next); });
      const activeRenderer = renderer;
      const observer = new IntersectionObserver((entries) => {
        activeRenderer.setVisible(entries.some((entry) => entry.isIntersecting));
      }, { threshold: 0 });
      observer.observe(container);

      const handleScroll = () => {
        // On stacked mobile layouts, don't dissolve the face before it enters.
        const rect = container.getBoundingClientRect();
        const hero = container.closest<HTMLElement>("#hero");
        const heroTop = (hero?.getBoundingClientRect().top ?? 0) + window.scrollY;
        const portraitTop = rect.top + window.scrollY;
        const start = Math.max(heroTop + 40, portraitTop - window.innerHeight * 0.12);
        const distance = Math.max(rect.height * 0.75, 240);
        activeRenderer.setScrollProgress((window.scrollY - start) / distance);
      };
      const handleResize = () => {
        activeRenderer.updateDimensions();
        handleScroll();
      };
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch" || !hoverQuery.matches) return;
        activeRenderer.setPointer(event.clientX, event.clientY);
      };
      const handlePointerLeave = () => activeRenderer.onPointerLeave();
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("blur", handlePointerLeave);
      container.addEventListener("pointerleave", handlePointerLeave, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
      handleScroll();

      cleanupListeners = () => {
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("blur", handlePointerLeave);
        container.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }).catch((error: unknown) => {
      if (cancelled) return;
      cleanupListeners?.();
      renderer?.destroy();
      renderer = null;
      console.warn("Particle portrait unavailable; using the static sculpture:", error);
      setStatus("unavailable");
    });

    return () => {
      cancelled = true;
      cleanupListeners?.();
      renderer?.destroy();
    };
  }, [maxDesktopParticles, maxTabletParticles, maxMobileParticles, pointerInfluence,
    repulsionStrength, damping, idleNoiseAmp, depthParallaxAmp, assemblyDuration]);

  return (
    <div ref={containerRef} className={`hero-portrait-wrap ${className}`}
      data-portrait-status={status} aria-hidden="true">
      <img className="hero-portrait-static" src="/assets/portrait-sculpture-static.png"
        alt="" width="480" height="600" decoding="async" />
      <canvas ref={canvasRef} className="hero-portrait-canvas" />
    </div>
  );
}
