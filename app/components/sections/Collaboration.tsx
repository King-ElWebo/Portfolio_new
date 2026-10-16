import type { Translations } from "~/i18n/translations";

interface CollaborationProps {
  t: Translations;
}

export function Collaboration({ t }: CollaborationProps) {
  const c = t.collaboration;

  return (
    <section className="max-w-7xl collaboration-container" id="collaboration" aria-label={c.label}>
      <h2 className="collaboration-heading">
        {c.headline.lead}<br /><em>{c.headline.accent}</em>
      </h2>
      <p className="collaboration-intro">{c.intro}</p>

      <div className="collaboration-network">
        <figure className="collaboration-source">
          <img
            className="collaboration-sculpture"
            src="/assets/collaboration/interwoven-bands-960.webp"
            srcSet="/assets/collaboration/interwoven-bands-480.webp 480w, /assets/collaboration/interwoven-bands-960.webp 960w"
            sizes="(max-width: 760px) 280px, (max-width: 1100px) 40vw, 448px"
            width={960}
            height={960}
            loading="lazy"
            decoding="async"
            alt=""
          />
          <figcaption className="collaboration-wordmark">WILK</figcaption>
        </figure>

        <div className="collaboration-models">
          {c.models.map((model) => (
            <article className="collaboration-model" key={model.id}>
              <span className="collaboration-connector" aria-hidden="true" />
              <h3>{model.title}</h3>
              <p>{model.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
