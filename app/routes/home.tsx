import { useEffect } from "react";
import { useLoaderData, useLocation, type LoaderFunctionArgs } from "react-router";
import { getTranslations, type Locale } from "~/i18n/translations";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { HomeFooter } from "~/components/layout/HomeFooter";
import { Hero } from "~/components/sections/Hero";
import { SelectedWork } from "~/components/sections/SelectedWork";
import { TransitionBridge } from "~/components/sections/TransitionBridge";
import { Capabilities } from "~/components/sections/Capabilities";
import { Practitioner } from "~/components/sections/Practitioner";
import { Collaboration } from "~/components/sections/Collaboration";
import { Lab } from "~/components/sections/Lab";
import { HomeContact } from "~/components/sections/HomeContact";
import "~/styles/homepage.css";

export function loader({ params }: LoaderFunctionArgs) {
  const rawLocale = params.locale;
  if (rawLocale !== "de" && rawLocale !== "en") {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = rawLocale as Locale;
  const { t } = getTranslations(locale);

  return { locale, t, year: new Date().getUTCFullYear() };
}

export function meta({ data }: { data?: { locale: Locale; t: any } }) {
  if (!data?.t) {
    return [{ title: "WILK — Digital Designer & Software Developer" }];
  }
  return [
    { title: data.t.meta.title },
    { name: "description", content: data.t.meta.description },
    { name: "theme-color", content: "#0d0e11" },
  ];
}

export default function HomeRoute() {
  const { locale, t, year } = useLoaderData<typeof loader>();
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && location.hash) {
      const hashId = location.hash.replace("#", "");
      const elem = document.getElementById(hashId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  return (
    <>
      <SiteHeader t={t} locale={locale} />
      <main id="main-content" style={{ width: "100%", overflow: "hidden" }}>
        {/* ACT 1: Cinematic Obsidian Dark */}
        <Hero t={t} />
        <SelectedWork t={t} locale={locale} />
        <TransitionBridge t={t} />

        {/* ACT 2: Warm Editorial Cream / Paper */}
        <div className="cream-section-wrap">
          <Capabilities t={t} />
          <Practitioner t={t} />
          <Collaboration t={t} />
        </div>

        {/* ACT 3: Return to Cinematic Obsidian Dark */}
        <div className="dark-act3-wrap home-ending">
          <Lab t={t} locale={locale} />
          <HomeContact t={t} />
        </div>
      </main>
      <HomeFooter t={t} locale={locale} year={year} />
    </>
  );
}
