import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import type { Translations, Locale } from "~/i18n/translations";

interface SiteHeaderProps {
  t: Translations;
  locale: Locale;
}

export function SiteHeader({ t, locale }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const switchLocaleUrl = location.pathname.startsWith("/de")
    ? location.pathname.replace(/^\/de/, "/en")
    : location.pathname.startsWith("/en")
    ? location.pathname.replace(/^\/en/, "/de")
    : `/${otherLocale}`;

  const navLinks = [
    { href: `#work`, label: t.header.navWork },
    { href: `#capabilities`, label: t.header.navCapabilities },
    { href: `#practitioner`, label: t.header.navPractitioner },
    { href: `#lab`, label: t.header.navLab },
    { href: `#contact`, label: t.header.navContact },
  ];

  return (
    <header className="global-header" role="banner">
      <div className="max-w-7xl header-inner">
        {/* Brand Group */}
        <a href={`/${locale}#hero`} className="brand-link" aria-label="WILK — Digital Designer & Software Developer">
          <span className="brand-title">{t.header.brand}</span>
          <span className="brand-subtitle">{t.header.role}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="header-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to={switchLocaleUrl}
            className="lang-switch-btn"
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
          >
            {locale === "de" ? "DE / [EN]" : "[DE] / EN"}
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "var(--bg-dark-lowest)",
            borderBottom: "1px solid var(--border-dark-subtle)",
            padding: "1.5rem var(--gutter-x)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header-nav-link"
              style={{ fontSize: "14px" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
