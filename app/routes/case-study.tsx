import React from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTranslations, type Locale } from "~/i18n/translations";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { CaseStudyHero } from "~/components/case-study/CaseStudyHero";
import { CaseStudyTransformation } from "~/components/case-study/CaseStudyTransformation";
import { CaseStudyGallery } from "~/components/case-study/CaseStudyGallery";
import { CaseStudyAdmin } from "~/components/case-study/CaseStudyAdmin";
import { CaseStudyClosing } from "~/components/case-study/CaseStudyClosing";
import { LetItBloomCaseStudyView } from "~/components/case-study/LetItBloomCaseStudyView";
import { LumenwerkCaseStudyView } from "~/components/case-study/lab/LumenwerkCaseStudyView";
import { SpeicheCaseStudyView } from "~/components/case-study/lab/SpeicheCaseStudyView";
import { RoestwerkCaseStudyView } from "~/components/case-study/lab/RoestwerkCaseStudyView";
import { KernFieldCaseStudyView } from "~/components/case-study/lab/KernFieldCaseStudyView";
import { checkpotCaseStudy } from "~/data/case-studies/checkpot";
import { letItBloomCaseStudy } from "~/data/case-studies/let-it-bloom";
import { fkwGCaseStudy } from "~/data/case-studies/fkw-g";
import { lumenwerkCaseStudy } from "~/data/case-studies/lumenwerk";
import { speicheCaseStudy } from "~/data/case-studies/speiche";
import { roestwerkCaseStudy } from "~/data/case-studies/roestwerk";
import { kernFieldCaseStudy } from "~/data/case-studies/kern-field";
import type { CaseStudyData } from "~/types/case-study";

// Registry of implemented case studies
const CASE_STUDIES_BY_SLUG: Record<string, CaseStudyData> = {
  "checkpot-hietzing": checkpotCaseStudy,
  "let-it-bloom": letItBloomCaseStudy,
  "fkw-g": fkwGCaseStudy,
  "lumenwerk-studio": lumenwerkCaseStudy,
  "speiche-werkstattmanager": speicheCaseStudy,
  "roestwerk-1070": roestwerkCaseStudy,
  "kern-field": kernFieldCaseStudy,
};

export function loader({ params }: LoaderFunctionArgs) {
  const rawLocale = params.locale;
  if (rawLocale !== "de" && rawLocale !== "en") {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = rawLocale as Locale;
  const slug = params.slug;

  if (!slug || !CASE_STUDIES_BY_SLUG[slug]) {
    throw new Response("Case Study Not Found", { status: 404 });
  }

  const caseStudy = CASE_STUDIES_BY_SLUG[slug];
  const { t } = getTranslations(locale);

  return { locale, t, caseStudy };
}

export function meta({ data }: { data?: { locale: Locale; t: any; caseStudy: CaseStudyData } }) {
  if (!data?.caseStudy) {
    return [{ title: "Case Study — WILK" }];
  }

  const { locale, caseStudy } = data;
  const headline = caseStudy.headline[locale] || caseStudy.headline.en;
  const metaTitle = `${caseStudy.title} — Case Study // WILK`;
  const metaDesc = headline;

  return [
    { title: metaTitle },
    { name: "description", content: metaDesc },
    { property: "og:title", content: metaTitle },
    { property: "og:description", content: metaDesc },
    { property: "og:image", content: caseStudy.heroImage.src },
    { name: "theme-color", content: "#070709" },
  ];
}

export default function CaseStudyRoute() {
  const { locale, t, caseStudy } = useLoaderData<typeof loader>();

  return (
    <div className="case-study-page-root">
      <SiteHeader t={t} locale={locale} />

      <main id="main-content" className="case-study-main">
        {caseStudy.slug === "let-it-bloom" ? (
          <LetItBloomCaseStudyView data={caseStudy} locale={locale} />
        ) : caseStudy.slug === "lumenwerk-studio" ? (
          <LumenwerkCaseStudyView data={caseStudy} locale={locale} />
        ) : caseStudy.slug === "speiche-werkstattmanager" ? (
          <SpeicheCaseStudyView data={caseStudy} locale={locale} />
        ) : caseStudy.slug === "roestwerk-1070" ? (
          <RoestwerkCaseStudyView data={caseStudy} locale={locale} />
        ) : caseStudy.slug === "kern-field" ? (
          <KernFieldCaseStudyView data={caseStudy} locale={locale} />
        ) : (
          <>
            {/* Chapter 01: The Project (Cinematic Hero) */}
            <CaseStudyHero data={caseStudy} locale={locale} />

            {/* Chapter 02: The Challenge & Transformation (Warm Editorial Cream) */}
            <CaseStudyTransformation data={caseStudy} locale={locale} />

            {/* Chapter 03: The Digital Experience (Main Visual Section) */}
            <CaseStudyGallery data={caseStudy} locale={locale} />

            {/* Chapter 04: A CMS Built for the Owner (Product Showcase) */}
            <CaseStudyAdmin data={caseStudy} locale={locale} />

            {/* Chapter 05: Outcome, Technology & Closing */}
            <CaseStudyClosing data={caseStudy} locale={locale} />
          </>
        )}
      </main>

      <SiteFooter t={t} locale={locale} />
    </div>
  );
}
