import type { Locale } from "./translations";

export const LOCALE_COOKIE_NAME = "portfolio_locale";

/**
 * Returns the opposite locale for toggling between German and English.
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === "de" ? "en" : "de";
}

/**
 * Persists the manual language selection to a client cookie and localStorage.
 */
export function setLocaleCookie(locale: Locale): void {
  if (typeof document !== "undefined") {
    // Cookie valid for 1 year across the whole site, SameSite=Lax
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    try {
      localStorage.setItem(LOCALE_COOKIE_NAME, locale);
    } catch {
      // Ignore when storage is blocked in private browsing
    }
  }
}

/**
 * Parses the persistent locale cookie from the HTTP request Cookie header.
 */
export function getSavedLocaleFromCookie(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)portfolio_locale=(de|en)(?:;|$)/);
  if (match && (match[1] === "de" || match[1] === "en")) {
    return match[1] as Locale;
  }
  return null;
}

/**
 * Generates the target URL for language toggling while preserving the current
 * pathname, query parameters, and hash fragment.
 *
 * Examples:
 *   /de         -> /en
 *   /de/work    -> /en/work
 *   /en/contact -> /de/contact
 */
export function getLocaleSwitchUrl(pathname: string, search = "", hash = ""): string {
  const currentLocale = pathname.startsWith("/de") ? "de" : pathname.startsWith("/en") ? "en" : null;
  const targetLocale: Locale = currentLocale === "de" ? "en" : "de";

  let newPath: string;
  if (currentLocale) {
    // Replace leading /de or /en with target locale
    newPath = pathname.replace(new RegExp(`^/${currentLocale}(?=/|$)`), `/${targetLocale}`);
  } else {
    // If route does not have a locale prefix, prefix it
    newPath = `/${targetLocale}${pathname.startsWith("/") ? pathname : "/" + pathname}`;
  }

  return `${newPath}${search}${hash}`;
}
