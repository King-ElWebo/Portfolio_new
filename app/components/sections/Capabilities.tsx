import React from "react";
import type { Translations } from "~/i18n/translations";

interface CapabilitiesProps {
  t: Translations;
}

export function Capabilities({ t }: CapabilitiesProps) {
  return (
    <section className="max-w-7xl" id="capabilities" aria-label="Capabilities and Practice">
      <div style={{ borderBottom: "1px solid var(--border-cream)", paddingBottom: "1.5rem", marginBottom: "4rem" }}>
        <div className="cream-kicker-bar">
          <span className="cream-kicker-tag">{t.capabilities.kicker}</span>
          <span className="label-sm" style={{ color: "var(--text-cream-muted)" }}>{t.capabilities.badge}</span>
        </div>
        <h2 className="cream-headline-xl">{t.capabilities.headline}</h2>
        <p className="cream-subline-lg">{t.capabilities.subline}</p>
      </div>

      <div className="capabilities-rows">
        {t.capabilities.rows.map((row) => (
          <div key={row.code} className="cap-row">
            <span className="label-sm" style={{ color: "var(--text-cream-muted)" }}>{row.code}</span>
            <h3 className="cap-row-title">{row.title}</h3>
            <p className="cap-row-desc">{row.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "flex-end" }}>
              {row.tags.map((tag) => (
                <span key={tag} className="cap-tag-cream">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
