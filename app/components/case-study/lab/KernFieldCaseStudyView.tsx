import React, { useState } from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";
import { CaseStudyHero } from "../CaseStudyHero";
import { CaseStudyClosing } from "../CaseStudyClosing";

interface KernFieldCaseStudyViewProps {
  data: CaseStudyData;
  locale: Locale;
}

interface ProjectRecord {
  num: string;
  title: string;
  typology: { de: string; en: string };
  location: string;
  coords: string;
  altitude: string;
  year: string;
  materials: { de: string; en: string };
  image: string;
}

const MONOGRAPH_WORKS: ProjectRecord[] = [
  {
    num: "01",
    title: "House Between Pines",
    typology: { de: "Wohnhaus & Atelier", en: "Residence & Studio" },
    location: "Graubünden, CH",
    coords: "46°58'12\"N, 9°31'45\"E",
    altitude: "1.420 m ü. M.",
    year: "2024",
    materials: {
      de: "Alpine Lärche (unbehandelt) & Gezeiten-Sichtbeton",
      en: "Raw Alpine Larch & Fair-Faced Formwork Concrete",
    },
    image: "/assets/projects/kern-field/hero-house-between-pines.webp",
  },
  {
    num: "02",
    title: "Quarry Bath",
    typology: { de: "Thermenbau & Quellbecken", en: "Thermal Bath & Springs" },
    location: "Wallis, CH",
    coords: "46°30'24\"N, 8°02'19\"E",
    altitude: "1.150 m ü. M.",
    year: "2023",
    materials: {
      de: "Monolithischer Valser Granit & Quellwasser-Solebecken",
      en: "Monolithic Vals Granite & Brine Water Pools",
    },
    image: "/assets/projects/kern-field/hero-quarry-bath.webp",
  },
  {
    num: "03",
    title: "Concrete Pavilion",
    typology: { de: "Temporärer Kulturraum", en: "Cultural Pavilion" },
    location: "Zürich, CH",
    coords: "47°22'38\"N, 8°32'14\"E",
    altitude: "408 m ü. M.",
    year: "2022",
    materials: {
      de: "Schalungsrauer Sichtbeton & geschwärzter Baustahl",
      en: "Board-Formed Concrete & Blackened Structural Steel",
    },
    image: "/assets/projects/kern-field/hero-lichtwerk-annex.webp",
  },
  {
    num: "04",
    title: "Courtyard House in Winter",
    typology: { de: "Atrium-Wohnhaus", en: "Courtyard Residence" },
    location: "Uri, CH",
    coords: "46°52'08\"N, 8°38'44\"E",
    altitude: "820 m ü. M.",
    year: "2021",
    materials: {
      de: "Geschlämmter Ziegelbau & Kalkputz-Oberflächen",
      en: "Slurried Brickwork & Mineral Lime Plaster",
    },
    image: "/assets/projects/kern-field/hero-courtyard-in-winter.webp",
  },
  {
    num: "05",
    title: "Tidal Archive",
    typology: { de: "Dokumentationspavillon", en: "Archive Pavilion" },
    location: "Glarus, CH",
    coords: "47°02'55\"N, 9°04'12\"E",
    altitude: "950 m ü. M.",
    year: "2020",
    materials: {
      de: "Kompaktbeton-Kassettendecke & handgespaltene Schindeln",
      en: "Coffered Concrete Soffit & Hand-Split Larch Shingles",
    },
    image: "/assets/projects/kern-field/hero-tidal-archive.webp",
  },
];

