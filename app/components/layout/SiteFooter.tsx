import React from "react";
import type { Translations, Locale } from "~/i18n/translations";
import { LanguageSwitch } from "./LanguageSwitch";

interface SiteFooterProps {
  t: Translations;
  locale: Locale;
  email?: string;
}

export function SiteFooter({ t, locale, email = "wilk@studio.lab" }: SiteFooterProps) {
  const f = t.footer;

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
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="label-md" style={{ color: "var(--text-dark-secondary)" }}>
            {f.linkedin}
          </a>
          <a href="#hero" className="label-md" style={{ color: "var(--text-dark-secondary)" }}>
            {f.legal}
          </a>
          <LanguageSwitch locale={locale} />
        </nav>
      </div>
    </footer>
  );
}
