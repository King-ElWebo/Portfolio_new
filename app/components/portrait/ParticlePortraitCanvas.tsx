import React, { useEffect, useRef, useState } from "react";
import { ParticlePortraitRenderer } from "./ParticlePortraitRenderer";
import type { ParticlePortraitProps } from "./types";

export function ParticlePortraitCanvas({ className = "", config }: ParticlePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ParticlePortraitRenderer | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // SSR check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    // Check WebGL availability
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    try {
      const renderer = new ParticlePortraitRenderer(canvasRef.current, config);
      rendererRef.current = renderer;

      // 1. IntersectionObserver for offscreen rendering pause
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            renderer.setVisible(entry.isIntersecting);
          }
        },
        { threshold: 0.05 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      // 2. ResizeObserver for responsive dimension sync
      const resizeObserver = new ResizeObserver(() => {
        renderer.updateDimensions();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      // 3. Pointer event listeners
      const handlePointerMove = (e: PointerEvent) => {
        renderer.setPointer(e.clientX, e.clientY);
      };

      const handlePointerLeave = () => {
        renderer.onPointerLeave();
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave, { passive: true });

      // 4. Native scroll tracking for Hero dissolution
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const heroElem = document.getElementById("hero") || containerRef.current;
        if (!heroElem) {
          renderer.setScrollProgress(0);
          return;
        }

        const heroHeight = heroElem.offsetHeight || 800;
        // Dissolve starts after a small scroll buffer (e.g. 40px)
        const dissolveStart = 40;
        const dissolveEnd = heroHeight * 0.75;

        if (scrollY <= dissolveStart) {
          renderer.setScrollProgress(0);
        } else {
          const progress = Math.min(1.0, (scrollY - dissolveStart) / (dissolveEnd - dissolveStart));
          renderer.setScrollProgress(progress);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      // Call initial scroll
      handleScroll();

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
        resizeObserver.disconnect();
        renderer.destroy();
        rendererRef.current = null;
      };
    } catch (err) {
      console.warn("Failed to initialize WebGL ParticlePortraitRenderer:", err);
      setHasWebGL(false);
    }
  }, [isMounted, config]);

  return (
    <div
      ref={containerRef}
      className={`hero-portrait-wrap ${className}`}
      aria-label="Interactive 2.5D GPU particle portrait"
      style={{ touchAction: "none" }}
    >
      {/* Three.js GPU Canvas */}
      {hasWebGL && (
        <canvas
          ref={canvasRef}
          className="hero-portrait-canvas"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
            display: "block",
          }}
        />
      )}

      {/* Graceful Fallback (Visible during SSR, or when WebGL is unavailable) */}
      {(!isMounted || !hasWebGL) && (
        <svg
          className="hero-portrait-svg"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 400 480"
          role="img"
          aria-hidden={hasWebGL ? "true" : "false"}
        >
          <title>Abstract Dimensional Particle Silhouette</title>
          <defs>
            <radialGradient cx="50%" cy="42%" id="hero-particle-glow-fallback" r="50%">
              <stop offset="0%" stopColor="#ebbf87" stopOpacity="0.16" />
              <stop offset="55%" stopColor="#c7c6ca" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#0d0e11" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#hero-particle-glow-fallback)" height="480" width="400" />
          <g fill="#ebbf87" opacity="0.95">
            <circle cx="195" cy="180" r="1.9" />
            <circle cx="205" cy="180" r="1.9" />
            <circle cx="200" cy="198" r="1.8" />
            <circle cx="192" cy="222" r="1.7" />
            <circle cx="208" cy="222" r="1.7" />
            <circle cx="200" cy="230" r="1.6" />
            <circle cx="198" cy="245" r="1.8" />
          </g>
        </svg>
      )}
    </div>
  );
}
