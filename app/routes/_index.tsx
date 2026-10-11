import { redirect, type LoaderFunctionArgs } from "react-router";
import { getSavedLocaleFromCookie } from "~/i18n/locale";

export function loader({ request }: LoaderFunctionArgs) {
  // 1. Check if user has a persistent manual language choice in cookie
  const savedLocale = getSavedLocaleFromCookie(request.headers.get("cookie"));
  if (savedLocale === "de" || savedLocale === "en") {
    return redirect(`/${savedLocale}`);
  }

  // 2. Fall back to browser Accept-Language detection on first visit
  const acceptLanguage = request.headers.get("accept-language") || "";
  const isGerman = /^(de|de-)/i.test(acceptLanguage) || acceptLanguage.toLowerCase().includes("de");
  const targetLocale = isGerman ? "de" : "en";

  return redirect(`/${targetLocale}`);
}

export default function RootIndex() {
  return null;
}
