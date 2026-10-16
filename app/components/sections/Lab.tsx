import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Locale, Translations } from "~/i18n/translations";
import { LabSurface, type LabConceptKey } from "./LabSurface";
import "~/styles/lab.css";

interface LabProps {
  t: Translations;
  locale: Locale;
}

const concepts = [
  { key: "lumen", slug: "lumenwerk-studio", directory: "lumenwerk", title: "LUMENWERK Studio" },
  { key: "roest", slug: "roestwerk-1070", directory: "roestwerk", title: "RÖSTWERK 1070" },
  { key: "kern", slug: "kern-field", directory: "kern-field", title: "KERN / FIELD" },
] as const;

function imageBase(directory: string) {
  return "/assets/projects/" + directory + "/lab-preview";
}

export function Lab({ t, locale }: LabProps) {
  const [selection, setSelection] = useState<{ key: LabConceptKey; animate: boolean }>({ key: "lumen", animate: false });
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLImageElement>(null);
  const previousKey = useRef<LabConceptKey>("lumen");
  const pointerSelection = useRef(false);
  const lab = t.lab;

  useEffect(() => {
    const section = sectionRef.current;
    const ghost = ghostRef.current;
    const oldKey = previousKey.current;
    previousKey.current = selection.key;
    if (!section || !ghost || oldKey === selection.key || !selection.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const oldImage = section.querySelector<HTMLImageElement>(`[data-concept="${oldKey}"] .lab-project-image`);
    const nextImage = section.querySelector<HTMLImageElement>(`[data-concept="${selection.key}"] .lab-project-image`);
    if (!oldImage || !nextImage || typeof nextImage.animate !== "function") return;

    let cancelled = false;
    let animations: Animation[] = [];
    ghost.src = oldImage.currentSrc || oldImage.src;
    ghost.hidden = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    function stop() {
      cancelled = true;
      animations.forEach((animation) => animation.cancel());
      ghost!.hidden = true;
    }

    function transition() {
      if (cancelled || preference.matches || document.hidden) { stop(); return; }
      const options = { duration: 650, easing: "cubic-bezier(0.23, 1, 0.32, 1)" };
      const exit = ghost!.animate(
        [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-12px)" }], options,
      );
      const enter = nextImage!.animate(
        [{ transform: "translateY(14px) scale(1.015)" }, { transform: "translateY(0) scale(1)" }], options,
      );
      animations = [exit, enter];
      exit.onfinish = () => { ghost!.hidden = true; };
    }

    function visibilityChange() { if (document.hidden) stop(); }
    if (nextImage.complete) transition();
    else {
      nextImage.addEventListener("load", transition, { once: true });
      nextImage.addEventListener("error", stop, { once: true });
    }
    preference.addEventListener("change", stop);
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      stop();
      nextImage.removeEventListener("load", transition);
      nextImage.removeEventListener("error", stop);
      preference.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, [selection]);

  return (
    <section className="max-w-7xl lab-container lab-stage-section" id="lab" aria-labelledby="lab-heading" ref={sectionRef}>
      <header className="lab-heading-block">
        <p className="lab-kicker">{lab.kicker}</p>
        <h2 className="lab-heading" id="lab-heading">{lab.headline.lead}<em>{lab.headline.accent}</em></h2>
        <p className="lab-intro">{lab.intro}</p>
      </header>

      <div className="lab-stage-layout">
        <div className="lab-project-stage" aria-live="polite" aria-atomic="true">
          {concepts.map((concept) => {
            const copy = lab.concepts[concept.key];
            const base = imageBase(concept.directory);
            return (
              <article className={"lab-project-panel lab-project-" + concept.key} id={"lab-panel-" + concept.key} data-concept={concept.key} key={concept.key}>
                <Link className="lab-case-link" to={"/" + locale + "/work/" + concept.slug} aria-label={concept.title + " — " + lab.caseStudyLink}>
                  <figure>
                  <div className="lab-project-picture">
                    <img className="lab-project-image" src={base + "-1080.webp"} srcSet={base + "-720.webp 720w, " + base + "-1080.webp 1080w"}
                      sizes="(max-width: 760px) calc(100vw - 3rem), (max-width: 1280px) 57vw, 720px"
                      alt={copy.imageAlt} width={1080} height={675} loading="lazy" decoding="async" />
                  </div>
                  <figcaption>
                    <p className="lab-concept-kind">{lab.conceptLabel}</p>
                    <h3 className="lab-project-title">{concept.title}</h3>
                    <p className="lab-project-description">{copy.description}</p>
                    <span className="lab-case-action">{lab.caseStudyLink}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
                  </figcaption>
                  </figure>
                </Link>
              </article>
            );
          })}
          <img className="lab-project-ghost" src="/assets/projects/lumenwerk/lab-preview-1080.webp" alt="" width={1080} height={675} loading="lazy" decoding="async" hidden aria-hidden="true" ref={ghostRef} />
        </div>
        <LabSurface concept={selection.key} animateSelection={selection.animate} description={lab.surfaceDescription} caption={lab.surfaceCaption} />
      </div>

      <fieldset className="lab-concept-index" onPointerDown={() => { pointerSelection.current = true; }} onKeyDown={() => { pointerSelection.current = false; }}>
        <legend className="lab-visually-hidden">{lab.selectionLabel}</legend>
        {concepts.map((concept) => {
          const base = imageBase(concept.directory);
          return (
            <div className="lab-concept-choice" key={concept.key}>
              <input className="lab-choice-input" type="radio" name="lab-concept" id={"lab-choice-" + concept.key} value={concept.key}
                checked={selection.key === concept.key} aria-controls={"lab-panel-" + concept.key}
                onChange={() => setSelection({ key: concept.key, animate: pointerSelection.current })} />
              <label className="lab-choice-label" htmlFor={"lab-choice-" + concept.key}>
                <img src={base + "-720.webp"} srcSet={base + "-720.webp 720w, " + base + "-1080.webp 1080w"}
                  sizes="(max-width: 760px) 28vw, (max-width: 1280px) 28vw, 380px" alt="" width={720} height={450} loading="lazy" decoding="async" />
                <span>{concept.title}</span>
              </label>
            </div>
          );
        })}
      </fieldset>
      <p className="lab-background-type" aria-hidden="true">Never finished.</p>
    </section>
  );
}
