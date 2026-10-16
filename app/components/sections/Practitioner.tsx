import type { Translations } from "~/i18n/translations";

interface PractitionerProps {
  t: Translations;
}

export function Practitioner({ t }: PractitionerProps) {
  const p = t.practitioner;

  return (
    <section className="max-w-7xl practitioner-container" id="about" aria-labelledby="practitioner-heading">
      <header id="practitioner" className="practitioner-heading-row">
        <h2 id="practitioner-heading" className="practitioner-heading">{p.heading}</h2>
      </header>

      <div className="practitioner-grid">
        <figure className="practitioner-portrait">
          <img
            src="/assets/profile/wilk-portrait.webp"
            alt={p.portraitAlt}
            width={466}
            height={806}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="practitioner-copy">
          <blockquote className="practitioner-quote">
            <p>{p.quote.before}<em>{p.quote.emphasis}</em>{p.quote.after}</p>
          </blockquote>
          <div className="practitioner-body">
            <p>{p.p1}</p>
            <p>{p.p2}</p>
          </div>
          <p className="practitioner-signature">WILK</p>
        </div>
      </div>
    </section>
  );
}
