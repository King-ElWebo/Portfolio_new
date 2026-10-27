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
    // Cookie valid for 1 year across the whole site, SameSite=Lax, Secure when on HTTPS
    const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
    const secureFlag = isSecure ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;
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
 * Handles explicit legal route mappings:
 *   /de/impressum   <-> /en/legal-notice
 *   /de/datenschutz <-> /en/privacy
 *
 * Examples:
 *   /de                 -> /en
 *   /de/work            -> /en/work
 *   /de/impressum       -> /en/legal-notice
 *   /en/legal-notice    -> /de/impressum
 *   /de/datenschutz     -> /en/privacy
 *   /en/privacy         -> /de/datenschutz
 */
export function getLocaleSwitchUrl(pathname: string, search = "", hash = ""): string {
  const currentLocale = pathname.startsWith("/de") ? "de" : pathname.startsWith("/en") ? "en" : null;
  const targetLocale: Locale = currentLocale === "de" ? "en" : "de";

  if (currentLocale) {
    const subpath = pathname.replace(new RegExp(`^/${currentLocale}(?=/|$)`), "") || "/";

    // Explicit legal route mapping
    if (targetLocale === "en") {
      if (subpath === "/impressum" || subpath === "/imprint" || subpath === "/legal-notice") {
        return `/en/legal-notice${search}${hash}`;
      }
      if (subpath === "/datenschutz" || subpath === "/privacy") {
        return `/en/privacy${search}${hash}`;
      }
    } else {
      if (subpath === "/legal-notice" || subpath === "/imprint" || subpath === "/impressum") {
        return `/de/impressum${search}${hash}`;
      }
      if (subpath === "/privacy" || subpath === "/datenschutz") {
        return `/de/datenschutz${search}${hash}`;
      }
    }

    // Default: replace leading /de or /en with target locale
    const newPath = pathname.replace(new RegExp(`^/${currentLocale}(?=/|$)`), `/${targetLocale}`);
    return `${newPath}${search}${hash}`;
  } else {
    // If route does not have a locale prefix, prefix it
    const newPath = `/${targetLocale}${pathname.startsWith("/") ? pathname : "/" + pathname}`;
    return `${newPath}${search}${hash}`;
  }
}
