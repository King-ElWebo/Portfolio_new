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
    }, 400);
  };

  return (
    <section className="hp-contact-section" id="contact" aria-label="Contact and Inquiries">
      <div className="hp-container-wide">
        <div className="hp-contact-grid">
          {/* Left Column: Direct Inquiries & Framing */}
          <div>
            <span className="hp-section-kicker">{c.kicker}</span>
            <h2 className="hp-contact-headline">
              {c.headline}
            </h2>
            <p className="hp-contact-lead">
              {c.subline}
            </p>

            <div className="hp-contact-links">
              <div className="hp-contact-link-row">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-dark-muted)", minWidth: "120px" }}>
                  {c.directLabel}
                </span>
                <a
                  href={`mailto:${c.directEmail}`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-dark-primary)", textDecoration: "underline", textUnderlineOffset: "4px" }}
                >
                  {c.directEmail}
                </a>
              </div>

              <div className="hp-contact-link-row">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-dark-muted)", minWidth: "120px" }}>
                  {c.networkLabel}
                </span>
                <a
                  href={`https://${c.networkUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-dark-primary)", textDecoration: "underline", textUnderlineOffset: "4px" }}
                >
                  {c.networkUrl}
                </a>
              </div>

              <div className="hp-contact-link-row">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--text-dark-muted)", minWidth: "120px" }}>
                  LOCATION:
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-dark-secondary)" }}>
                  Wien, Österreich · Remote DACH & Global
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  backgroundColor: "var(--bg-dark-surface)",
                  border: "1px solid var(--color-secondary)",
                  padding: "2.5rem",
                  color: "var(--color-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  borderRadius: "3px",
                  lineHeight: "1.6",
                }}
                role="status"
                aria-live="polite"
              >
                <div style={{ fontSize: "18px", marginBottom: "0.5rem" }}>✓</div>
                {c.form.successMsg}
              </div>
            ) : (
              <form className="hp-contact-form-box" onSubmit={handleSubmit}>
                <div className="hp-form-field">
                  <label htmlFor="hp-name" className="hp-form-label">
                    {c.form.nameLabel}
                  </label>
                  <input
                    id="hp-name"
                    name="name"
                    type="text"
                    required
                    placeholder={c.form.namePlaceholder}
                    className="hp-form-input"
                  />
                </div>

                <div className="hp-form-field">
                  <label htmlFor="hp-email" className="hp-form-label">
                    {c.form.emailLabel}
                  </label>
                  <input
                    id="hp-email"
                    name="email"
                    type="email"
                    required
                    placeholder={c.form.emailPlaceholder}
                    className="hp-form-input"
                  />
                </div>

                <div className="hp-form-field">
                  <label htmlFor="hp-message" className="hp-form-label">
                    {c.form.messageLabel}
                  </label>
                  <textarea
                    id="hp-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={c.form.messagePlaceholder}
                    className="hp-form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hp-form-btn"
                >
                  {isSubmitting ? c.form.submittingBtn : c.form.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
