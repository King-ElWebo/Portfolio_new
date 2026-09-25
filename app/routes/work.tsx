import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getTranslations, type Locale } from "~/i18n/translations";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SelectedWork } from "~/components/sections/SelectedWork";

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
  if (!data?.t) return [{ title: "Work — WILK" }];
  return [
    { title: `${data.t.work.kicker} — WILK` },
    { name: "description", content: data.t.work.subtitle },
  ];
}

export default function WorkRoute() {
  const { locale, t } = useLoaderData<typeof loader>();

  return (
    <>
      <SiteHeader t={t} locale={locale} />
      <main id="main-content" style={{ paddingTop: "6rem" }}>
        <SelectedWork t={t} />
      </main>
      <SiteFooter t={t} locale={locale} />
    </>
  );
}
