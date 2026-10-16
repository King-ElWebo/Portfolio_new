import React, { useState } from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";
import { CaseStudyHero } from "../CaseStudyHero";
import { CaseStudyClosing } from "../CaseStudyClosing";

interface LumenwerkCaseStudyViewProps {
  data: CaseStudyData;
  locale: Locale;
}

interface LuminaireConfigState {
  cct: number;
  kelvinLabel: string;
  materialName: { de: string; en: string };
  materialCode: string;
  lumen: number;
  wattage: number;
  cri: string;
  beamAngle: string;
  sku: string;
  accentQuote: { de: string; en: string };
  glowColor: string;
  glowDrop: string;
}

const CONFIG_MODES: Record<"warm" | "neutral", LuminaireConfigState> = {
  warm: {
    cct: 2200,
    kelvinLabel: "2200K · Kerzenschein & Goldglanz",
    materialName: {
      de: "Drehmessing Natur (Handgebürstet)",
      en: "Natural Turned Brass (Hand-Brushed)",
    },
    materialCode: "BRS",
    lumen: 420,
    wattage: 6.5,
    cri: "CRI > 97",
    beamAngle: "68° Asymmetrischer Wallwash",
    sku: "LW-KOR-2200K-BRS-DALI-150",
    accentQuote: {
      de: "Intimes Zonenlicht mit sanfter Wandaufhellung für Bibliotheken, Kaminzimmer und feine Gastronomie.",
      en: "Intimate zonal illumination with soft wall grazing for private libraries, living spaces, and fine dining.",
    },
    glowColor: "rgba(255, 155, 45, 0.45)",
    glowDrop: "rgba(255, 120, 20, 0.2)",
  },
  neutral: {
    cct: 4000,
    kelvinLabel: "4000K · Neutralweiß & Kontur",
    materialName: {
      de: "Vulkanbasalt (Tiefschwarz eloxiert)",
      en: "Volcanic Basalt (Anodized Jet Black)",
    },
    materialCode: "BST",
    lumen: 580,
    wattage: 7.8,
    cri: "CRI > 94",
    beamAngle: "45° Präzisions-Akzentkegel",
    sku: "LW-KOR-4000K-BST-DALI-150",
    accentQuote: {
      de: "Diszipliniertes Arbeits- und Galerielicht mit maximalem Kontrast auf Sichtbeton und Naturstein.",
      en: "Disciplined task and gallery lighting delivering crisp contrast against fair-faced concrete and raw stone.",
    },
    glowColor: "rgba(220, 235, 255, 0.42)",
    glowDrop: "rgba(180, 210, 255, 0.18)",
  },
};

