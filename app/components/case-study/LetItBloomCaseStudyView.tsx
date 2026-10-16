import React from "react";
import { Link } from "react-router";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";
import { CaseStudyHero } from "./CaseStudyHero";
import styles from "./LetItBloomCaseStudyView.module.css";

interface LetItBloomCaseStudyViewProps {
  data: CaseStudyData;
  locale: Locale;
}

export const LetItBloomCaseStudyView: React.FC<LetItBloomCaseStudyViewProps> = ({ data, locale }) => {
  const { visualExperience, adminCms, closing, nextProject, liveUrl } = data;
  const isDe = locale === "de";

  return (
    <div className="let-it-bloom-case-study">
      {/* Chapter 01: The Project (Cinematic Hero with Authentic Live Capture) */}
      <CaseStudyHero data={data} locale={locale} />

      {/* Chapter 02: The Digital Experience (Services & Responsive Craft without repetition) */}
      <section className="cs-gallery-section cs-lib-experience-section">
        <div className="cs-container">
          {/* Chapter Header */}
          <div className="cs-gallery-header">
            <span className="cs-kicker">
              {visualExperience.kicker[locale] || visualExperience.kicker.en}
            </span>
            <h2 className="cs-gallery-heading">
              {visualExperience.heading[locale] || visualExperience.heading.en}
            </h2>
            <p className="cs-gallery-subheadline">
              {visualExperience.subheadline[locale] || visualExperience.subheadline.en}
            </p>
          </div>

          {/* 1. Dual Device Presentation: Authentic Desktop Services + Focused Mobile View */}
          <div className="cs-dual-device-showcase">
            {/* Desktop Device (1440px) - Showing Services section */}
            <div className="cs-device-desktop">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Desktop-Leistungsraster" : "Desktop Services Grid"} · 1440px
                </span>
              </div>
              <div className="cs-browser-shell">
                <div className="cs-browser-bar">
                  <div className="cs-browser-dots">
                    <span className="dot dot-close" />
                    <span className="dot dot-min" />
                    <span className="dot dot-max" />
                  </div>
                  <div className="cs-browser-address-bar">
                    <span className="cs-browser-domain">letitbloom.at/#leistungen</span>
                  </div>
                </div>
                <div className="cs-browser-viewport">
                  <img
                    src={visualExperience.desktopShowcase.src}
                    alt={visualExperience.desktopShowcase.alt[locale] || visualExperience.desktopShowcase.alt.en}
                    className="cs-browser-img"
                    loading="eager"
                  />
                </div>
              </div>
              <p className="cs-hero-visual-caption">
                {visualExperience.desktopShowcase.caption[locale] || visualExperience.desktopShowcase.caption.en}
              </p>
            </div>

            {/* Mobile Device (390px) - Showing Navigation & Ergonomics */}
            <div className="cs-device-mobile">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Mobile Navigation" : "Mobile Navigation"} · 390px
                </span>
              </div>
              <div className="cs-phone-shell">
                <div className="cs-phone-notch" />
                <div className="cs-phone-viewport">
                  <img
                    src={visualExperience.mobileShowcase.src}
                    alt={visualExperience.mobileShowcase.alt[locale] || visualExperience.mobileShowcase.alt.en}
                    className="cs-phone-img"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="cs-hero-visual-caption">
                {visualExperience.mobileShowcase.caption[locale] || visualExperience.mobileShowcase.caption.en}
              </p>
            </div>
          </div>

          {/* 2. Curated Visual Grid: 1 Authentic UI Section + 2 Restrained Floral Craft Details */}
          <div className="cs-lib-details-block">
            <div className="cs-block-intro">
              <span className="cs-block-kicker">
                {isDe ? "UI-DETAILS & ATELIER-KONTEXT" : "UI DETAILS & ATELIER CONTEXT"}
              </span>
              <p className="cs-block-text">
                {isDe
                  ? "Reale Benutzeroberfläche und handwerkliches Gespür: Die Gestaltung gibt den Meisterstücken Raum und führt Kunden direkt zur persönlichen Beratung."
                  : "Authentic interface design meets artisan floristry: Generous photographic measure and seamless guidance toward personal consultation."}
              </p>
            </div>

            <div className="cs-lib-cards-grid">
              {/* Card 1: Authentic UI Section */}
              <div className="cs-lib-card cs-lib-card-ui">
                <div className="cs-lib-img-box">
                  <img
                    src="/assets/projects/let-it-bloom/let-it-bloom-ui-philosophy-polish-v2.png"
                    alt={isDe ? "Authentische Let It Bloom Philosophie-Sektion" : "Authentic Let It Bloom philosophy section"}
                    className="cs-lib-card-img"
                    loading="lazy"
                  />
                  <div className="cs-lib-card-badge">
                    <span>{isDe ? "AUTHENTISCHE UI-SEKTION" : "AUTHENTIC UI SECTION"}</span>
                  </div>
                </div>
                <div className="cs-lib-card-info">
                  <h4 className="cs-lib-card-title">
                    {isDe ? "Regionale Philosophie & Handwerk" : "Regional Philosophy & Craft"}
                  </h4>
                  <p className="cs-lib-card-desc">
                    {isDe
                      ? "Kuratierte Atelier-Werte und lokale Verankerung — handwerkliche Qualität steht im Vordergrund."
                      : "Curated atelier values and local roots — celebrating artisan floristry without marketing noise."}
                  </p>
                </div>
              </div>

              {/* Card 2: Restrained Floral Craft Detail 1 - Corrected caption to Flowering Potted Plant */}
              <div className="cs-lib-card cs-lib-card-photo">
                <div className="cs-lib-img-box">
                  <img
                    src="/assets/projects/let-it-bloom/letitbloom-bouquet.jpg"
                    alt={isDe ? "Blühende Topfpflanze" : "Flowering potted plant"}
                    className="cs-lib-card-img"
                    loading="lazy"
                  />
                  <div className="cs-lib-card-badge">
                    <span>{isDe ? "TOPFPFLANZEN & GEFÄSSE" : "POTTED PLANTS & PLANTERS"}</span>
                  </div>
                </div>
                <div className="cs-lib-card-info">
                  <h4 className="cs-lib-card-title">
                    {isDe ? "Blühende Topfpflanze" : "Flowering Potted Plant"}
                  </h4>
                  <p className="cs-lib-card-desc">
                    {isDe
                      ? "Sorgfältig ausgewählte Topfpflanzen und stilvolle Pflanzgefäße als fester Bestandteil des floralen Sortiments."
                      : "Selected potted plants and decorative planters curated as a permanent part of the atelier's offering."}
                  </p>
                </div>
              </div>

              {/* Card 3: Restrained Floral Craft Detail 2 */}
              <div className="cs-lib-card cs-lib-card-photo">
                <div className="cs-lib-img-box">
                  <img
                    src="/assets/projects/let-it-bloom/bloom-store-farmgate.jpg"
                    alt={isDe ? "Atelier & Ab-Hof-Verkauf" : "Farmgate atelier in Langenzersdorf"}
                    className="cs-lib-card-img"
                    loading="lazy"
                  />
                  <div className="cs-lib-card-badge">
                    <span>{isDe ? "LOKALER KONTEXT" : "LOCAL CONTEXT"}</span>
                  </div>
                </div>
                <div className="cs-lib-card-info">
                  <h4 className="cs-lib-card-title">
                    {isDe ? "Atelier & Ab-Hof-Verkauf" : "Atelier & Farmgate Collection"}
                  </h4>
                  <p className="cs-lib-card-desc">
                    {isDe
                      ? "Verankerung in Langenzersdorf: Saisonale Kränze und persönlicher Verkauf für Stammkunden im Weinviertel."
                      : "Rooted in Langenzersdorf: Seasonally rotating wreaths and direct collection for local clients."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 03: Content Management Made Simple (Authentic CMS Dashboard Screenshot) */}
      <section className="cs-admin-section">
        <div className="cs-container">
          {/* Section Header: Headline + Concise Explanatory Paragraph */}
          <div className="cs-admin-header">
            <span className="cs-kicker">{adminCms.kicker[locale] || adminCms.kicker.en}</span>
            <h2 className="cs-admin-heading">{adminCms.heading[locale] || adminCms.heading.en}</h2>
            <p className="cs-admin-narrative">{adminCms.narrative[locale] || adminCms.narrative.en}</p>
          </div>

          {/* Authentic Admin Screenshot in Application Frame */}
          <div className="cs-admin-showcase-frame">
            <div className="cs-app-shell">
              <div className="cs-app-bar">
                <div className="cs-browser-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="cs-app-title">
                  <span>
                    {data.title} — {adminCms.systemLabel ? (adminCms.systemLabel[locale] || adminCms.systemLabel.en) : (isDe ? "System-Architektur" : "System Architecture")}
                  </span>
                </div>
                <div className="cs-app-status-badge">
                  <span className="cs-status-indicator" />
                  <span>{isDe ? "Authentisches System" : "Authentic System"}</span>
                </div>
              </div>

              <div className="cs-app-viewport">
                <img
                  src={adminCms.screenshot.src}
                  alt={adminCms.screenshot.alt[locale] || adminCms.screenshot.alt.en}
                  className="cs-app-img"
                  loading="eager"
                />
              </div>
            </div>

            <p className="cs-admin-caption">
              {adminCms.screenshot.caption[locale] || adminCms.screenshot.caption.en}
            </p>
          </div>

          {/* 2 Concise Functional Highlights */}
          <div className={styles.adminPillarsTwoCol}>
            {adminCms.pillars.map((pillar) => (
              <div key={pillar.number} className="cs-admin-pillar-card">
                <span className="cs-pillar-num">{pillar.number}</span>
                <h3 className="cs-pillar-title">
                  {pillar.title[locale] || pillar.title.en}
                </h3>
                <p className="cs-pillar-desc">
                  {pillar.description[locale] || pillar.description.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 04: Simplified, Confident Ending */}
      <footer className="cs-closing-section">
        <div className="cs-container">
          <div className="cs-closing-header">
            <span className="cs-kicker">{closing.kicker[locale] || closing.kicker.en}</span>
            <h2 className="cs-closing-heading">{closing.heading[locale] || closing.heading.en}</h2>
            <p className="cs-closing-narrative">{closing.narrative[locale] || closing.narrative.en}</p>

            <ul className="cs-achievements-list">
              {closing.achievements.map((item, idx) => (
                <li key={idx} className="cs-achievement-item">
                  <span className="cs-achievement-check">✓</span>
                  <span>{item[locale] || item.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compact Tech & Live Website Bar */}
          <div className={styles.closingMetaBar}>
            <div className={styles.techLine}>
              <span className={styles.techLineLabel}>
                {isDe ? "Technologie-Stack:" : "Tech Stack:"}
              </span>
              <div className={styles.techPills}>
                {closing.techStack.map((tech) => (
                  <span key={tech} className="cs-tech-pill">{tech}</span>
                ))}
              </div>
            </div>

            <div className={styles.liveAction}>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-external-btn"
              >
                <span>
                  {closing.externalButtonLabel
                    ? closing.externalButtonLabel[locale] || closing.externalButtonLabel.en
                    : isDe
                    ? "Live-Website besuchen"
                    : "Visit Live Website"}
                </span>
                <span className="cs-btn-domain">
                  {(() => {
                    try {
                      return new URL(liveUrl).hostname.replace(/^www\./, "");
                    } catch {
                      return liveUrl;
                    }
                  })()} ↗
                </span>
              </a>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="cs-nav-bottom-bar">
            <Link to={`/${locale}/work`} className="cs-back-link">
              <span>←</span>
              <span>{isDe ? "Zurück zum Work-Archiv" : "Back to Work Archive"}</span>
            </Link>

            <div className="cs-next-project-teaser">
              <span className="cs-next-label">
                {nextProject.kicker[locale] || nextProject.kicker.en}
              </span>
              <Link
                to={`/${locale}/work/${nextProject.slug}`}
                className="cs-next-title-link"
              >
                <span>{nextProject.title}</span>
                <span className="cs-next-arrow">→</span>
              </Link>
              <span className="cs-next-desc">
                {nextProject.descriptor[locale] || nextProject.descriptor.en}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
