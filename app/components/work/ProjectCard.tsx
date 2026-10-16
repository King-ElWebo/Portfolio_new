import React from "react";
import { Link } from "react-router";
import type { Translations, Locale } from "~/i18n/translations";
import type { ProjectEntry } from "~/types/project";

interface ProjectCardProps {
  project: ProjectEntry;
  locale: Locale;
  t: Translations;
}

export function ProjectCard({ project, locale, t }: ProjectCardProps) {
  const isLab = project.kind === "independent_concept";
  const actionLabel = isLab
    ? t.workArchive.viewExperiment
    : t.workArchive.viewCaseStudy;

  const categoryText = project.categoryLabel[locale] || project.categoryLabel.en;
  const descriptorText = project.descriptor[locale] || project.descriptor.en;
  const summaryText = project.summary[locale] || project.summary.en;
  const imageAltText = project.imageAlt[locale] || project.imageAlt.en;

  const internalHref = project.hasCaseStudy ? `/${locale}/work/${project.slug}` : null;
  const externalHref = !project.hasCaseStudy && project.liveUrl ? project.liveUrl : null;

  const cardContent = (
    <>
      <div className="work-card-header">
        <div className="work-card-meta-row">
          <span className="work-card-index">{project.indexNumber}</span>
          <span className="work-card-category">{categoryText}</span>
        </div>

        <h2 className="work-card-title">
          <span className="work-card-title-main">{project.title}</span>
          <span className="work-card-title-separator">—</span>
          <span className="work-card-title-desc">{descriptorText}</span>
        </h2>

        <p className="work-card-summary">{summaryText}</p>
      </div>

      <div className="work-card-visual-frame">
        <img
          src={project.image}
          alt={imageAltText}
          loading="lazy"
          className="work-card-image"
        />

        {/* Cinematic gradient & hover reveal */}
        <div className="work-card-hover-overlay" aria-hidden="true">
          <div className="work-card-hover-action">
            <span>
              {project.hasCaseStudy
                ? actionLabel
                : project.liveUrl
                ? `${actionLabel} ↗`
                : t.workArchive.caseStudyPlanned}
            </span>
            <span className="work-card-hover-arrow" aria-hidden="true">
              →
            </span>
          </div>
        </div>

        {/* Illustrative fixture watermark badge for unapproved development candidates */}
        {project.isPreviewFixture && (
          <div className="work-card-fixture-tag" title="Design candidate fixture">
            [PREVIEW]
          </div>
        )}
      </div>
    </>
  );

  return (
    <article className="work-card group">
      {internalHref ? (
        <Link
          to={internalHref}
          className="work-card-link-wrapper"
          aria-label={`${project.title} — ${descriptorText} (${actionLabel})`}
        >
          {cardContent}
        </Link>
      ) : externalHref ? (
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="work-card-link-wrapper"
          aria-label={`${project.title} — ${descriptorText}`}
        >
          {cardContent}
        </a>
      ) : (
        <div className="work-card-inner">{cardContent}</div>
      )}
    </article>
  );
}