export const KernFieldCaseStudyView: React.FC<KernFieldCaseStudyViewProps> = ({ data, locale }) => {
  const isDe = locale === "de";
  const { adminCms, visualExperience } = data;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeWork = MONOGRAPH_WORKS[selectedIdx];

  return (
    <div className="cs-lab-view cs-kern-view">
      {/* Chapter 01: The Project (Monographic Architectural Hero) */}
      <CaseStudyHero data={data} locale={locale} />

      {/* Chapter 02: SIGNATURE FEATURE — The Living Project Index (Monograph Archive) */}
      <section className="cs-lab-section cs-kern-index-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {adminCms.kicker[locale] || adminCms.kicker.en}
            </span>
            <h2 className="cs-lab-heading">
              {isDe ? "Fünf Bauten. Eine disziplinierte Haltung." : "Five Structures. One Quiet Discipline."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Vom lauten Web-Portfolio zum stillen Architekturband: Das digitale Werkverzeichnis verhält sich wie eine Schweizer Monografie."
                : "Replacing noisy web trends with the quietude of a Swiss architectural monograph."}
            </p>
            <p className="cs-lab-narrative">
              {isDe
                ? "Zeitgenössische Architektur entsteht aus Proportion, Licht und Materialehrlichkeit. KERN / FIELD verzichtet bewusst auf aufdringliche Animationen. Großzügige Raumachsen und ruhige Abstände lassen Sichtbeton und alpine Lärche atmen, während Bauwerke über topografische Koordinaten, Höhenmeter und Typologie erschlossen werden."
                : "Contemporary architecture is defined by proportion, natural illumination, and tectonic honesty. KERN / FIELD deliberately rejects frantic animations. Expansive margins and disciplined spacing allow fair-faced concrete and alpine larch to breathe, navigated via topographic coordinates, elevation, and typology."}
            </p>
          </div>

          {/* Interactive Monograph Project Archive Table */}
          <div className="cs-kern-archive-wrapper">
            <div className="cs-kern-archive-header">
              <span className="cs-kern-archive-tag">
                {isDe ? "WERKVERZEICHNIS · INTERAKTIVE MONOGRAFIE-TABELLE" : "PROJECT ARCHIVE · INTERACTIVE MONOGRAPH INDEX"}
              </span>
              <span className="cs-kern-archive-count">5 / 5 BAUTEN DOKUMENTIERT</span>
            </div>

            <div className="cs-kern-table-shell" role="region" aria-label="Werkverzeichnis Tabelle">
              <div className="cs-kern-table-head">
                <span className="cs-th cs-th-num">NR.</span>
                <span className="cs-th cs-th-title">{isDe ? "BAUWERK & TYPOLOGIE" : "STRUCTURE & PROGRAM"}</span>
                <span className="cs-th cs-th-loc">{isDe ? "STANDORT" : "LOCATION"}</span>
                <span className="cs-th cs-th-coords">{isDe ? "KOORDINATEN" : "COORDINATES"}</span>
                <span className="cs-th cs-th-year">{isDe ? "JAHR" : "YEAR"}</span>
              </div>

              <div className="cs-kern-table-body">
                {MONOGRAPH_WORKS.map((work, idx) => (
                  <button
                    key={work.num}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`cs-kern-tr ${selectedIdx === idx ? "is-selected" : ""}`}
                    aria-selected={selectedIdx === idx}
                  >
                    <span className="cs-td cs-td-num">{work.num}</span>
                    <span className="cs-td cs-td-title">
                      <strong>{work.title}</strong>
                      <span className="cs-td-sub"> — {work.typology[locale] || work.typology.en}</span>
                    </span>
                    <span className="cs-td cs-td-loc">{work.location}</span>
                    <span className="cs-td cs-td-coords">{work.coords}</span>
                    <span className="cs-td cs-td-year">{work.year}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Monographic Plate Showcase */}
            <div className="cs-kern-plate-card">
              <div className="cs-kern-plate-img-wrap">
                <img
                  src={activeWork.image}
                  alt={activeWork.title}
                  className="cs-kern-plate-img"
                  loading="eager"
                />
                <div className="cs-kern-plate-badge">
                  <span>{activeWork.num} // {activeWork.location}</span>
                </div>
              </div>

              <div className="cs-kern-plate-caption-box">
                <div className="cs-plate-meta-row">
                  <div className="cs-plate-meta-item">
                    <span className="cs-plate-k">{isDe ? "Bauwerk" : "Structure"}</span>
                    <h3 className="cs-plate-v-title">{activeWork.title}</h3>
                  </div>
                  <div className="cs-plate-meta-item">
                    <span className="cs-plate-k">{isDe ? "Topografie & Höhe" : "Elevation"}</span>
                    <span className="cs-plate-v">{activeWork.altitude}</span>
                  </div>
                  <div className="cs-plate-meta-item">
                    <span className="cs-plate-k">{isDe ? "Koordinaten" : "Coordinates"}</span>
                    <span className="cs-plate-v cs-mono-coords">{activeWork.coords}</span>
                  </div>
                  <div className="cs-plate-meta-item">
                    <span className="cs-plate-k">{isDe ? "Materialfügung" : "Material Joinery"}</span>
                    <span className="cs-plate-v">{activeWork.materials[locale] || activeWork.materials.en}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="cs-hero-visual-caption">
              {isDe
                ? "Interaktives Werkverzeichnis: Durch Klick auf die Projektzeilen wechselt die monografische Bildtafel inklusive topografischer Koordinaten, Höhenmeter und materialtechnischer Fügungsangaben."
                : "Interactive project monograph: Selecting any table row reveals the corresponding architectural plate with geographic coordinates, altitude, and tectonic material specifications."}
            </p>
          </div>

          {/* Authentic Project Index Screenshot */}
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
                    {isDe ? "The Lab · Werkverzeichnis / Bauten" : "The Lab · Architectural Archive / Works"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-live-pill cs-kern-badge">
                    <span className="cs-status-indicator" />
                    {isDe ? "Werkverzeichnis" : "Project Archive"}
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

      {/* Chapter 03: Studio Profile & Architectural Manifesto */}
      <section className="cs-lab-section cs-kern-studio-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "03 / ATELIER & MANIFEST" : "03 / ATELIER & MANIFESTO"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Die Haltung des Büros: Materialehrlichkeit und tektonische Ruhe."
                : "Studio philosophy: Material honesty and tectonic calm."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Das Atelier-Profil bündelt Haltung, Werkstattfotografie und architektonische Leitlinien ohne laute Selbstdarstellung."
                : "The studio profile balances manifesto texts, workshop documentation, and structural principles without boastful tone."}
            </p>
          </div>

          {/* 3 Architectural Monograph Principles */}
          <div className="cs-kern-principles-grid">
            <div className="cs-kern-principle-card">
              <span className="cs-principle-num">01</span>
              <h4>{isDe ? "Tektonische Ehrlichkeit" : "Tectonic Honesty"}</h4>
              <p>
                {isDe
                  ? "Jede Fuge, jeder Balkenkopf und jede Schalungsstruktur ist konstruktiv begründet. Das Bauwerk verbirgt seine Lasten nicht."
                  : "Every joint, beam end, and formwork seam is structurally justified. The architecture conceals no load paths."}
              </p>
            </div>
            <div className="cs-kern-principle-card">
              <span className="cs-principle-num">02</span>
              <h4>{isDe ? "Topografische Bindung" : "Topographic Rooting"}</h4>
              <p>
                {isDe
                  ? "Baukörper folgen dem Relief der Alpen. Sonneneinfall, Schneelasten und Windrichtungen formen die Geometrie."
                  : "Masses respond to alpine contours. Diurnal solar exposure, snow loads, and wind prevailing vectors carve the geometry."}
              </p>
            </div>
            <div className="cs-kern-principle-card">
              <span className="cs-principle-num">03</span>
              <h4>{isDe ? "Würdevolle Patina" : "Dignified Patina"}</h4>
              <p>
                {isDe
                  ? "Unbehandelte Lärche und Schalungsbeton altern in Würde und verschmelzen über Jahrzehnte mit der Berglandschaft."
                  : "Untreated larch and exposed concrete weather with dignity, merging seamlessly into the mountain landscape over decades."}
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
                    {isDe ? "The Lab · Atelier-Profil / Manifest" : "The Lab · Studio Monograph / Manifesto"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-b2b-pill">
                    {isDe ? "Atelier-Profil" : "Studio Monograph"}
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

      {/* Chapter 04: Material Tectonics & Mobile Rhythm */}
      <section className="cs-lab-section cs-kern-material-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "04 / MATERIALITÄT & MOBILER LESERHYTHMUS" : "04 / MATERIALITY & MOBILE RHYTHM"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Haptische Textur und disziplinierte Proportionen auf jedem Display."
                : "Tactile texture and disciplined proportions on every display."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Strukturierte Raumachsen auf Smartphones und makroskopische Materialstudien von Sichtbeton und Holzverbindungen."
                : "Calibrated spatial axes for mobile viewports paired with tactile joinery studies of fair-faced concrete and alpine larch."}
            </p>
          </div>

          <div className="cs-lab-dual-media-grid">
            {/* Mobile View */}
            <div className="cs-lab-mobile-box">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Mobile Monografie" : "Mobile Monograph"} · 390px
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

            {/* Material Joinery Details */}
            <div className="cs-lab-objects-box">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Tektonische Fügungen" : "Tectonic Joinery Studies"}
                </span>
              </div>

              <div className="cs-kern-materials-cards">
                <div className="cs-kern-material-card">
                  <div className="cs-kern-mat-img-wrap">
                    <img
                      src="/assets/projects/kern-field/detail-tidal-concrete.webp"
                      alt={isDe ? "Gezeiten-Sichtbeton mit Schalungstextur" : "Tidal concrete with formwork texture"}
                      className="cs-kern-mat-img"
                      loading="eager"
                    />
                    <span className="cs-kern-mat-badge">Sichtbeton · Schalungsrauh</span>
                  </div>
                  <div className="cs-kern-mat-info">
                    <h4>Gezeiten-Sichtbeton</h4>
                    <p>
                      {isDe
                        ? "Monolithische Betonstrukturen, deren raue Brettschalung das wechselnde alpine Tageslicht plastisch einfängt."
                        : "Monolithic concrete structures whose board formwork captures shifting diurnal alpine light."}
                    </p>
                  </div>
                </div>

                <div className="cs-kern-material-card">
                  <div className="cs-kern-mat-img-wrap">
                    <img
                      src="/assets/projects/kern-field/detail-larch-joinery.webp"
                      alt={isDe ? "Lärchenholz-Fügung unbehandelt" : "Untreated alpine larch joinery"}
                      className="cs-kern-mat-img"
                      loading="eager"
                    />
                    <span className="cs-kern-mat-badge">Alpine Lärche · Unbehandelt</span>
                  </div>
                  <div className="cs-kern-mat-info">
                    <h4>Lärchenholz-Fügung</h4>
                    <p>
                      {isDe
                        ? "Präzise traditionelle Holzverbindungen, die im Laufe der Jahre eine edle silbergraue Schutzpatina entwickeln."
                        : "Precise artisan timber joinery engineered to weather naturally into an enduring silver-grey patina."}
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
