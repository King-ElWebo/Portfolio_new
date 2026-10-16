import { useEffect, useRef } from "react";
import type { Translations } from "~/i18n/translations";

interface CapabilityLayersProps {
  labels: Translations["capabilities"]["visual"];
}

export function CapabilityLayers({ labels }: CapabilityLayersProps) {
  const figureRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || !("IntersectionObserver" in window) || typeof figure.animate !== "function") {
      return;
    }

    const target = figure;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let animations: Animation[] = [];

    function observe() {
      if (motionPreference.matches || hasPlayed.current) return;

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting) || hasPlayed.current) return;
          hasPlayed.current = true;
          observer?.disconnect();

          const planes = target.querySelectorAll<HTMLElement>(".capability-layer-plane");
          animations = Array.from(planes, (plane) => {
            const restingTransform = getComputedStyle(plane).transform;
            return plane.animate(
              [
                { transform: restingTransform },
                { transform: "translateZ(0px)", offset: 0.35 },
                { transform: "translateZ(0px)", offset: 0.57 },
                { transform: restingTransform },
              ],
              {
                duration: 3000,
                easing: "cubic-bezier(0.77, 0, 0.175, 1)",
                iterations: 1,
              },
            );
          });
        },
        { threshold: 0.4 },
      );
      observer.observe(target);
    }

    function handlePreferenceChange() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      observe();
    }

    observe();
    motionPreference.addEventListener("change", handlePreferenceChange);
    return () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      motionPreference.removeEventListener("change", handlePreferenceChange);
    };
  }, []);

  return (
    <div
      className="capability-layers"
      role="img"
      aria-label={labels.description}
      ref={figureRef}
    >
      <div className="capability-layer-stack" aria-hidden="true">
        <div className="capability-layer-plane capability-layer-data">
          <div className="capability-layer-data-row"><span /><span /><span /></div>
          <div className="capability-layer-data-row"><span /><span /><span /></div>
          <div className="capability-layer-data-row"><span /><span /><span /></div>
          <div className="capability-layer-data-row"><span /><span /><span /></div>
        </div>
        <div className="capability-layer-plane capability-layer-logic">
          <svg viewBox="0 0 130 80" fill="none" aria-hidden="true">
            <path d="M30 40H52M76 40H100" stroke="currentColor" strokeWidth="1" />
            <rect x="5" y="29" width="25" height="22" stroke="currentColor" strokeWidth="1" />
            <rect x="52" y="29" width="24" height="22" stroke="currentColor" strokeWidth="1" />
            <rect x="100" y="29" width="25" height="22" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="capability-layer-plane capability-layer-interface">
          <div className="capability-layer-interface-heading" />
          <div className="capability-layer-interface-grid">
            <div className="capability-layer-interface-media" />
            <div className="capability-layer-interface-copy"><span /><span /><span /></div>
          </div>
        </div>
      </div>
      <span className="capability-layer-label capability-layer-label-interface" aria-hidden="true">{labels.interface}</span>
      <span className="capability-layer-label capability-layer-label-logic" aria-hidden="true">{labels.logic}</span>
      <span className="capability-layer-label capability-layer-label-data" aria-hidden="true">{labels.data}</span>
    </div>
  );
}
