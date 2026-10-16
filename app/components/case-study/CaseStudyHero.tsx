import React from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";

interface CaseStudyHeroProps {
  data: CaseStudyData;
  locale: Locale;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ data, locale }) => {
  const headline = data.headline[locale] || data.headline.en;
  const subheadline = data.subheadline[locale] || data.subheadline.en;
  const role = data.role[locale] || data.role.en;
  const scope = data.scope[locale] || data.scope.en;
  const statusBadge = data.statusBadge[locale] || data.statusBadge.en;

  return (
    <header className="cs-hero-section">
      <div className="cs-container">
        {/* Editorial Top Bar */}
        <div className="cs-hero-header">
          <div className="cs-hero-meta-strip">
            <span className="cs-kicker">{data.indexKicker[locale] || data.indexKicker.en}</span>
            <span className="cs-kicker-sep">/</span>
            <span className="cs-kicker-client">{data.client[locale] || data.client.en}</span>
            <span className="cs-kicker-sep">/</span>
            <span className="cs-kicker-year">{data.year}</span>
          </div>

          <h1 className="cs-hero-title">
            {(() => {
              const parts = data.title.split(" ");
              if (parts.length === 1) return parts[0];
              const last = parts.pop();
              return (
                <>
                  {parts.join(" ")} <span className="cs-title-accent">{last}</span>
                </>
              );
            })()}
          </h1>

          <p className="cs-hero-lead">{headline}</p>
          <p className="cs-hero-sublead">{subheadline}</p>

          {/* Project Details Grid */}
          <div className="cs-hero-details">
            <div className="cs-hero-detail-item">
              <span className="cs-detail-label">
                {locale === "de" ? "Rolle" : "Role"}
              </span>
              <span className="cs-detail-val">{role}</span>
            </div>
            <div className="cs-hero-detail-item">
              <span className="cs-detail-label">
                {locale === "de" ? "Umfang" : "Scope"}
              </span>
              <span className="cs-detail-val">{scope}</span>
            </div>
            <div className="cs-hero-detail-item">
              <span className="cs-detail-label">Status</span>
              <span className="cs-status-pill">
                <span className="cs-status-indicator" />
                {statusBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="cs-hero-visual-frame">
          <div className="cs-browser-shell">
            <div className="cs-browser-bar">
              <div className="cs-browser-dots">
                <span className="dot dot-close" />
                <span className="dot dot-min" />
                <span className="dot dot-max" />
              </div>
              <div className="cs-browser-address-bar">
                <span className="cs-browser-lock">{data.projectId.startsWith("concept-") ? "🧪" : "🔒"}</span>
                <span className="cs-browser-domain">
                  {data.displayDomain ||
                    (data.projectId.startsWith("concept-")
                      ? (locale === "de" ? "The Lab · Interaktiver Prototyp" : "The Lab · Interactive Prototype")
                      : (() => {
                          try {
                            return new URL(data.liveUrl).hostname.replace(/^www\./, "");
                          } catch {
                            return data.liveUrl;
                          }
                        })())}
                </span>
              </div>
              <div className="cs-browser-actions" />
            </div>

            <div className="cs-browser-viewport">
              <img
                src={data.heroImage.src}
                alt={data.heroImage.alt[locale] || data.heroImage.alt.en}
                className="cs-browser-img"
                loading="eager"
              />
            </div>
          </div>

          <div className="cs-hero-visual-caption">
            <span>{data.heroImage.caption[locale] || data.heroImage.caption.en}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
