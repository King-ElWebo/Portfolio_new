import React, { useState, useMemo } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTranslations, type Locale } from "~/i18n/translations";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { WorkArchiveHero } from "~/components/work/WorkArchiveHero";
import { ProjectGrid } from "~/components/work/ProjectGrid";
import { getProjects, getProjectCounts } from "~/data/projects";
import type { ProjectFilterCategory } from "~/types/project";

export function loader({ params }: LoaderFunctionArgs) {
  const rawLocale = params.locale;
  if (rawLocale !== "de" && rawLocale !== "en") {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = rawLocale as Locale;
  const { t } = getTranslations(locale);

  return { locale, t };
}

export function meta({ data }: { data?: { locale: Locale; t: any } }) {
  if (!data?.t) return [{ title: "Projects — WILK" }];
  return [
    { title: data.t.workArchive.metaTitle },
    { name: "description", content: data.t.workArchive.metaDescription },
    { property: "og:title", content: data.t.workArchive.metaTitle },
    { property: "og:description", content: data.t.workArchive.metaDescription },
  ];
}

export default function WorkRoute() {
  const { locale, t } = useLoaderData<typeof loader>();

  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>("all");

  // Dynamic counts derived from verified projects
  const totalCounts = useMemo(() => {
    return getProjectCounts(false);
  }, []);

  // Dynamic project list according to filter
  const displayedProjects = useMemo(() => {
    return getProjects({
      includeFixtures: false,
      filter: activeFilter,
    });
  }, [activeFilter]);

  return (
    <div className="work-archive-page-root">
      <SiteHeader t={t} locale={locale} />

      <main id="main-content" className="work-archive-container">
        <WorkArchiveHero
          t={t}
          locale={locale}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          displayedCount={displayedProjects.length}
          totalCounts={totalCounts}
        />

        <ProjectGrid
          projects={displayedProjects}
          locale={locale}
          t={t}
        />
      </main>

      <SiteFooter t={t} locale={locale} />
    </div>
  );
}
