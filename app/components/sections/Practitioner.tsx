import React from "react";
import type { Translations } from "~/i18n/translations";

interface PractitionerProps {
  t: Translations;
}

export function Practitioner({ t }: PractitionerProps) {
  const p = t.practitioner;

  return (
    <section className="max-w-7xl practitioner-container" id="practitioner" aria-label="The Practitioner Profile">
      <div style={{ borderBottom: "1px solid var(--border-cream)", paddingBottom: "1rem", marginBottom: "4rem" }}>
        <span className="cream-kicker-tag">{p.kicker}</span>
      </div>

      <div className="practitioner-grid">
        {/* Left Column: Authentic Studio Portrait Placeholder Frame */}
        <div className="portrait-frame-outer">
          <div className="portrait-placeholder-inner">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ marginBottom: "1rem", opacity: 0.6 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="label-sm" style={{ color: "var(--text-cream-primary)" }}>
              {p.portraitLabel}
            </span>
            <span style={{ fontSize: "14px", marginTop: "0.5rem", fontWeight: 300, color: "var(--text-cream-secondary)" }}>
              {p.portraitSubtext}
            </span>
          </div>
          <div className="portrait-caption-bar">
            <span className="label-sm" style={{ color: "var(--text-cream-muted)" }}>{p.figureCaption}</span>
          </div>
        </div>

        {/* Right Column: Editorial Quote, Bio Paragraphs & Core Practice Split */}
        <div>
          <h2 className="practitioner-quote">
            {p.quote}
          </h2>

          <div className="practitioner-body">
            <p>{p.p1}</p>
            <p style={{ fontSize: "16px" }}>{p.p2}</p>
          </div>

          <div className="practitioner-bottom-split">
            <div>
              <span className="label-sm" style={{ display: "block", color: "var(--text-cream-muted)", marginBottom: "0.25rem" }}>
                {p.corePracticeLabel}
              </span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-cream-primary)", fontFamily: "var(--font-mono)" }}>
                {p.corePracticeValue}
              </span>
            </div>
            <div>
              <span className="label-sm" style={{ display: "block", color: "var(--text-cream-muted)", marginBottom: "0.25rem" }}>
                {p.focusLabel}
              </span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-cream-primary)", fontFamily: "var(--font-mono)" }}>
                {p.focusValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
