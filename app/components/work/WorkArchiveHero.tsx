import React from "react";
import type { Translations, Locale } from "~/i18n/translations";
import type { ProjectFilterCategory } from "~/types/project";

interface WorkArchiveHeroProps {
  t: Translations;
  locale: Locale;
  activeFilter: ProjectFilterCategory;
  onFilterChange: (filter: ProjectFilterCategory) => void;
  displayedCount: number;
  totalCounts: {
    all: number;
    client: number;
    lab: number;
  };
}

export function WorkArchiveHero({
  t,
  locale,
  activeFilter,
  onFilterChange,
  displayedCount,
  totalCounts,
}: WorkArchiveHeroProps) {
  const formattedCount = String(displayedCount).padStart(2, "0");

  const filterOptions: { id: ProjectFilterCategory; label: string; count: number }[] = [
    {
      id: "all",
      label: t.workArchive.filterAll,
      count: totalCounts.all,
    },
    {
      id: "client_project",
      label: t.workArchive.filterClient,
      count: totalCounts.client,
    },
    {
      id: "independent_concept",
      label: t.workArchive.filterLab,
      count: totalCounts.lab,
    },
  ];

  return (
    <section className="work-archive-hero" aria-labelledby="work-archive-title">
      {/* Subtle full-width hairline rule */}
      <div className="work-archive-divider" aria-hidden="true" />

      {/* Monumental Title & Opposing Baseline Counter */}
      <div className="work-archive-title-row">
        <h1 id="work-archive-title" className="work-archive-heading">
          {t.workArchive.pageTitle}
        </h1>
        <span
          className="work-archive-counter"
          aria-label={`${displayedCount} ${t.workArchive.pageTitle}`}
        >
          {formattedCount}
        </span>
      </div>

      {/* Restrained Editorial Category Filter Cluster */}
      <div
        className="work-archive-filter-bar"
        role="group"
        aria-label={locale === "de" ? "Projektfilter" : "Project categories"}
      >
        <div className="work-archive-filter-cluster">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onFilterChange(opt.id)}
                className={`work-archive-filter-btn ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
              >
                <span>{opt.label}</span>
                <span className="work-archive-filter-count">
                  ({String(opt.count).padStart(2, "0")})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
