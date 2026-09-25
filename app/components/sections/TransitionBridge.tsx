import React from "react";
import type { Translations } from "~/i18n/translations";

interface TransitionBridgeProps {
  t: Translations;
}

export function TransitionBridge({ t }: TransitionBridgeProps) {
  const p3 = t.bridge.project03;

  return (
    <div className="transition-bridge-wrap">
      {/* Project 03 straddling the dark/cream transition boundary */}
      <div className="max-w-7xl">
        {/* Project 03 Meta Header */}
        <div className="project-meta-header" style={{ marginBottom: "1.5rem" }}>
          <div>
            <span className="project-badge-mono">{p3.badge}</span>
            <h2 className="project-title-serif">{p3.title}</h2>
          </div>
          <div className="project-tags-wrap">
            {p3.tags.map((tag) => (
              <span key={tag} className="project-tag-mono" style={{ border: "1px solid rgba(70, 70, 75, 0.4)", padding: "0.25rem 0.6rem" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Physical Straddling Card Container */}
        <div className="project-03-card">
          <div className="project-03-media">
            <div className="media-mockup-frame">
              <span className="figma-badge">{p3.visualBadge}</span>
              <div style={{ textAlign: "center", margin: "auto" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.75rem", color: "rgba(227, 226, 231, 0.4)" }}>
                  Adaptive Surface
                </span>
              </div>
            </div>
          </div>

          <div className="project-03-body">
            <div>
              <span className="label-sm" style={{ color: "var(--color-secondary)" }}>
                {p3.kicker}
              </span>
              <h3 className="tactile-title">
                {p3.calloutTitle}
              </h3>
              <p className="tactile-desc">
                {p3.description}
              </p>
            </div>

            <div className="project-03-status-bar">
              <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>
                {p3.statusLeft}
              </span>
              <span className="label-sm" style={{ color: "var(--color-secondary)" }}>
                {p3.statusRight}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The Overlapping Typographic Bridge ("CRAFT & METHODOLOGY") */}
      <div className="typographic-bridge" aria-hidden="true">
        <div className="max-w-7xl">
          <h2 className="bridge-giant-text">
            {t.bridge.heading}
          </h2>
        </div>
      </div>
    </div>
  );
}
