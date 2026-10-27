import React from "react";
import { Link } from "react-router";
import type { Translations, Locale } from "~/i18n/translations";
import { LanguageSwitch } from "./LanguageSwitch";

interface SiteFooterProps {
  t: Translations;
  locale: Locale;
  email?: string;
}

export function SiteFooter({ t, locale, email = "office@bywilk.at" }: SiteFooterProps) {
  const f = t.footer;
  const hf = t.homeFooter;

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
        <nav className="footer-links" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href={"mailto:" + email} className="label-md" style={{ color: "var(--text-dark-secondary)" }}>
            {f.email}
          </a>
          <Link
            to={locale === "de" ? `/${locale}/impressum` : `/${locale}/legal-notice`}
            className="label-md"
            style={{ color: "var(--text-dark-secondary)" }}
          >
            {hf.imprint}
          </Link>
          <Link
            to={locale === "de" ? `/${locale}/datenschutz` : `/${locale}/privacy`}
            className="label-md"
            style={{ color: "var(--text-dark-secondary)" }}
          >
            {hf.privacy}
          </Link>
          <LanguageSwitch locale={locale} />
        </nav>
      </div>
    </footer>
  );
}
