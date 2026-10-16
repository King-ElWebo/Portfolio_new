import React from "react";
import type { Translations } from "~/i18n/translations";
import { HeroPortraitArtifact } from "./HeroPortraitArtifact";

interface HeroProps {
  t: Translations;
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="hero-section max-w-7xl" id="hero" aria-label="Hero Overview">
      {/* Hero Center Grid */}
      <div className="hero-grid">
        {/* Left Column: Two-line Serif Headline, Subheadline & Subtle Link */}
        <div className="hero-left">
          <h1 className="hero-headline">
            {t.hero.headlinePart1} <br />
            <span className="italic-gold">{t.hero.headlineItalic}</span> {t.hero.headlinePart2}
          </h1>

          <p className="hero-subheadline">
            {t.hero.subheadline}
          </p>

          <div className="hero-cta-wrap">
            <a href="#work" className="hero-text-cta">
              <span>{t.hero.cta}</span>
              <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Right Column: Pure Floating Point-Cloud Portrait (No HUD box) */}
        <div className="hero-right">
          <HeroPortraitArtifact />
        </div>
      </div>
    </section>
  );
}
