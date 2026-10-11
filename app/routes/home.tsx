import { useEffect } from "react";
import { useLoaderData, useLocation, type LoaderFunctionArgs } from "react-router";
import { getTranslations, type Locale } from "~/i18n/translations";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { Hero } from "~/components/sections/Hero";
import { SelectedWork } from "~/components/sections/SelectedWork";
import { TransitionBridge } from "~/components/sections/TransitionBridge";
import { Capabilities } from "~/components/sections/Capabilities";
import { Practitioner } from "~/components/sections/Practitioner";
import { Collaboration } from "~/components/sections/Collaboration";
import { Lab } from "~/components/sections/Lab";
import { Contact } from "~/components/sections/Contact";

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
  if (!data?.t) {
    return [{ title: "WILK — Portfolio" }];
  }
  return [
    { title: data.t.meta.title },
    { name: "description", content: data.t.meta.description },
    { name: "theme-color", content: "#0d0e11" },
  ];
}

export default function HomeRoute() {
  const { locale, t } = useLoaderData<typeof loader>();
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
        <SelectedWork t={t} />
        <TransitionBridge t={t} />

        {/* ACT 2: Warm Editorial Cream / Paper */}
        <div className="cream-section-wrap">
          <Capabilities t={t} />
          <Practitioner t={t} />
          <Collaboration t={t} />
        </div>

        {/* ACT 3: Return to Cinematic Obsidian Dark */}
        <div className="dark-act3-wrap">
          <Lab t={t} />
          <Contact t={t} />
        </div>
      </main>
      <SiteFooter t={t} locale={locale} />
    </>
  );
}
