import React from "react";
import type { Translations, Locale } from "~/i18n/translations";
import type { ProjectEntry } from "~/types/project";
import { ProjectCard } from "~/components/work/ProjectCard";

interface ProjectGridProps {
  projects: ProjectEntry[];
  locale: Locale;
  t: Translations;
}

export function ProjectGrid({ projects, locale, t }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <section className="work-grid-empty" aria-live="polite">
        <div className="work-grid-empty-box">
          <span className="work-grid-empty-indicator">—</span>
          <h2 className="work-grid-empty-title">
            {t.workArchive.emptyStateTitle}
          </h2>
          <p className="work-grid-empty-desc">
            {t.workArchive.emptyStateDescription}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="project-grid"
        className="work-project-grid"
        aria-label={locale === "de" ? "Projektübersicht" : "Project directory"}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            t={t}
          />
        ))}
      </section>

      {/* Quiet Curatorial Statement (monographic footnote from Variant C) */}
      <section className="work-curatorial-section" aria-label="Curatorial note">
        <p className="work-curatorial-text">
          {t.workArchive.curatorialStatement}
        </p>
      </section>
    </>
  );
}
