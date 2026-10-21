import { Link } from "react-router";
import type { Locale, Translations } from "~/i18n/translations";
import "~/styles/home-footer.css";

interface HomeFooterProps {
  t: Translations;
  locale: Locale;
  year: number;
}

function FooterArrow({ up = false }: { up?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={up ? "M12 19V5m-7 7 7-7 7 7" : "M7 17 17 7M7 7h10v10"} />
    </svg>
  );
}

export function HomeFooter({ t, locale, year }: HomeFooterProps) {
  const f = t.homeFooter;

  return (
    <footer className="home-footer">
      <div className="max-w-7xl">
        <div className="home-footer-layout">
          <div className="home-footer-identity">
            <p className="home-footer-wordmark">{t.header.brand}</p>
            <p className="home-footer-role">{t.header.role.replace(/^—\s*/u, "")}</p>
          </div>
          <nav className="home-footer-nav" aria-label={f.navigationLabel}>
            <Link to={`/${locale}/work`}>{t.header.navWork}<FooterArrow /></Link>
            <a href="#about">{t.header.navAbout}<FooterArrow /></a>
            <a className="home-footer-back-top" href="#hero">{f.backToTop}<FooterArrow up /></a>
          </nav>
        </div>
        <div className="home-footer-colophon">
          <p>© {year} {t.header.brand}</p>
          {/* These pages are not implemented yet. Keep the approved labels
              as text rather than pointing visitors to a placeholder or 404. */}
          <div className="home-footer-legal">
            <span>{f.imprint}</span>
            <span>{f.privacy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
