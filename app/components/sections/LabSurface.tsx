import { useEffect, useRef, useState } from "react";

export type LabConceptKey = "lumen" | "roest" | "kern";

interface SurfacePose { twist: number; bend: number; turn: number; lean: number }
interface SurfaceLine { points: string; opacity: number; highlight: boolean }
interface LabSurfaceProps { concept: LabConceptKey; animateSelection: boolean; description: string; caption: string }

function restingPose(concept: LabConceptKey): SurfacePose {
  const forms = { lumen: { twist: .9, bend: .25 }, roest: { twist: 1.8, bend: -.25 }, kern: { twist: .28, bend: .48 } };
  return { ...forms[concept], turn: -.24, lean: 0 };
}

function surfaceLines(pose: SurfacePose, unfold = 0): SurfaceLine[] {
  const lines: SurfaceLine[] = [];
  const angle = pose.turn + unfold * .42;
  const rotationCos = Math.cos(angle), rotationSin = Math.sin(angle);
  for (let row = 0; row <= 40; row++) {
    const v = row / 40 * 2 - 1;
    const theta = v * (pose.twist + unfold * .65);
    const spread = .56 + .14 * Math.cos(v * Math.PI);
    const points: string[] = [];
    let depth = 0;
    for (let column = 0; column <= 48; column++) {
      const u = column / 48 * 2 - 1;
      const x = u * spread * Math.cos(theta);
      const z = u * spread * Math.sin(theta) + Math.cos(u * Math.PI) * Math.sin(v * Math.PI * .8) * .22;
      const rotatedX = x * rotationCos + z * rotationSin;
      const rotatedZ = -x * rotationSin + z * rotationCos;
      const y = v * .77 + pose.bend * (1 - u * u) * Math.sin(v * Math.PI) * .34 + pose.lean * rotatedX * .15;
      const perspective = 2.6 / (2.6 - rotatedZ);
      points.push((180 + rotatedX * 235 * perspective).toFixed(2) + "," + (230 + y * 235 * perspective).toFixed(2));
      depth += rotatedZ;
    }
    lines.push({ points: points.join(" "), opacity: Math.max(.18, Math.min(.9, .48 + depth / 49 * .7)), highlight: row % 7 === 0 });
  }
  return lines;
}

export function LabSurface({ concept, animateSelection, description, caption }: LabSurfaceProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const poseRef = useRef(restingPose(concept));
  const previousConcept = useRef(concept);
  const hasEntered = useRef(false);
  const [initialLines] = useState(() => surfaceLines(restingPose(concept)));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const target = svg;
    const lineElements = Array.from(target.querySelectorAll<SVGPolylineElement>("polyline"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const basePose = restingPose(concept);
    const changed = previousConcept.current !== concept;
    previousConcept.current = concept;
    const box = target.getBoundingClientRect();
    let visible = box.top < window.innerHeight && box.bottom > 0;
    let frame = 0;
    let unfold = 0;

    function draw() {
      surfaceLines(poseRef.current, unfold).forEach((line, index) => {
        lineElements[index].setAttribute("points", line.points);
        lineElements[index].setAttribute("opacity", String(line.opacity));
      });
    }

    function settle() {
      window.cancelAnimationFrame(frame);
      frame = 0;
      unfold = 0;
      poseRef.current = { ...basePose };
      draw();
    }

    function moveTo(next: SurfacePose, duration: number, entrance = false) {
      window.cancelAnimationFrame(frame);
      if (preference.matches || document.hidden || !visible) { settle(); return; }
      const origin = { ...poseRef.current };
      const fromUnfold = entrance ? .85 : unfold;
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        poseRef.current = {
          twist: origin.twist + (next.twist - origin.twist) * eased,
          bend: origin.bend + (next.bend - origin.bend) * eased,
          turn: origin.turn + (next.turn - origin.turn) * eased,
          lean: origin.lean + (next.lean - origin.lean) * eased,
        };
        unfold = fromUnfold * (1 - eased);
        draw();
        frame = progress < 1 ? window.requestAnimationFrame(tick) : 0;
      }
      frame = window.requestAnimationFrame(tick);
    }

    function pointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || !finePointer.matches || preference.matches) return;
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      moveTo({ ...basePose, turn: -.24 + x * .65, lean: y * .9 }, 650);
    }
    function pointerLeave() { moveTo(basePose, 950); }
    function visibilityChange() { if (document.hidden) settle(); }

    if (changed && animateSelection && hasEntered.current) moveTo(basePose, 1200);
    else settle();

    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (!visible) { settle(); return; }
      if (!hasEntered.current) {
        hasEntered.current = true;
        moveTo(basePose, 2400, true);
      }
    }, { threshold: .15 }) : undefined;
    observer?.observe(target);
    target.addEventListener("pointermove", pointerMove, { passive: true });
    target.addEventListener("pointerleave", pointerLeave);
    preference.addEventListener("change", settle);
    finePointer.addEventListener("change", settle);
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      target.removeEventListener("pointermove", pointerMove);
      target.removeEventListener("pointerleave", pointerLeave);
      preference.removeEventListener("change", settle);
      finePointer.removeEventListener("change", settle);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, [concept, animateSelection]);

  return (
    <figure className="lab-surface-figure">
      <div className="lab-surface-art">
        <span className="lab-surface-echo" aria-hidden="true">LAB</span>
        <svg className="lab-surface-svg" viewBox="0 0 360 500" role="img" aria-label={description} ref={svgRef}>
          {initialLines.map((line, index) => <polyline key={index} className={"lab-surface-line" + (line.highlight ? " lab-surface-highlight" : "")} points={line.points} opacity={line.opacity} fill="none" />)}
        </svg>
      </div>
      <figcaption className="lab-surface-caption">{caption}</figcaption>
    </figure>
  );
}
