import React from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";

interface CaseStudyTransformationProps {
  data: CaseStudyData;
  locale: Locale;
}

export const CaseStudyTransformation: React.FC<CaseStudyTransformationProps> = ({ data, locale }) => {
  if (!data.transformation) return null;
  const { transformation } = data;
  const kicker = transformation.kicker[locale] || transformation.kicker.en;
  const heading = transformation.heading[locale] || transformation.heading.en;
  const narrative = transformation.narrative[locale] || transformation.narrative.en;

  const historical = transformation.historicalImage;
  const redesign = transformation.redesignImage;

  if (!historical || !redesign) return null;

  return (
    <section className="cs-transformation-section">
      <div className="cs-container">
        {/* Editorial Text Header */}
        <div className="cs-transform-header">
          <span className="cs-transform-kicker">{kicker}</span>
          <h2 className="cs-transform-heading">{heading}</h2>
          <p className="cs-transform-narrative">{narrative}</p>
        </div>

        {/* Visual Transformation: Before vs. After */}
        <div className="cs-transform-comparison-grid">
          {/* Legacy Site */}
          <div className="cs-transform-card cs-transform-legacy">
            <div className="cs-transform-card-badge">
              <span className="cs-badge-dot cs-dot-legacy" />
              <span>{historical.label[locale] || historical.label.en}</span>
              <span className="cs-badge-year">{historical.year}</span>
            </div>

            <div className="cs-transform-img-wrapper">
              <img
                src={historical.src}
                alt={historical.label[locale] || historical.label.en}
                className="cs-transform-img"
                loading="lazy"
              />
            </div>

            <p className="cs-transform-card-caption">
              {historical.caption[locale] || historical.caption.en}
            </p>
          </div>

          {/* New Redesign */}
          <div className="cs-transform-card cs-transform-new">
            <div className="cs-transform-card-badge">
              <span className="cs-badge-dot cs-dot-new" />
              <span>{redesign.label[locale] || redesign.label.en}</span>
              <span className="cs-badge-year">{redesign.year || data.year}</span>
            </div>

            <div className="cs-transform-img-wrapper">
              <img
                src={redesign.src}
                alt={redesign.label[locale] || redesign.label.en}
                className="cs-transform-img"
                loading="lazy"
              />
            </div>

            <p className="cs-transform-card-caption">
              {redesign.caption[locale] || redesign.caption.en}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
