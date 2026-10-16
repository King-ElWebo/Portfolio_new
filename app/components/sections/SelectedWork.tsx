import { Link } from "react-router";
import type { Locale, Translations } from "~/i18n/translations";
import "~/styles/selected-work.css";

interface SelectedWorkProps {
  t: Translations;
  locale: Locale;
}

const featuredProjects = [
  { key: "checkpot", backdrop: "CHECKPOT", slug: "checkpot-hietzing", assetDirectory: "checkpot" },
  { key: "bloom", backdrop: "BLOOM", slug: "let-it-bloom", assetDirectory: "let-it-bloom" },
  { key: "speiche", backdrop: "SPEICHE", slug: "speiche-werkstattmanager", assetDirectory: "speiche" },
] as const;

export function SelectedWork({ t, locale }: SelectedWorkProps) {
  return (
    <section className="selected-work-section max-w-7xl" id="work" aria-labelledby="selected-work-heading">
      <h2 className="selected-work-heading" id="selected-work-heading">
        {t.work.heading}
      </h2>

      <div className="selected-work-list">
        {featuredProjects.map((project, index) => {
          const copy = t.work.featured[project.key];
          const imageBase = "/assets/projects/" + project.assetDirectory + "/selected-work";

          return (
            <article key={project.slug} className="selected-work-project">
              <div className="selected-work-backdrop" aria-hidden="true">
                <span>{project.backdrop}</span>
              </div>
              <Link
                to={"/" + locale + "/work/" + project.slug}
                className={"selected-work-row" + (index % 2 === 1 ? " selected-work-row-reversed" : "")}
                aria-label={copy.title + " — " + t.work.caseStudyLink}
              >
                <div className="selected-work-media">
                  <img
                    className="selected-work-image"
                    src={imageBase + "-1080.webp"}
                    srcSet={imageBase + "-720.webp 720w, " + imageBase + "-1080.webp 1080w"}
                    sizes="(max-width: 760px) calc(100vw - 3rem), (max-width: 1280px) 42vw, 520px"
                    alt={copy.imageAlt}
                    width={1080}
                    height={675}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="selected-work-copy">
                  <span className="selected-work-kind">{copy.kind}</span>
                  <h3 className="selected-work-title">{copy.title}</h3>
                  <p className="selected-work-description">{copy.description}</p>
                  <span className="selected-work-action">
                    {t.work.caseStudyLink}
                    <svg
                      className="selected-work-arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