export const LumenwerkCaseStudyView: React.FC<LumenwerkCaseStudyViewProps> = ({ data, locale }) => {
  const isDe = locale === "de";
  const { adminCms, visualExperience } = data;
  const [activeMode, setActiveMode] = useState<"warm" | "neutral">("warm");
  const currentConfig = CONFIG_MODES[activeMode];

  return (
    <div className="cs-lab-view cs-lumenwerk-view">
      {/* Chapter 01: The Project (Cinematic Obsidian Hero) */}
      <CaseStudyHero data={data} locale={locale} />

      {/* Chapter 02: SIGNATURE FEATURE — The Interactive Configurator Demonstration */}
      <section className="cs-lab-section cs-lumenwerk-configurator-section">
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
                ? "Lichtwirkung lässt sich nicht durch statische Tabellen vermitteln. Im LUMENWERK Konfigurator modulieren Planer die Farbtemperatur stufenlos von 2200K bis 4000K. Taktile Oberflächen, Lichtkegel und photometrische Kenndaten reagieren synchron."
                : "Lighting impact cannot be evaluated through static datasheets. In LUMENWERK's configurator, specifiers tune color temperature smoothly from 2200K to 4000K. Tactile materials, beam geometry, and photometric metrics respond in synchrony."}
            </p>
          </div>

          {/* Interactive State Switcher Controls */}
          <div className="cs-lumen-interactive-controller">
            <div className="cs-lumen-controller-header">
              <span className="cs-lumen-controller-tag">
                {isDe ? "INTERAKTIVE LICHTSTEUERUNG · LIVE DEMONSTRATION" : "INTERACTIVE LIGHTING CONTROL · LIVE DEMO"}
              </span>
              <div className="cs-lumen-mode-tabs" role="tablist" aria-label="Licht-Farbtemperatur auswählen">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "warm"}
                  onClick={() => setActiveMode("warm")}
                  className={`cs-lumen-mode-btn ${activeMode === "warm" ? "is-active is-warm" : ""}`}
                >
                  <span className="cs-cct-indicator-dot is-warm-dot" />
                  <span>2200K · Drehmessing Natur</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "neutral"}
                  onClick={() => setActiveMode("neutral")}
                  className={`cs-lumen-mode-btn ${activeMode === "neutral" ? "is-active is-neutral" : ""}`}
                >
                  <span className="cs-cct-indicator-dot is-neutral-dot" />
                  <span>4000K · Vulkanbasalt</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Luminaire Simulation Showcase Frame */}
            <div className="cs-browser-shell cs-lumen-sim-shell">
              <div className="cs-browser-bar">
                <div className="cs-browser-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="cs-browser-address-bar">
                  <span className="cs-browser-lock">🧪</span>
                  <span className="cs-browser-domain">
                    {isDe ? "The Lab · Interaktiver Prototyp / Konfigurator" : "The Lab · Interactive Prototype / Configurator"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-live-pill">
                    <span className="cs-status-indicator" />
                    {isDe ? "CCT-Echtzeitsimulation" : "Realtime CCT Simulation"}
                  </span>
                </div>
              </div>

              <div className="cs-lumen-sim-viewport">
                {/* Dynamic Architectural Halo Glow */}
                <div
                  className="cs-lumen-sim-halo"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${currentConfig.glowColor} 0%, ${currentConfig.glowDrop} 45%, transparent 72%)`,
                  }}
                />

                <div className="cs-lumen-sim-content-grid">
                  {/* Luminaire Visual Stage */}
                  <div className="cs-lumen-stage-visual">
                    <div className="cs-lumen-lamp-container">
                      <img
                        src="/assets/projects/lumenwerk/korona-i.jpg"
                        alt={isDe ? "Korona I Leuchte im Lichtkegel" : "Korona I Luminaire illuminated"}
                        className="cs-lumen-stage-img"
                      />
                      <div className="cs-lumen-beam-overlay" />
                    </div>
                    <div className="cs-lumen-cct-slider-visual">
                      <div className="cs-lumen-cct-track-labels">
                        <span className={activeMode === "warm" ? "is-highlight" : ""}>2200K</span>
                        <span>2700K</span>
                        <span>3000K</span>
                        <span className={activeMode === "neutral" ? "is-highlight" : ""}>4000K</span>
                      </div>
                      <div className="cs-lumen-cct-track">
                        <div
                          className="cs-lumen-cct-handle"
                          style={{ left: activeMode === "warm" ? "0%" : "100%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photometric Technical HUD Panel */}
                  <div className="cs-lumen-stage-hud">
                    <div className="cs-hud-header">
                      <span className="cs-hud-model">KORONA I WALL-GRAZER</span>
                      <span className="cs-hud-badge">{currentConfig.sku}</span>
                    </div>

                    <div className="cs-hud-specs-grid">
                      <div className="cs-hud-spec-item">
                        <span className="cs-hud-label">{isDe ? "Farbtemperatur" : "Color Temp"}</span>
                        <span className="cs-hud-value cs-hud-cct-val">{currentConfig.cct} K</span>
                      </div>
                      <div className="cs-hud-spec-item">
                        <span className="cs-hud-label">{isDe ? "Lichtstrom" : "Luminous Flux"}</span>
                        <span className="cs-hud-value">{currentConfig.lumen} lm</span>
                      </div>
                      <div className="cs-hud-spec-item">
                        <span className="cs-hud-label">{isDe ? "Farbwiedergabe" : "Color Rendering"}</span>
                        <span className="cs-hud-value">{currentConfig.cri}</span>
                      </div>
                      <div className="cs-hud-spec-item">
                        <span className="cs-hud-label">{isDe ? "Systemleistung" : "System Power"}</span>
                        <span className="cs-hud-value">{currentConfig.wattage} W</span>
                      </div>
                      <div className="cs-hud-spec-item cs-hud-spec-wide">
                        <span className="cs-hud-label">{isDe ? "Materialität" : "Material Finish"}</span>
                        <span className="cs-hud-value">{currentConfig.materialName[locale] || currentConfig.materialName.en}</span>
                      </div>
                      <div className="cs-hud-spec-item cs-hud-spec-wide">
                        <span className="cs-hud-label">{isDe ? "Optik & Ausstrahlung" : "Optics & Beam"}</span>
                        <span className="cs-hud-value">{currentConfig.beamAngle}</span>
                      </div>
                    </div>

                    <div className="cs-hud-quote-box">
                      <p className="cs-hud-quote-text">
                        "{currentConfig.accentQuote[locale] || currentConfig.accentQuote.en}"
                      </p>
                    </div>

                    <div className="cs-hud-footer">
                      <span className="cs-hud-pill">DALI-2 BUS</span>
                      <span className="cs-hud-pill">PHASENABSCHNITT</span>
                      <span className="cs-hud-pill">IP44 WET AREA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="cs-hero-visual-caption">
              {isDe
                ? "Interaktive Kelvin- und Materialsimulation: Taktile Farbtemperaturregelung (2200K–4000K) mit synchroner Neuberechnung aller fotometrischen Werte und dynamischer SKU-Generierung."
                : "Interactive Kelvin and finish simulation: Tactile CCT modulation (2200K–4000K) with synchronous recalculation of photometric metrics and dynamic SKU generation."}
            </p>
          </div>

          {/* Authentic Configurator Interface Close-Up Crop */}
          <div className="cs-lumen-macro-crop-card">
            <div className="cs-macro-crop-header">
              <span className="cs-macro-crop-tag">
                {isDe ? "SCHNITTSTELLEN-DETAIL: REAKTIVE REGLER & MATERIALWAHL" : "INTERFACE DETAIL: REACTIVE SLIDERS & MATERIAL CHIPS"}
              </span>
            </div>
            <div className="cs-macro-crop-img-wrap">
              <img
                src={adminCms.screenshot.src}
                alt={adminCms.screenshot.alt[locale] || adminCms.screenshot.alt.en}
                className="cs-macro-crop-img"
                loading="eager"
              />
            </div>
            <p className="cs-macro-crop-caption">
              {isDe
                ? "Ausschnitt der tatsächlichen Konfigurator-Oberfläche: Präzise numerische Kelvin-Justierung, visuelle Lichtkegel-Simulation und automatisierte Generierung von Bestelldaten für Lichtplaner."
                : "Close-up of the actual configurator interface: High-precision numerical Kelvin tuning, visual beam distribution, and automated spec generation for lighting architects."}
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 03: Dedicated B2B Specifier & Architect Portal */}
      <section className="cs-lab-section cs-lumenwerk-b2b-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "03 / B2B-ARCHITEKTUR & FACHPLANUNG" : "03 / B2B ARCHITECTURE & SPECIFICATION"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Ausschreibungstexte, IES-Photometrie und Konditionen für Planer."
                : "Tender specifications, IES photometry, and trade terms for planners."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "High-End-Leuchten verlangen eine doppelte Ansprache: Emotionale Kuration für Bauherren, exakte technische Datensätze für Lichtplaner."
                : "High-end luminaires demand dual communication: Emotive curation for patrons, exact photometric datasets for specifiers."}
            </p>
          </div>

          {/* Focused B2B Specifier Tools Grid */}
          <div className="cs-lumen-b2b-suite-grid">
            <div className="cs-b2b-suite-card">
              <div className="cs-b2b-suite-icon">📊</div>
              <h3 className="cs-b2b-suite-title">{isDe ? "IES / LDT Photometrie" : "IES / LDT Photometry"}</h3>
              <p className="cs-b2b-suite-text">
                {isDe
                  ? "Verifizierte Lichtstärkeverteilungskurven für Dialux Evo und Relux mit realen Messdaten zur exakten Beleuchtungsstärkeberechnung."
                  : "Verified luminous intensity distribution data for Dialux Evo and Relux enabling exact lux calculations."}
              </p>
            </div>
            <div className="cs-b2b-suite-card">
              <div className="cs-b2b-suite-icon">📐</div>
              <h3 className="cs-b2b-suite-title">{isDe ? "3D BIM & Revit-Familien" : "3D BIM & Revit Assets"}</h3>
              <p className="cs-b2b-suite-text">
                {isDe
                  ? "Parametrische CAD- und Revit-Bauteile mit integrierten Anschlusswerten, Lichtaustrittsflächen und Wandabständen."
                  : "Parametric CAD and Revit families with integrated electrical loads, light emission planes, and clearance offsets."}
              </p>
            </div>
            <div className="cs-b2b-suite-card">
              <div className="cs-b2b-suite-icon">📄</div>
              <h3 className="cs-b2b-suite-title">{isDe ? "GAEB & ÖNORM Texte" : "Tender Specifications"}</h3>
              <p className="cs-b2b-suite-text">
                {isDe
                  ? "Vorkonfigurierte Ausschreibungstexte für Leistungsverzeichnisse inklusive DALI-2 Steuerprotokoll und Treibervorgaben."
                  : "Standardized tender texts for architectural specification schedules including DALI-2 protocols and driver specs."}
              </p>
            </div>
            <div className="cs-b2b-suite-card">
              <div className="cs-b2b-suite-icon">🔒</div>
              <h3 className="cs-b2b-suite-title">{isDe ? "Fachpartner-Konditionen" : "Trade Partner Terms"}</h3>
              <p className="cs-b2b-suite-text">
                {isDe
                  ? "Gestaffelte Rabattstrukturen für registrierte Architekturbüros, Lichtplaner und Großprojekte mit Projektmengenrabatt."
                  : "Tiered trade margins and project discounting for registered architectural practices and lighting designers."}
              </p>
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
                    {isDe ? "The Lab · Architektenportal / Fachpartner" : "The Lab · Specifier Portal / Trade Partners"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-b2b-pill">
                    {isDe ? "B2B-Planerbereich" : "B2B Specifier Suite"}
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

      {/* Chapter 04: Mobile Precision & Curated Sculptures */}
      <section className="cs-lab-section cs-lumenwerk-mobile-sculptures-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "04 / MOBILE HAPTIK & MATERIALITÄT" : "04 / MOBILE POLISH & MATERIALITY"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Taktile Touchbedienung trifft architektonische Schwere."
                : "Tactile touch interaction meets architectural presence."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Flüssiges Wischen zwischen Leuchtenserien und native Gestensteuerung für mobile Bauherren-Präsentationen."
                : "Fluid swiping through luminaire series and calibrated touch ergonomics for on-site client presentations."}
            </p>
          </div>

          <div className="cs-lab-dual-media-grid">
            {/* Mobile View */}
            <div className="cs-lab-mobile-box">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Mobile Touch-Erlebnis" : "Mobile Touch View"} · 390px
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

            {/* Curated Physical Object Details */}
            <div className="cs-lab-objects-box">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Physische Skulpturen & Lichtwirkung" : "Physical Sculptures & Illumination"}
                </span>
              </div>

              <div className="cs-lumen-objects-cards">
                <div className="cs-lumen-object-card">
                  <div className="cs-lumen-obj-img-wrap">
                    <img
                      src="/assets/projects/lumenwerk/korona-i.jpg"
                      alt="Korona I Wandfluter"
                      className="cs-lumen-obj-img"
                      loading="eager"
                    />
                    <span className="cs-lumen-obj-badge">Wandfluter · Rohmessing</span>
                  </div>
                  <div className="cs-lumen-obj-info">
                    <h4>Korona I</h4>
                    <p>
                      {isDe
                        ? "Gebürstetes Rohmessing mit asymmetrischem Reflektor für sanfte, kontemplative Wandaufhellung."
                        : "Brushed raw brass with asymmetric reflector for soft, contemplative ambient wall wash."}
                    </p>
                  </div>
                </div>

                <div className="cs-lumen-object-card">
                  <div className="cs-lumen-obj-img-wrap">
                    <img
                      src="/assets/projects/lumenwerk/lumen-globe.jpg"
                      alt="Lumen Globe Ambientlicht"
                      className="cs-lumen-obj-img"
                      loading="eager"
                    />
                    <span className="cs-lumen-obj-badge">Sphärisches Licht · Travertin</span>
                  </div>
                  <div className="cs-lumen-obj-info">
                    <h4>Lumen Globe</h4>
                    <p>
                      {isDe
                        ? "Diffuser Glaskörper auf massivem Travertinsockel für skulpturale Lichtinseln im Raum."
                        : "Diffuse glass sphere anchored in solid travertine for sculptural illumination plinths."}
                    </p>
                  </div>
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
