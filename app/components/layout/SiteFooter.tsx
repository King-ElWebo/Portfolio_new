import React from "react";
import { Link, useLocation } from "react-router";
import type { Translations, Locale } from "~/i18n/translations";
import { getAlternateLocale, getLocaleSwitchUrl, setLocaleCookie } from "~/i18n/locale";

interface SiteFooterProps {
  t: Translations;
  locale: Locale;
}

export function SiteFooter({ t, locale }: SiteFooterProps) {
  const f = t.footer;
  const otherLocale = getAlternateLocale(locale);
  const location = useLocation();
  const switchLocaleUrl = getLocaleSwitchUrl(location.pathname, location.search, location.hash);

  return (
    <footer className="global-footer" role="contentinfo">
      <div className="max-w-7xl footer-inner">
        {/* Brand & Subtitle */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 600 }}>
            {f.brand}
          </span>
          <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>
            {f.tagline}
          </span>
        </div>

        {/* Rights */}
        <p style={{ fontSize: "14px", color: "var(--text-dark-secondary)" }}>
          {f.rights}
        </p>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="mailto:wilk@studio.lab" className="label-md" style={{ color: "var(--text-dark-secondary)" }}>
            {f.email}
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="label-md" style={{ color: "var(--text-dark-secondary)" }}>
            {f.linkedin}
          </a>
          <a href="#hero" className="label-md" style={{ color: "var(--text-dark-secondary)" }}>
            {f.legal}
          </a>
          <Link
            to={switchLocaleUrl}
            className="label-md"
            style={{ color: "var(--color-secondary)" }}
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
            onClick={() => setLocaleCookie(otherLocale)}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
