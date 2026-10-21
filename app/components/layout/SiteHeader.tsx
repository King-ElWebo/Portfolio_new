import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import type { Translations, Locale } from "~/i18n/translations";
import { LanguageSwitch } from "./LanguageSwitch";

interface SiteHeaderProps {
  t: Translations;
  locale: Locale;
}

export function SiteHeader({ t, locale }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();


  const isHomePage = location.pathname === `/${locale}` || location.pathname === `/${locale}/`;
  const isWorkPage = location.pathname.startsWith(`/${locale}/work`);
  const isContactPage = location.pathname.startsWith(`/${locale}/contact`);

  interface NavItem {
    label: string;
    to?: string;
    href?: string;
    isActive?: boolean;
    isPageLink: boolean;
  }

  // Refined intentional 3-item navigation architecture
  const navLinks: NavItem[] = [
    {
      label: t.header.navWork,
      to: `/${locale}/work`,
      isActive: isWorkPage,
      isPageLink: true,
    },
    {
      label: t.header.navAbout || (locale === "de" ? "Über mich" : "About"),
      href: isHomePage ? "#about" : `/${locale}#about`,
      isPageLink: false,
    },
    {
      label: t.header.navContact,
      to: isHomePage ? undefined : `/${locale}/contact`,
      href: isHomePage ? "#contact" : undefined,
      isActive: isContactPage,
      isPageLink: !isHomePage,
    },
  ];

  return (
    <header className="global-header" role="banner">
      <div className="hp-header-inner header-inner">
        {/* Brand Group */}
        {isHomePage ? (
          <a
            href="#hero"
            className="brand-link"
            aria-label="WILK — Digital Designer & Software Developer"
          >
            <span className="brand-title">{t.header.brand}</span>
            <span className="brand-subtitle">{t.header.role}</span>
          </a>
        ) : (
          <Link
            to={`/${locale}`}
            className="brand-link"
            aria-label="WILK — Digital Designer & Software Developer"
          >
            <span className="brand-title">{t.header.brand}</span>
            <span className="brand-subtitle">{t.header.role}</span>
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="header-nav hp-nav-links" aria-label="Main Navigation">
          {navLinks.map((link) => {
            if (link.isPageLink && link.to) {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`header-nav-link hp-nav-link ${link.isActive ? "active" : ""}`}
                  aria-current={link.isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className="header-nav-link hp-nav-link"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Language Switcher & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <LanguageSwitch locale={locale} shortLabel />

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-nav-toggle hp-mobile-toggle"
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
            padding: "1.75rem var(--hp-gutter, var(--gutter-x))",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {navLinks.map((link) => {
            if (link.isPageLink && link.to) {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`header-nav-link ${link.isActive ? "active" : ""}`}
                  aria-current={link.isActive ? "page" : undefined}
                  style={{ fontSize: "15px", padding: "0.5rem 0" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className="header-nav-link"
                style={{ fontSize: "15px", padding: "0.5rem 0" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
