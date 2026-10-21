import { Link, useLocation } from "react-router";
import type { Locale } from "~/i18n/translations";
import { getAlternateLocale, getLocaleSwitchUrl, setLocaleCookie } from "~/i18n/locale";
import "~/styles/language-switch.css";

interface LanguageSwitchProps {
  locale: Locale;
  shortLabel?: boolean;
}

export function LanguageSwitch({ locale, shortLabel = false }: LanguageSwitchProps) {
  const location = useLocation();
  const targetLocale = getAlternateLocale(locale);

  // The fragment can refer to a section the visitor has already scrolled away from.
  // Keep the viewport instead of navigating to that old anchor again.
  const targetUrl = getLocaleSwitchUrl(location.pathname, location.search);

  return (
    <Link
      className="language-switch-link"
      to={targetUrl}
      preventScrollReset
      lang={targetLocale}
      hrefLang={targetLocale}
      aria-label={targetLocale === "en" ? "Switch to English" : "Zu Deutsch wechseln"}
      onClick={() => setLocaleCookie(targetLocale)}
    >
      {shortLabel ? targetLocale.toUpperCase() : targetLocale === "en" ? "English" : "Deutsch"}
    </Link>
  );
}
