import React from "react";
import type { Translations } from "~/i18n/translations";

interface SelectedWorkProps {
  t: Translations;
}

export function SelectedWork({ t }: SelectedWorkProps) {
  const p1 = t.work.project01;
  const p2 = t.work.project02;

  return (
    <section className="work-section max-w-7xl" id="work" aria-label="Selected Work">
      {/* Section Divider Header */}
      <div className="section-divider-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="section-kicker-gold">{t.work.kicker}</span>
          <span className="section-kicker-muted">{t.work.subtitle}</span>
        </div>
      </div>

      <div className="work-articles-stack">
        {/* Project 01: Full-width 16/9 Media Emphasis */}
        <article className="project-01-wrap">
          <div className="project-meta-header">
            <div>
              <span className="project-badge-mono">{p1.badge}</span>
              <h2 className="project-title-serif">{p1.title}</h2>
            </div>
            <div className="project-tags-wrap">
              {p1.tags.map((tag) => (
                <span key={tag} className="project-tag-mono">{tag}</span>
              ))}
            </div>
          </div>

          <div className="project-01-media">
            <div className="media-mockup-frame">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 0.6 }}>
                <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>CANVAS_VIEWPORT // 01</span>
                <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>16:9 UHD</span>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "2rem", color: "rgba(227, 226, 231, 0.4)" }}>
                  Flagship Architecture
                </span>
              </div>
              <div className="media-overlay-bottom">
                <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{p1.meta}</span>
                <span className="arrow-badge" aria-hidden="true">↗</span>
              </div>
            </div>
          </div>
        </article>

        {/* Project 02: Asymmetric 4/8 Grid */}
        <article className="project-02-wrap">
          <div className="project-02-grid">
            <div className="project-02-info">
              <div>
                <span className="project-badge-mono">{p2.badge}</span>
                <h2 className="project-title-serif">{p2.title}</h2>
              </div>
              <p className="project-02-desc">{p2.description}</p>
              <div className="project-tags-wrap" style={{ paddingTop: "0.5rem" }}>
                {p2.tags.map((tag) => (
                  <span key={tag} className="project-tag-mono">{tag}</span>
                ))}
              </div>
            </div>

            <div className="project-02-media">
              <div className="media-mockup-frame">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 0.6 }}>
                  <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>CANVAS_VIEWPORT // 02</span>
                  <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>16:10 SPATIAL</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.75rem", color: "rgba(227, 226, 231, 0.4)" }}>
                    Spatial Engine
                  </span>
                </div>
                <div className="media-overlay-bottom" style={{ justifyContent: "flex-end" }}>
                  <span className="arrow-badge" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
