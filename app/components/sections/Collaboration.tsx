import React from "react";
import type { Translations } from "~/i18n/translations";

interface CollaborationProps {
  t: Translations;
}

export function Collaboration({ t }: CollaborationProps) {
  const c = t.collaboration;

  return (
    <section className="max-w-7xl collaboration-container" id="collaboration" aria-label="Collaboration Models">
      <div style={{ borderBottom: "1px solid var(--border-cream)", paddingBottom: "1rem", marginBottom: "4rem" }}>
        <div className="cream-kicker-bar">
          <span className="cream-kicker-tag">{c.kicker}</span>
          <span className="label-sm" style={{ color: "var(--text-cream-muted)" }}>{c.badge}</span>
        </div>
        <h2 className="cream-headline-xl" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginTop: "0.5rem" }}>
          {c.headline}
        </h2>
      </div>

      {/* 3 Open Horizontal Rows (No cards!) */}
      <div className="collab-rows">
        {c.rows.map((row) => (
          <div key={row.code} className="collab-row">
            <span className="label-sm" style={{ color: "var(--text-cream-muted)" }}>{row.code}</span>
            <h3 className="collab-row-title">{row.title}</h3>
            <p className="collab-row-desc">{row.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
