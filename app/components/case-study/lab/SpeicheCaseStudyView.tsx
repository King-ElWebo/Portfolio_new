import React, { useState } from "react";
import type { CaseStudyData } from "~/types/case-study";
import type { Locale } from "~/i18n/translations";
import { CaseStudyHero } from "../CaseStudyHero";
import { CaseStudyClosing } from "../CaseStudyClosing";

interface SpeicheCaseStudyViewProps {
  data: CaseStudyData;
  locale: Locale;
}

export const SpeicheCaseStudyView: React.FC<SpeicheCaseStudyViewProps> = ({ data, locale }) => {
  const isDe = locale === "de";
  const { adminCms, visualExperience } = data;
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(2);

  return (
    <div className="cs-lab-view cs-speiche-view">
      {/* Chapter 01: The Project (Industrial ERP Hero) */}
      <CaseStudyHero data={data} locale={locale} />

      {/* Chapter 02: SIGNATURE FEATURE — The Connected Repair Lifecycle */}
      <section className="cs-lab-section cs-speiche-pipeline-section">
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
                ? "In der Werkstatthektik führen handschriftliche Zettel zu Fehlern und Verzögerungen. SPEICHE führt jeden Auftrag durch eine deterministische Zustandskette: Annahme, Zeitstoppuhr, Teile-Reservierung und Abschlussprüfung greifen nahtlos ineinander."
                : "During peak season rush, handwritten paper tags cause lost parts and delayed handovers. SPEICHE routes every job through a deterministic state machine: Intake, live stopwatch tracking, parts reservation, and sign-off checklists operate in one unified interface."}
            </p>
          </div>

          {/* Interactive Repair Lifecycle Dispatcher */}
          <div className="cs-speiche-interactive-controller">
            <div className="cs-speiche-controller-header">
              <span className="cs-speiche-controller-tag">
                {isDe ? "REPARATUR-LEBENSZYKLUS · LIVE ZUSTANDSWECHSEL" : "REPAIR LIFECYCLE · LIVE STATE TRANSITION"}
              </span>
              <div className="cs-speiche-phase-tabs" role="tablist" aria-label="Auftragsphase auswählen">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePhase === 1}
                  onClick={() => setActivePhase(1)}
                  className={`cs-speiche-phase-btn ${activePhase === 1 ? "is-active" : ""}`}
                >
                  <span className="cs-phase-step-num">01</span>
                  <span>{isDe ? "Annahme & Schnell-Check" : "Intake & Quick Check"}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePhase === 2}
                  onClick={() => setActivePhase(2)}
                  className={`cs-speiche-phase-btn ${activePhase === 2 ? "is-active" : ""}`}
                >
                  <span className="cs-phase-step-num">02</span>
                  <span>{isDe ? "Diagnose & Teile-Reservierung" : "Diagnosis & Parts Reservation"}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activePhase === 3}
                  onClick={() => setActivePhase(3)}
                  className={`cs-speiche-phase-btn ${activePhase === 3 ? "is-active" : ""}`}
                >
                  <span className="cs-phase-step-num">03</span>
                  <span>{isDe ? "Montage & Fertigstellung" : "Assembly & Handover"}</span>
                </button>
              </div>
            </div>

            {/* Industrial Dispatch Console Frame */}
            <div className="cs-browser-shell cs-speiche-sim-shell">
              <div className="cs-browser-bar">
                <div className="cs-browser-dots">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="cs-browser-address-bar">
                  <span className="cs-browser-lock">🧪</span>
                  <span className="cs-browser-domain">
                    {isDe ? "The Lab · Werkstatt-Leitstand / Auftragssteuerung" : "The Lab · Workshop Control / Work Orders"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-live-pill cs-speiche-badge">
                    <span className="cs-status-indicator" />
                    {activePhase === 1 && (isDe ? "Status: Eingegangen" : "Status: Received")}
                    {activePhase === 2 && (isDe ? "Status: In Montage (Stoppuhr aktiv)" : "Status: Active Assembly")}
                    {activePhase === 3 && (isDe ? "Status: Abholbereit (SMS raus)" : "Status: Ready for Pickup")}
                  </span>
                </div>
              </div>

              <div className="cs-speiche-sim-viewport">
                {/* Order Top Meta Strip */}
                <div className="cs-speiche-ticket-strip">
                  <div className="cs-ticket-meta-left">
                    <span className="cs-ticket-id">AUFTRAG #2026-084</span>
                    <span className="cs-ticket-bike">Canyon Grizl CF SL 8 · Gr. M</span>
                    <span className="cs-ticket-frame">FRAME: SN-2024-8841</span>
                  </div>
                  <div className="cs-ticket-meta-right">
                    <span className="cs-ticket-cust">Kunde: Maximilian Kern (Wien 7)</span>
                    <span className="cs-ticket-due">{isDe ? "Fällig: Morgen, 16:30 Uhr" : "Due: Tomorrow, 16:30"}</span>
                  </div>
                </div>

                {/* Dynamic Content based on activePhase */}
                {activePhase === 1 && (
                  <div className="cs-speiche-phase-panel cs-phase-intake">
                    <div className="cs-intake-cols">
                      <div className="cs-intake-card">
                        <span className="cs-panel-subtitle">{isDe ? "Symptome & Kundenbefund" : "Intake Symptoms"}</span>
                        <p className="cs-intake-text">
                          "{isDe
                            ? "Antrieb rasselt unter starkem Kettenzug im Wiegetritt. Schaltwerk springt bei Ritzel 4/5. Kette Laufleistung ca. 3.200 km."
                            : "Drivetrain rattling under load while climbing out of the saddle. Rear derailleur skips on cogs 4/5. Chain mileage approx 3,200 km."}"
                        </p>
                        <div className="cs-intake-tags">
                          <span className="cs-tag">Antrieb</span>
                          <span className="cs-tag">Schaltwerk</span>
                          <span className="cs-tag">Kettenverschleiß</span>
                        </div>
                      </div>

                      <div className="cs-intake-card">
                        <span className="cs-panel-subtitle">{isDe ? "Erfassung & Zuweisung" : "Intake Assignment"}</span>
                        <div className="cs-speiche-kv-list">
                          <div className="cs-kv-row">
                            <span className="cs-kv-k">{isDe ? "Zugewiesener Mechaniker" : "Assigned Mechanic"}</span>
                            <span className="cs-kv-v">Florian W. (Stand 02)</span>
                          </div>
                          <div className="cs-kv-row">
                            <span className="cs-kv-k">{isDe ? "Kostenvoranschlag" : "Cost Estimate"}</span>
                            <span className="cs-kv-v">ca. 110 – 130 €</span>
                          </div>
                          <div className="cs-kv-row">
                            <span className="cs-kv-k">{isDe ? "Priorität" : "Priority"}</span>
                            <span className="cs-kv-v cs-text-amber">{isDe ? "Normal · Terminauftrag" : "Standard · Scheduled"}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActivePhase(2)}
                          className="cs-speiche-action-btn"
                        >
                          {isDe ? "Diagnose starten & Teile reservieren →" : "Start Diagnosis & Reserve Parts →"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activePhase === 2 && (
                  <div className="cs-speiche-phase-panel cs-phase-diagnosis">
                    <div className="cs-diag-cols">
                      <div className="cs-diag-stopwatch-card">
                        <span className="cs-panel-subtitle">{isDe ? "AW-Zeiterfassung (Stoppuhr aktiv)" : "Labor Timer (Stopwatch Active)"}</span>
                        <div className="cs-stopwatch-display">
                          <span className="cs-stopwatch-digits">00:24:15</span>
                          <span className="cs-stopwatch-pulse" />
                        </div>
                        <div className="cs-stopwatch-meta">
                          <span>{isDe ? "Erfasste Arbeitswerte:" : "Logged Labor Units:"} <strong>2.4 AW</strong></span>
                          <span>(1 AW = 10 Minuten Richtzeit)</span>
                        </div>
                      </div>

                      <div className="cs-diag-parts-card">
                        <span className="cs-panel-subtitle">{isDe ? "Reservierte Ersatzteile aus Lager" : "Reserved Parts from Stock"}</span>
                        <div className="cs-diag-parts-list">
                          <div className="cs-part-item">
                            <div className="cs-part-info">
                              <span className="cs-part-name">Shimano CN-HG701 Kette 11-fach</span>
                              <span className="cs-part-loc">Fach B-04 · Art-Nr. SH-CN701</span>
                            </div>
                            <span className="cs-part-status cs-status-reserved">1x {isDe ? "Reserviert" : "Reserved"} (Bestand: 14 → 13)</span>
                          </div>
                          <div className="cs-part-item">
                            <div className="cs-part-info">
                              <span className="cs-part-name">Schwalbe Schlauch SV17 28"</span>
                              <span className="cs-part-loc">Fach A-12 · Art-Nr. SW-SV17</span>
                            </div>
                            <span className="cs-part-status cs-status-reserved">1x {isDe ? "Reserviert" : "Reserved"} (Bestand: 42 → 41)</span>
                          </div>
                        </div>

                        {/* Critical Reorder Warning Banner */}
                        <div className="cs-stock-warning-box">
                          <span className="cs-warning-icon">⚠️</span>
                          <div className="cs-warning-text">
                            <strong>{isDe ? "Meldebestand unterschritten:" : "Low Stock Alert:"}</strong>{" "}
                            {isDe
                              ? "Bremsscheiben SM-RT800 160mm Restbestand: 2 Stk. (Mindestbestand: 5) → Automatischer Bestellvorschlag ausgelöst."
                              : "Rotors SM-RT800 160mm remaining: 2 pcs (Min stock: 5) → Automated reorder proposal generated."}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActivePhase(3)}
                          className="cs-speiche-action-btn"
                        >
                          {isDe ? "Montage abschließen & Endkontrolle →" : "Complete Assembly & Sign Off →"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activePhase === 3 && (
                  <div className="cs-speiche-phase-panel cs-phase-completion">
                    <div className="cs-compl-cols">
                      <div className="cs-checklist-card">
                        <span className="cs-panel-subtitle">{isDe ? "Digitale 4-Punkte-Endkontrolle" : "Digital 4-Point Sign-Off"}</span>
                        <div className="cs-check-items">
                          <div className="cs-check-row is-checked">
                            <span className="cs-check-icon">✓</span>
                            <span>{isDe ? "Drehmomente Vorbau/Lenker geprüft (5.0 Nm nach Herstellervorgabe)" : "Stem/handlebar torque verified (5.0 Nm to spec)"}</span>
                          </div>
                          <div className="cs-check-row is-checked">
                            <span className="cs-check-icon">✓</span>
                            <span>{isDe ? "Schaltung indiziert & Anschläge justiert (sauber durchgeschaltet)" : "Derailleur indexed & limit screws aligned"}</span>
                          </div>
                          <div className="cs-check-row is-checked">
                            <span className="cs-check-icon">✓</span>
                            <span>{isDe ? "Kettennietung & Laufrichtung mit Lehre kontrolliert" : "Chain riveting and directional link inspected with gauge"}</span>
                          </div>
                          <div className="cs-check-row is-checked">
                            <span className="cs-check-icon">✓</span>
                            <span>{isDe ? "Probefahrt durchgeführt & Reifendruck 3.2 bar eingestellt" : "Test ride completed & tyre pressure set to 3.2 bar"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="cs-handover-card">
                        <span className="cs-panel-subtitle">{isDe ? "Rechnung & Abholbenachrichtigung" : "Invoice & Customer Notification"}</span>
                        <div className="cs-handover-summary">
                          <div className="cs-sum-row">
                            <span>4 AW Montage (40 min)</span>
                            <span>52,00 €</span>
                          </div>
                          <div className="cs-sum-row">
                            <span>Shimano CN-HG701 Kette</span>
                            <span>38,90 €</span>
                          </div>
                          <div className="cs-sum-row">
                            <span>Schwalbe Schlauch SV17</span>
                            <span>9,90 €</span>
                          </div>
                          <div className="cs-sum-row cs-sum-total">
                            <span>{isDe ? "Gesamtbetrag (inkl. MwSt.)" : "Total (incl. VAT)"}</span>
                            <span>120,96 €</span>
                          </div>
                        </div>

                        <div className="cs-sms-sent-box">
                          <span className="cs-sms-icon">📱</span>
                          <span className="cs-sms-text">
                            {isDe
                              ? "Kunden-SMS um 14:20 versendet: 'Hallo Maximilian, dein Canyon Grizl ist fertig abholbereit bei SPEICHE.'"
                              : "SMS dispatched at 14:20: 'Hi Maximilian, your Canyon Grizl is ready for pickup at SPEICHE.'"}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActivePhase(1)}
                          className="cs-speiche-action-btn cs-btn-done"
                        >
                          {isDe ? "Übergabe an Kunden quittieren ✓" : "Confirm Handover to Customer ✓"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="cs-hero-visual-caption">
              {isDe
                ? "Interaktiver Reparatur-Lebenszyklus: Klickbare Demonstration der drei Schlüsselphasen vom Kundengespräch über die aktive AW-Stoppuhr mit Teile-Reservierung bis zur fertigen SMS-Benachrichtigung."
                : "Interactive repair lifecycle: Clickable demonstration across the three core stages from intake check to live labor stopwatch with parts reservation and automated pickup SMS dispatch."}
            </p>
          </div>

          {/* Authentic Order Pipeline Screenshot */}
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
                    {isDe ? "The Lab · Leitstand / Auftragsübersicht" : "The Lab · Dispatch / Work-Order Board"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-live-pill cs-speiche-badge">
                    <span className="cs-status-indicator" />
                    {isDe ? "Live-Pipeline" : "Live Pipeline"}
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

      {/* Chapter 03: Parts Inventory & Disposition */}
      <section className="cs-lab-section cs-speiche-inventory-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "03 / ERSATZTEILLAGER & BESTANDSFÜHRUNG" : "03 / PARTS INVENTORY & STOCK"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Lagerverwaltung ohne Verzögerung: Verschleißteile immer im Blick."
                : "Resilient inventory control: Critical wear parts tracked in real time."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Schläuche, Ketten und Kassetten werden bei Auftragsstart automatisch reserviert. Bei Unterschreitung der Mindestmenge schlägt das System rechtzeitig Nachbestellungen vor."
                : "Tubes, chains, and cassettes are reserved upon job kickoff. When stock falls below safety thresholds, re-orders are visually flagged."}
            </p>
          </div>

          {/* Focused Inventory Suite Cards */}
          <div className="cs-speiche-inventory-suite-grid">
            <div className="cs-inv-suite-card">
              <span className="cs-inv-icon">📦</span>
              <h4>{isDe ? "Automatische Reservierung" : "Automated Reservation"}</h4>
              <p>
                {isDe
                  ? "Teile werden direkt bei Diagnose dem Reparaturrad zugewiesen und im Lagerbestand für andere Mechaniker blockiert."
                  : "Components are earmarked upon diagnosis, locking physical stock from being reassigned to other jobs."}
              </p>
            </div>
            <div className="cs-inv-suite-card">
              <span className="cs-inv-icon">⚠️</span>
              <h4>{isDe ? "Dynamischer Meldebestand" : "Safety Stock Alerts"}</h4>
              <p>
                {isDe
                  ? "Farbcodierte Warnschwellen signalisieren drohende Engpässe vor dem Leerstand und generieren Lieferanten-Bestellungen."
                  : "Color-coded stock thresholds highlight impending shortages before inventory runs out, generating supplier POs."}
              </p>
            </div>
            <div className="cs-inv-suite-card">
              <span className="cs-inv-icon">🔍</span>
              <h4>{isDe ? "Barcode- & Fachzuordnung" : "Barcode & Bin Tracking"}</h4>
              <p>
                {isDe
                  ? "Klare Lagerfach-Notation (z. B. Fach B-04) und Scan-Option für blitzschnelles Auffinden im physischen Werkstattregal."
                  : "Unambiguous shelf indexing (e.g. Bin B-04) and barcode scanning for rapid location on workshop racks."}
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
                    {isDe ? "The Lab · Ersatzteillager / Disposition" : "The Lab · Parts Inventory / Stock Control"}
                  </span>
                </div>
                <div className="cs-browser-actions">
                  <span className="cs-b2b-pill">
                    {isDe ? "Lagerbestand · Live" : "Parts Inventory · Live"}
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

      {/* Chapter 04: Mobile Cockpit at the Repair Stand */}
      <section className="cs-lab-section cs-speiche-mobile-section">
        <div className="cs-container">
          <div className="cs-lab-header">
            <span className="cs-kicker">
              {isDe ? "04 / AM MONTAGESTÄNDER: TOUCH-ERGONOMIE" : "04 / AT THE REPAIR STAND: TOUCH ERGONOMICS"}
            </span>
            <h2 className="cs-lab-heading">
              {isDe
                ? "Große Klickzonen für Mechanikerhände direkt am Fahrrad."
                : "High-contrast touch targets engineered for the workshop floor."}
            </h2>
            <p className="cs-lab-subheadline">
              {isDe
                ? "Stoppuhr starten, Teile abrufen und Checklisten abhaken ohne Tastatur: Optimiert für schmierige Finger und Tablet-Halterungen am Montageständer."
                : "Triggering timers, claiming parts, and signing off checklists without keyboards: Calibrated for greasy fingers and stand-mounted tablets."}
            </p>
          </div>

          <div className="cs-lab-mobile-centered-wrapper">
            <div className="cs-device-mobile">
              <div className="cs-device-header">
                <span className="cs-device-tag">
                  {isDe ? "Mechaniker-Ansicht" : "Mechanic View"} · 390px
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
          </div>
        </div>
      </section>

      {/* Chapter 05: Outcome, Technology & Closing */}
      <CaseStudyClosing data={data} locale={locale} />
    </div>
  );
};
