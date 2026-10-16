import React, { useState } from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";
import { CaseStudyHero } from "../CaseStudyHero";
import { CaseStudyClosing } from "../CaseStudyClosing";

interface RoestwerkCaseStudyViewProps {
  data: CaseStudyData;
  locale: Locale;
}

export const RoestwerkCaseStudyView: React.FC<RoestwerkCaseStudyViewProps> = ({ data, locale }) => {
  const isDe = locale === "de";
  const { adminCms, visualExperience } = data;

  const [sensoryStep, setSensoryStep] = useState<"preference" | "radar">("radar");
  const [brewMode, setBrewMode] = useState<"single" | "batch">("single");

  // Calculate Radar Polygon Points for 5 Axes
  // Center (150, 150), Max Radius = 100
  // Values: Sweetness 9/10, Acidity 8/10, Body 5/10, Florality 9/10, Roast 3/10
  const radarAxes = [
    { label: isDe ? "SÜSSE" : "SWEETNESS", val: 0.9, angle: -90 },
    { label: isDe ? "SÄURE" : "ACIDITY", val: 0.8, angle: -18 },
    { label: isDe ? "KÖRPER" : "BODY", val: 0.5, angle: 54 },
    { label: isDe ? "FLORALITÄT" : "FLORAL", val: 0.9, angle: 126 },
    { label: isDe ? "RÖSTGRAD" : "ROAST DEPTH", val: 0.3, angle: 198 },
  ];

  const getPoint = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const x = 200 + radius * Math.cos(rad);
    const y = 155 + radius * Math.sin(rad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const radarPolygonPoints = radarAxes
    .map((axis) => getPoint(axis.angle, axis.val * 90))
    .join(" ");

  return (
    <div className="cs-lab-view cs-roestwerk-view">
      {/* Chapter 01: The Project (Warm Umber Editorial Hero) */}
      <CaseStudyHero data={data} locale={locale} />

      {/* Chapter 02: SIGNATURE FEATURE — The Flavor Radar & Sensory Finder */}
      <section className="cs-lab-section cs-roestwerk-flavor-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {adminCms.kicker[locale] || adminCms.kicker.en}
            </span>
            <h2 className="cs-lab-heading">
              {adminCms.heading[locale] || adminCms.heading.en}
            </h2>
            <p className="cs-lab-subheadline">
              {adminCms.subheadline[locale] || adminCms.subheadline.en}
            </p>
            <p className="cs-lab-narrative">
              {isDe
                ? "Specialty Coffee schreckt Einsteiger oft ab: Elitärer Cupping-Jargon verdeckt den eigentlichen Genuss. RÖSTWERK 1070 übersetzt sensorische Parameter in ein interaktives 5-Achsen-Radar. Vorlieben werden spielerisch erfasst und führen direkt zur idealen Röstung."
                : "Specialty coffee often alienates newcomers with inaccessible cupping jargon. RÖSTWERK 1070 translates cupping characteristics into an interactive 5-axis radar graph. Tastes are logged playfully to match the ideal roast crafted in Vienna Neubau."}
            </p>
          </div>

          {/* Interactive Sensory Journey Switcher */}
          <div className="cs-roestwerk-interactive-controller">
            <div className="cs-roestwerk-controller-header">
              <span className="cs-roestwerk-controller-tag">
                {isDe ? "SENSORIK-FINDER · INTERAKTIVE GESCHMACKS-REISE" : "SENSORY FINDER · INTERACTIVE TASTE JOURNEY"}
              </span>
              <div className="cs-roestwerk-mode-tabs" role="tablist" aria-label="Sensorik-Schritt auswählen">
                <button
                  type="button"
                  role="tab"
                  aria-selected={sensoryStep === "preference"}
                  onClick={() => setSensoryStep("preference")}
                  className={`cs-roest-tab-btn ${sensoryStep === "preference" ? "is-active" : ""}`}
                >
                  <span className="cs-tab-num">01</span>
                  <span>{isDe ? "Sensorische Vorlieben" : "Sensory Preferences"}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={sensoryStep === "radar"}
                  onClick={() => setSensoryStep("radar")}
                  className={`cs-roest-tab-btn ${sensoryStep === "radar" ? "is-active" : ""}`}
                >
                  <span className="cs-tab-num">02</span>
                  <span>{isDe ? "Das Match & 5-Achsen Radar" : "Bean Match & Flavor Radar"}</span>
                </button>
              </div>
            </div>

            {/* Sensory Finder Interactive Shell */}
            <div className="cs-browser-shell cs-roest-sim-shell">
              <div className="cs-browser-bar">
                <div className="cs-browser-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="cs-browser-address-bar">
                  <span className="cs-browser-lock">🧪</span>
                  <span className="cs-browser-domain">
                    {isDe ? "The Lab · Sensorik-Finder / Geschmacksprofil" : "The Lab · Sensory Finder / Flavor Profile"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-live-pill cs-roestwerk-badge">
                    <span className="cs-status-indicator" />
                    {isDe ? "SVG-Sensorik Radar" : "SVG Sensory Engine"}
                  </span>
                </div>
              </div>

              <div className="cs-roest-sim-viewport">
                {sensoryStep === "preference" ? (
                  <div className="cs-roest-preference-panel">
                    <div className="cs-pref-header">
                      <span className="cs-pref-kicker">{isDe ? "SCHRITT 01 VON 02" : "STEP 01 OF 02"}</span>
                      <h3 className="cs-pref-title">
                        {isDe ? "Wie genießen Sie Ihren Kaffee am liebsten?" : "How do you prefer your daily coffee?"}
                      </h3>
                    </div>

                    <div className="cs-pref-options-grid">
                      <div className="cs-pref-group">
                        <span className="cs-pref-label">{isDe ? "Zubereitungsmethode" : "Brew Method"}</span>
                        <div className="cs-pref-chips">
                          <span className="cs-pref-chip is-selected">Hario V60 (Filter) ✓</span>
                          <span className="cs-pref-chip">Aeropress</span>
                          <span className="cs-pref-chip">Siebträger</span>
                          <span className="cs-pref-chip">French Press</span>
                        </div>
                      </div>

                      <div className="cs-pref-group">
                        <span className="cs-pref-label">{isDe ? "Aromen-Fokus" : "Flavor Profile"}</span>
                        <div className="cs-pref-chips">
                          <span className="cs-pref-chip is-selected">Fruchtig & Floral (Jasmin, Pfirsich) ✓</span>
                          <span className="cs-pref-chip">Schokolade & Mandel</span>
                          <span className="cs-pref-chip">Würzige Tiefe</span>
                        </div>
                      </div>

                      <div className="cs-pref-group">
                        <span className="cs-pref-label">{isDe ? "Röstgrad & Säure" : "Roast & Acidity"}</span>
                        <div className="cs-pref-chips">
                          <span className="cs-pref-chip is-selected">Hell (Lebendige Fruchtsäure) ✓</span>
                          <span className="cs-pref-chip">Medium (Ausbalanciert)</span>
                          <span className="cs-pref-chip">Dunkel (Traditionell)</span>
                        </div>
                      </div>
                    </div>

                    <div className="cs-pref-match-cta">
                      <div className="cs-pref-match-hint">
                        <span className="cs-match-count">1</span>
                        <span>{isDe ? "Perfekt harmonierende Mikrolot-Röstung ermittelt." : "Perfect single-origin roast matched."}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSensoryStep("radar")}
                        className="cs-roest-action-btn"
                      >
                        {isDe ? "Ergebnis & Aromenradar anzeigen →" : "Show Match & Flavor Radar →"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="cs-roest-radar-panel">
                    <div className="cs-radar-layout-cols">
                      {/* SVG Radar Chart Box */}
                      <div className="cs-radar-visual-box">
                        <div className="cs-radar-svg-wrap">
                          <svg
                            viewBox="0 0 400 320"
                            className="cs-radar-svg"
                            aria-label="5-Achsen Geschmacksprofil Radar"
                          >
                            {/* Concentric Grid Pentagons */}
                            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => {
                              const pts = radarAxes
                                .map((a) => getPoint(a.angle, level * 90))
                                .join(" ");
                              return (
                                <polygon
                                  key={idx}
                                  points={pts}
                                  fill="none"
                                  stroke="rgba(212, 142, 94, 0.18)"
                                  strokeWidth="1"
                                />
                              );
                            })}

                            {/* Spoke Axis Lines */}
                            {radarAxes.map((axis, idx) => {
                              const pt = getPoint(axis.angle, 90);
                              return (
                                <line
                                  key={idx}
                                  x1="200"
                                  y1="155"
                                  x2={pt.split(",")[0]}
                                  y2={pt.split(",")[1]}
                                  stroke="rgba(212, 142, 94, 0.28)"
                                  strokeWidth="1"
                                />
                              );
                            })}

                            {/* Data Polygon */}
                            <polygon
                              points={radarPolygonPoints}
                              fill="rgba(212, 142, 94, 0.38)"
                              stroke="#ffb380"
                              strokeWidth="2.5"
                              className="cs-radar-data-poly"
                            />

                            {/* Vertex Circles */}
                            {radarAxes.map((axis, idx) => {
                              const [cx, cy] = getPoint(axis.angle, axis.val * 90).split(",");
                              return (
                                <circle
                                  key={idx}
                                  cx={cx}
                                  cy={cy}
                                  r="4"
                                  fill="#ffb380"
                                  stroke="#1a1512"
                                  strokeWidth="2"
                                />
                              );
                            })}

                            {/* Axis Text Labels */}
                            <text x="200" y="25" textAnchor="middle" className="cs-radar-lbl">SÜSSE (9/10)</text>
                            <text x="305" y="130" textAnchor="start" className="cs-radar-lbl">SÄURE (8/10)</text>
                            <text x="265" y="265" textAnchor="start" className="cs-radar-lbl">KÖRPER (5/10)</text>
                            <text x="135" y="265" textAnchor="end" className="cs-radar-lbl">FLORAL (9/10)</text>
                            <text x="95" y="130" textAnchor="end" className="cs-radar-lbl">RÖSTGRAD (3/10)</text>
                          </svg>
                        </div>
                        <span className="cs-radar-caption-tag">
                          {isDe ? "Aromen-Polygon: Flora Neubau" : "Flavor Polygon: Flora Neubau"}
                        </span>
                      </div>

                      {/* Bean Detail Card */}
                      <div className="cs-radar-bean-detail">
                        <div className="cs-bean-match-badge">
                          <span>{isDe ? "100% PASSENDES PROFIL" : "100% PROFILE MATCH"}</span>
                        </div>

                        <h3 className="cs-bean-title">Flora Neubau</h3>
                        <span className="cs-bean-origin">
                          Äthiopien · Yirgacheffe · 2.100 m ü. M. · Gewaschen (Washed)
                        </span>

                        <div className="cs-bean-notes-strip">
                          <span className="cs-note-pill">Bergamotte</span>
                          <span className="cs-note-pill">Pfirsichblüte</span>
                          <span className="cs-note-pill">Jasmin</span>
                          <span className="cs-note-pill">Weißer Tee</span>
                        </div>

                        <p className="cs-bean-description">
                          {isDe
                            ? "Eine außergewöhnlich saubere, florale Röstung für Liebhaber klarer Fruchtigkeit. Handverlesene Heirloom-Varietäten, schonend im gasbeheizten Trommelröster veredelt."
                            : "An exceptionally clean, floral filter roast for lovers of crisp acidity and sweet stone fruits. Hand-picked heirloom lots gently roasted in small batches in Vienna Neubau."}
                        </p>

                        <div className="cs-bean-brew-tip">
                          <span className="cs-tip-icon">☕</span>
                          <span>{isDe ? "Empfehlung: Handfilter V60, 92°C, Verhältnis 1:16.7, 2:45 min Brühzeit." : "Recommendation: V60 filter, 92°C, 1:16.7 ratio, 2:45 min drawdown."}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSensoryStep("preference")}
                          className="cs-roest-sub-btn"
                        >
                          {isDe ? "← Vorlieben neu anpassen" : "← Adjust Preferences"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="cs-hero-visual-caption">
              {isDe
                ? "Interaktive Sensorik-Reise: Der Finder ermittelt über drei visuelle Vorlieben-Dimensionen die optimale Röstung und visualisiert das Cupping-Profil über ein reaktives 5-Achsen SVG Radar."
                : "Interactive sensory journey: Translating three intuitive taste dimensions into the ideal roast profile, visualised via a dynamic 5-axis SVG flavor radar."}
            </p>
          </div>

          {/* Authentic Flavor Radar Screenshot */}
          <div className="cs-lab-showcase-frame">
            <div className="cs-browser-shell">
              <div className="cs-browser-bar">
                <div className="cs-browser-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="cs-browser-address-bar">
                  <span className="cs-browser-lock">🧪</span>
                  <span className="cs-browser-domain">
                    {isDe ? "The Lab · Sensorik-Finder / Live-Ansicht" : "The Lab · Sensory Finder / Live View"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-live-pill cs-roestwerk-badge">
                    <span className="cs-status-indicator" />
                    {isDe ? "Sensorik-Finder" : "Sensory Finder"}
                  </span>
                </div>
              </div>

              <div className="cs-browser-viewport">
                <img
                  src={adminCms.screenshot.src}
                  alt={adminCms.screenshot.alt[locale] || adminCms.screenshot.alt.en}
                  className="cs-browser-img"
                  loading="eager"
                />
              </div>
            </div>

            <p className="cs-hero-visual-caption">
              {adminCms.screenshot.caption[locale] || adminCms.screenshot.caption.en}
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 03: Dynamic Extraction — The Brew Calculator */}
      <section className="cs-lab-section cs-roestwerk-brew-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "03 / INTERAKTIVE EXTRAKTION: DER BRÜHRECHNER" : "03 / INTERACTIVE EXTRACTION: BREW CALCULATOR"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Präzision in der Tasse: Zubereitungsmethode, Brühverhältnis & Gramm."
                : "Precision in the cup: Brew method, ratio & gram dosage."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Der integrierte Rechner kalkuliert Wassermenge, Kaffeemehl und Ziel-Brühzeit abgestimmt auf V60, Aeropress, French Press und Siebträger."
                : "The built-in calculator balances coffee weight, water volume, and extraction timing for V60, Aeropress, French Press, and espresso."}
            </p>
          </div>

          {/* Interactive Brew Calculator Controller */}
          <div className="cs-brew-interactive-controller">
            <div className="cs-brew-toggle-row">
              <span className="cs-brew-toggle-label">{isDe ? "DOSIERUNG & METHODE WÄHLEN:" : "SELECT DOSAGE & METHOD:"}</span>
              <div className="cs-brew-tabs">
                <button
                  type="button"
                  onClick={() => setBrewMode("single")}
                  className={`cs-brew-tab ${brewMode === "single" ? "is-active" : ""}`}
                >
                  {isDe ? "Single Cup · Hario V60 (1 Tasse / 250 ml)" : "Single Cup · Hario V60 (1 Cup / 250 ml)"}
                </button>
                <button
                  type="button"
                  onClick={() => setBrewMode("batch")}
                  className={`cs-brew-tab ${brewMode === "batch" ? "is-active" : ""}`}
                >
                  {isDe ? "Chemex Batch · (2–3 Tassen / 500 ml)" : "Chemex Batch · (2–3 Cups / 500 ml)"}
                </button>
              </div>
            </div>

            <div className="cs-brew-hud-card">
              <div className="cs-brew-metrics-grid">
                <div className="cs-metric-card">
                  <span className="cs-metric-k">{isDe ? "Kaffeemehl" : "Coffee Dose"}</span>
                  <span className="cs-metric-v">{brewMode === "single" ? "15.0 g" : "30.0 g"}</span>
                  <span className="cs-metric-sub">{brewMode === "single" ? "Frisch gemahlen (V60)" : "Grob gemahlen (Chemex)"}</span>
                </div>
                <div className="cs-metric-card">
                  <span className="cs-metric-k">{isDe ? "Wassermenge" : "Water Volume"}</span>
                  <span className="cs-metric-v">{brewMode === "single" ? "250 ml" : "500 ml"}</span>
                  <span className="cs-metric-sub">{brewMode === "single" ? "92°C Brühwasser" : "94°C Brühwasser"}</span>
                </div>
                <div className="cs-metric-card">
                  <span className="cs-metric-k">{isDe ? "Brühverhältnis" : "Ratio"}</span>
                  <span className="cs-metric-v">1 : 16.7</span>
                  <span className="cs-metric-sub">Golden Cup Standard</span>
                </div>
                <div className="cs-metric-card">
                  <span className="cs-metric-k">{isDe ? "Brühzeit" : "Total Time"}</span>
                  <span className="cs-metric-v">{brewMode === "single" ? "2:45 min" : "4:15 min"}</span>
                  <span className="cs-metric-sub">Inkl. 45s Blooming</span>
                </div>
              </div>

              {/* Pouring Timeline Phases */}
              <div className="cs-pour-timeline">
                <span className="cs-timeline-title">{isDe ? "AUFGUSS-ZEITACHSE" : "POUR TIMELINE"}</span>
                <div className="cs-pour-steps-grid">
                  <div className="cs-pour-step">
                    <span className="cs-step-time">0:00 – 0:45</span>
                    <span className="cs-step-name">Blooming</span>
                    <span className="cs-step-desc">
                      {brewMode === "single"
                        ? "45 ml Wasser aufgießen, Kaffeebett sanft schwenken, CO2 entweichen lassen."
                        : "90 ml Wasser aufgießen, Kaffeebett gleichmäßig benetzen und entgasen lassen."}
                    </span>
                  </div>
                  <div className="cs-pour-step">
                    <span className="cs-step-time">0:45 – 1:30</span>
                    <span className="cs-step-name">{isDe ? "1. Aufguss" : "First Pour"}</span>
                    <span className="cs-step-desc">
                      {brewMode === "single"
                        ? "In ruhigen Kreisen bis 150 ml aufgießen. Papierfilter nicht direkt besprühen."
                        : "Kontinuierlich in Spiralen bis 300 ml aufgießen."}
                    </span>
                  </div>
                  <div className="cs-pour-step">
                    <span className="cs-step-time">{brewMode === "single" ? "1:30 – 2:45" : "2:00 – 4:15"}</span>
                    <span className="cs-step-name">{isDe ? "2. Aufguss & Drawdown" : "Final Pour & Drawdown"}</span>
                    <span className="cs-step-desc">
                      {brewMode === "single"
                        ? "Zentriert bis 250 ml auffüllen, einmal schwenken und komplett abtropfen lassen."
                        : "Gleichmäßig bis 500 ml auffüllen, Bett eben absinken lassen."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cs-lab-showcase-frame">
            <div className="cs-browser-shell">
              <div className="cs-browser-bar">
                <div className="cs-browser-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="cs-browser-address-bar">
                  <span className="cs-browser-lock">🧪</span>
                  <span className="cs-browser-domain">
                    {isDe ? "The Lab · Brührechner / Extraktionsprotokoll" : "The Lab · Brew Calculator / Extraction Guide"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-b2b-pill">
                    {isDe ? "Brührechner · 1:16.7" : "Brew Calculator · 1:16.7"}
                  </span>
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
        </div>
      </section>

      {/* Chapter 04: Mobile Ritual & Roastery Craft */}
      <section className="cs-lab-section cs-roestwerk-craft-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "04 / MOBILER SHOP & HANDWERK" : "04 / MOBILE SHOP & ROASTING CRAFT"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Sinnliche Kaffeekultur auf jedem Display."
                : "Tactile coffee culture on every screen."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Mobile Touch-Navigation für Kaffeeliebhaber unterwegs, verbunden mit echter handwerklicher Trommelröstung im 7. Wiener Gemeindebezirk."
                : "Mobile touch commerce for coffee enthusiasts on the move, anchored in traditional small-batch drum roasting in Vienna Neubau."}
            </p>
          </div>

          <div className="cs-lab-dual-media-grid">
            {/* Mobile View */}
            <div className="cs-lab-mobile-box">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Mobile Bohnenselektion" : "Mobile Bean Selection"} · 390px
                </span>
              </div>
              <div className="cs-phone-shell">
                <div className="cs-phone-notch" />
                <div className="cs-phone-viewport">
                  <img
                    src={visualExperience.mobileShowcase.src}
                    alt={visualExperience.mobileShowcase.alt[locale] || visualExperience.mobileShowcase.alt.en}
                    className="cs-phone-img"
                    loading="eager"
                  />
                </div>
              </div>
              <p className="cs-hero-visual-caption">
                {visualExperience.mobileShowcase.caption[locale] || visualExperience.mobileShowcase.caption.en}
              </p>
            </div>

            {/* Roastery Craft Context */}
            <div className="cs-lab-objects-box">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Trommelröstung im 7. Bezirk" : "Drum Roasting in District 7"}
                </span>
              </div>

              <div className="cs-roest-craft-card">
                <div className="cs-roest-craft-img-wrap">
                  <img
                    src="/assets/projects/roestwerk/roesterei-hero.jpg"
                    alt={isDe ? "Trommelröster in Wien Neubau" : "Drum roaster in Vienna Neubau"}
                    className="cs-roest-craft-img"
                    loading="eager"
                  />
                  <span className="cs-roest-craft-badge">Small-Batch Röstung · 1070 Wien</span>
                </div>
                <div className="cs-roest-craft-info">
                  <h4>Tradition & Dritte Welle</h4>
                  <p>
                    {isDe
                      ? "Wiener Kaffeehauskultur trifft auf sensorische Präzision: Handverlesene Arabica-Bohnen, schonend im gasbeheizten Trommelröster veredelt."
                      : "Viennese coffeehouse heritage meets third-wave precision: Hand-selected Arabica cherries, roasted in small batches in a gas-fired drum roaster."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 05: Outcome, Technology & Closing */}
      <CaseStudyClosing data={data} locale={locale} />
    </div>
  );
};
