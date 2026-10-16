import React from "react";
import { Link } from "react-router";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";

interface CaseStudyClosingProps {
  data: CaseStudyData;
  locale: Locale;
}

export const CaseStudyClosing: React.FC<CaseStudyClosingProps> = ({ data, locale }) => {
  const { closing, nextProject, liveUrl } = data;
  const kicker = closing.kicker[locale] || closing.kicker.en;
  const heading = closing.heading[locale] || closing.heading.en;
  const narrative = closing.narrative[locale] || closing.narrative.en;
  const techRationale = closing.techRationale[locale] || closing.techRationale.en;
  const statusNote = closing.statusNote[locale] || closing.statusNote.en;

  return (
    <footer className="cs-closing-section">
      <div className="cs-container">
        {/* Outcome Header & Achievements */}
        <div className="cs-closing-header">
          <span className="cs-kicker">{kicker}</span>
          <h2 className="cs-closing-heading">{heading}</h2>
          <p className="cs-closing-narrative">{narrative}</p>

          <ul className="cs-achievements-list">
            {closing.achievements.map((item, idx) => (
              <li key={idx} className="cs-achievement-item">
                <span className="cs-achievement-check">✓</span>
                <span>{item[locale] || item.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Restrained Technology Summary */}
        <div className="cs-tech-summary-box">
          <div className="cs-tech-label">
            {locale === "de" ? "TECHNOLOGIE-STACK" : "TECHNOLOGY STACK"}
          </div>
          <div className="cs-tech-tags">
            {closing.techStack.map((tech) => (
              <span key={tech} className="cs-tech-pill">{tech}</span>
            ))}
          </div>
          <p className="cs-tech-rationale">{techRationale}</p>
        </div>

        {/* Launch Status Notice */}
        <div className="cs-status-notice-box">
          <div className="cs-status-notice-header">
            <span className="cs-status-indicator cs-indicator-upcoming" />
            <span className="cs-status-notice-title">
              {locale === "de" ? "Projektstatus" : "Project Status"}
            </span>
          </div>
          <p className="cs-status-notice-text">{statusNote}</p>
          <div className="cs-status-link-wrapper">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-external-btn"
            >
              <span>
                {closing.externalButtonLabel
                  ? closing.externalButtonLabel[locale] || closing.externalButtonLabel.en
                  : locale === "de"
                  ? "Projekt / Website besuchen"
                  : "Visit Project / Website"}
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
            {data.statusUpcoming && (
              <span className="cs-status-hint">
                {locale === "de"
                  ? "(Aktuell temporäre Vorschau-Seite bis zum finalen Launch)"
                  : "(Currently temporary coming-soon screen until final launch)"}
              </span>
            )}
          </div>
        </div>

        {/* Global Navigation & Next Project */}
        <div className="cs-nav-bottom-bar">
          <Link to={`/${locale}/work`} className="cs-back-link">
            <span>←</span>
            <span>{locale === "de" ? "Zurück zum Work-Archiv" : "Back to Work Archive"}</span>
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
  );
};
