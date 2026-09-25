import React, { useState } from "react";
import type { Translations } from "~/i18n/translations";

interface ContactProps {
  t: Translations;
}

export function Contact({ t }: ContactProps) {
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section className="max-w-7xl contact-container" id="contact" aria-label="Contact and Inquiries">
      <div className="contact-grid">
        {/* Left Column: Direct Inquiries */}
        <div className="contact-left-col">
          <span className="section-kicker-gold">{c.kicker}</span>
          <h2 className="project-title-serif" style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)", lineHeight: 1.15 }}>
            {c.headline}
          </h2>
          <p style={{ fontSize: "18px", color: "var(--text-dark-secondary)", fontWeight: 300, maxWidth: "28rem" }}>
            {c.subline}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{c.directLabel}</span>
              <a
                href={`mailto:${c.directEmail}`}
                className="label-sm"
                style={{ color: "var(--text-dark-primary)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                {c.directEmail}
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="label-sm" style={{ color: "var(--text-dark-muted)" }}>{c.networkLabel}</span>
              <a
                href={`https://${c.networkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm"
                style={{ color: "var(--text-dark-primary)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                {c.networkUrl}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div>
          {submitted ? (
            <div
              style={{
                backgroundColor: "var(--bg-dark-lowest)",
                border: "1px solid var(--color-secondary)",
                padding: "2rem",
                color: "var(--color-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
              role="status"
              aria-live="polite"
            >
              ✓ {c.form.successMsg}
            </div>
          ) : (
            <form className="contact-form-box" onSubmit={handleSubmit}>
              <div className="contact-field-wrap">
                <label htmlFor="name" className="label-sm" style={{ color: "var(--text-dark-muted)" }}>
                  {c.form.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={c.form.namePlaceholder}
                  className="contact-input-line"
                />
              </div>

              <div className="contact-field-wrap">
                <label htmlFor="email" className="label-sm" style={{ color: "var(--text-dark-muted)" }}>
                  {c.form.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={c.form.emailPlaceholder}
                  className="contact-input-line"
                />
              </div>

              <div className="contact-field-wrap">
                <label htmlFor="message" className="label-sm" style={{ color: "var(--text-dark-muted)" }}>
                  {c.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder={c.form.messagePlaceholder}
                  className="contact-input-line"
                  style={{ resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
              >
                <span>{isSubmitting ? c.form.submittingBtn : c.form.submitBtn}</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Colophon Note */}
      <div className="contact-colophon-note">
        <p>{c.colophon}</p>
      </div>
    </section>
  );
}
