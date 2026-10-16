import React from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";

interface CaseStudyAdminProps {
  data: CaseStudyData;
  locale: Locale;
}

export const CaseStudyAdmin: React.FC<CaseStudyAdminProps> = ({ data, locale }) => {
  const { adminCms } = data;
  const kicker = adminCms.kicker[locale] || adminCms.kicker.en;
  const heading = adminCms.heading[locale] || adminCms.heading.en;
  const subheadline = adminCms.subheadline[locale] || adminCms.subheadline.en;
  const narrative = adminCms.narrative[locale] || adminCms.narrative.en;
  const { screenshot, pillars } = adminCms;

  return (
    <section className="cs-admin-section">
      <div className="cs-container">
        {/* Section Header */}
        <div className="cs-admin-header">
          <span className="cs-kicker">{kicker}</span>
          <h2 className="cs-admin-heading">{heading}</h2>
          <p className="cs-admin-subheadline">{subheadline}</p>
          <p className="cs-admin-narrative">{narrative}</p>
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
                  {data.title} — {adminCms.systemLabel ? (adminCms.systemLabel[locale] || adminCms.systemLabel.en) : (locale === "de" ? "System-Architektur" : "System Architecture")}
                </span>
              </div>
              <div className="cs-app-status-badge">
                <span className="cs-status-indicator" />
                <span>{locale === "de" ? "Authentisches System" : "Authentic System"}</span>
              </div>
            </div>

            <div className="cs-app-viewport">
              <img
                src={screenshot.src}
                alt={screenshot.alt[locale] || screenshot.alt.en}
                className="cs-app-img"
                loading="eager"
              />
            </div>
          </div>

          <p className="cs-admin-caption">
            {screenshot.caption[locale] || screenshot.caption.en}
          </p>
        </div>

        {/* 3 Core Editorial Capabilities */}
        <div className="cs-admin-pillars-grid">
          {pillars.map((pillar) => (
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
  );
};
