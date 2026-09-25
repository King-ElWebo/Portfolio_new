import React from "react";
import type { Translations } from "~/i18n/translations";

interface LabProps {
  t: Translations;
}

export function Lab({ t }: LabProps) {
  const lab = t.lab;

  return (
    <section className="max-w-7xl lab-container" id="lab" aria-label="The Lab">
      {/* Header */}
      <div className="section-divider-header">
        <div>
          <span className="section-kicker-gold">{lab.kicker}</span>
          <h2 className="project-title-serif" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", marginTop: "0.5rem" }}>
            {lab.headline}
          </h2>
        </div>
        <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{lab.badge}</span>
      </div>

      {/* 3 Experimental Cards */}
      <div className="lab-cards-grid">
        {/* Card 01: Halftone Shaders & WebGPU Trail */}
        <div className="lab-card-d3">
          <div>
            <div className="lab-card-media">
              <span className="label-sm" style={{ position: "absolute", top: "0.75rem", left: "0.75rem", color: "var(--text-dark-muted)" }}>
                {lab.cards[0].badge}
              </span>
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.85 }}>
                <circle cx="50" cy="50" r="38" stroke="rgba(235, 191, 135, 0.4)" strokeWidth="1" />
                <circle cx="50" cy="50" r="24" stroke="rgba(235, 191, 135, 0.7)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="6" fill="#ebbf87" />
              </svg>
            </div>
            <h3 className="lab-card-title">{lab.cards[0].title}</h3>
            <p className="lab-card-desc">{lab.cards[0].description}</p>
          </div>

          <div className="lab-card-footer">
            <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{lab.cards[0].tech}</span>
            <span className="label-sm" style={{ color: "var(--color-secondary)" }}>
              {lab.cards[0].action} <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>

        {/* Card 02: Dynamic Surface & Material Physics */}
        <div className="lab-card-d3">
          <div>
            <div className="lab-card-media">
              <span className="label-sm" style={{ position: "absolute", top: "0.75rem", left: "0.75rem", color: "var(--text-dark-muted)" }}>
                {lab.cards[1].badge}
              </span>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  border: "1px solid rgba(144, 144, 149, 0.4)",
                  transform: "rotate(45deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(235, 191, 135, 0.25) 0%, transparent 70%)",
                }}
              />
            </div>
            <h3 className="lab-card-title">{lab.cards[1].title}</h3>
            <p className="lab-card-desc">{lab.cards[1].description}</p>
          </div>

          <div className="lab-card-footer">
            <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{lab.cards[1].tech}</span>
            <span className="label-sm" style={{ color: "var(--color-secondary)" }}>
              {lab.cards[1].action} <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>

        {/* Card 03: Kinetic Variable Typography */}
        <div className="lab-card-d3">
          <div>
            <div className="lab-card-media">
              <span className="label-sm" style={{ position: "absolute", top: "0.75rem", left: "0.75rem", color: "var(--text-dark-muted)" }}>
                {lab.cards[2].badge}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "4rem",
                  fontStyle: "italic",
                  color: "rgba(235, 191, 135, 0.4)",
                  letterSpacing: "0.1em",
                }}
              >
                Aa
              </span>
            </div>
            <h3 className="lab-card-title">{lab.cards[2].title}</h3>
            <p className="lab-card-desc">{lab.cards[2].description}</p>
          </div>

          <div className="lab-card-footer">
            <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{lab.cards[2].tech}</span>
            <span className="label-sm" style={{ color: "var(--color-secondary)" }}>
              {lab.cards[2].action} <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
