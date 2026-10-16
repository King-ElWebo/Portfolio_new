import React from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";

interface CaseStudyGalleryProps {
  data: CaseStudyData;
  locale: Locale;
}

export const CaseStudyGallery: React.FC<CaseStudyGalleryProps> = ({ data, locale }) => {
  const { visualExperience } = data;
  const kicker = visualExperience.kicker[locale] || visualExperience.kicker.en;
  const heading = visualExperience.heading[locale] || visualExperience.heading.en;
  const subheadline = visualExperience.subheadline[locale] || visualExperience.subheadline.en;

  const { desktopShowcase, mobileShowcase, lookbook, storeAtmosphere } = visualExperience;

  return (
    <section className="cs-gallery-section">
      <div className="cs-container">
        {/* Editorial Section Header */}
        <div className="cs-gallery-header">
          <span className="cs-kicker">{kicker}</span>
          <h2 className="cs-gallery-heading">{heading}</h2>
          <p className="cs-gallery-subheadline">{subheadline}</p>
        </div>

        {/* 1. Dual Device Presentation: Desktop + Mobile */}
        <div className="cs-dual-device-showcase">
          {/* Desktop Device */}
          <div className="cs-device-desktop">
            <div className="cs-device-header">
              <span className="cs-device-tag">
                {locale === "de" ? "Desktop-Erlebnis" : "Desktop Experience"} · 1440px
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
                  <span className="cs-browser-domain">
                    {data.displayDomain ||
                      (() => {
                        try {
                          return new URL(data.liveUrl).hostname.replace(/^www\./, "");
                        } catch {
                          return data.liveUrl;
                        }
                      })()}
                  </span>
                </div>
              </div>
              <div className="cs-browser-viewport">
                <img
                  src={desktopShowcase.src}
                  alt={desktopShowcase.alt[locale] || desktopShowcase.alt.en}
                  className="cs-browser-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Mobile Device */}
          <div className="cs-device-mobile">
            <div className="cs-device-header">
              <span className="cs-device-tag">
                {locale === "de" ? "Mobile First" : "Mobile View"} · 390px
              </span>
            </div>
            <div className="cs-phone-shell">
              <div className="cs-phone-notch" />
              <div className="cs-phone-viewport">
                <img
                  src={mobileShowcase.src}
                  alt={mobileShowcase.alt[locale] || mobileShowcase.alt.en}
                  className="cs-phone-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Curated Lookbook / Feature Strip */}
        <div className="cs-lookbook-block">
          <div className="cs-block-intro">
            <span className="cs-block-kicker">
              {visualExperience.lookbookKicker
                ? visualExperience.lookbookKicker[locale] || visualExperience.lookbookKicker.en
                : locale === "de"
                ? "KURATIERTE HIGHLIGHTS"
                : "CURATED HIGHLIGHTS"}
            </span>
            <p className="cs-block-text">
              {visualExperience.lookbookDescription
                ? visualExperience.lookbookDescription[locale] || visualExperience.lookbookDescription.en
                : locale === "de"
                ? "Saisonale Zusammenstellungen aus Naturmaterialien, Leinen und feiner Wolle."
                : "Seasonal outfits crafted from sustainable linen, pure silk, and fine knitwear."}
            </p>
          </div>

          <div className="cs-lookbook-grid">
            {lookbook.map((item, idx) => (
              <div key={idx} className="cs-lookbook-card">
                <div className="cs-lookbook-img-box">
                  <img
                    src={item.image}
                    alt={item.title[locale] || item.title.en}
                    className="cs-lookbook-img"
                    loading="lazy"
                  />
                  <div className="cs-lookbook-badge">
                    <span>{item.category[locale] || item.category.en}</span>
                  </div>
                </div>
                <div className="cs-lookbook-info">
                  <h4 className="cs-lookbook-item-title">
                    {item.title[locale] || item.title.en}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Physical Store / Craft / Atmosphere */}
        <div className="cs-atmosphere-block">
          <div className="cs-block-intro">
            <span className="cs-block-kicker">
              {visualExperience.atmosphereKicker
                ? visualExperience.atmosphereKicker[locale] || visualExperience.atmosphereKicker.en
                : locale === "de"
                ? "DAS LADENGESCHÄFT"
                : "THE PHYSICAL BOUTIQUE"}
            </span>
            <p className="cs-block-text">
              {visualExperience.atmosphereDescription
                ? visualExperience.atmosphereDescription[locale] || visualExperience.atmosphereDescription.en
                : locale === "de"
                ? "Authentischer Einblick in die Hietzinger Boutique und persönliche Beratung vor Ort."
                : "Authentic atmosphere of the Viennese boutique and in-person personal styling."}
            </p>
          </div>

          <div className="cs-atmosphere-grid">
            {storeAtmosphere.map((entry, idx) => (
              <figure key={idx} className="cs-atmosphere-card">
                <div className="cs-atmosphere-img-box">
                  <img
                    src={entry.image}
                    alt={entry.caption[locale] || entry.caption.en}
                    className="cs-atmosphere-img"
                    loading="eager"
                  />
                </div>
                <figcaption className="cs-atmosphere-caption">
                  {entry.caption[locale] || entry.caption.en}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
