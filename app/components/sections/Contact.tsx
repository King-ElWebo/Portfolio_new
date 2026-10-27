import React, { useState } from "react";
import { Link } from "react-router";
import type { Locale, Translations } from "~/i18n/translations";
import { createContactDraft } from "./contactDraft";

interface ContactApiResponse {
  success?: boolean;
  message?: string;
  mailto?: string;
  error?: string;
}

interface ContactProps {
  t: Translations;
  locale?: Locale;
}

export function Contact({ t, locale = "de" }: ContactProps) {
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formElement = e.currentTarget;
    const values = new FormData(formElement);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const message = String(values.get("message") || "").trim();

    const fallbackUrl = createContactDraft({
      recipient: c.directEmail,
      subjectPrefix: "Projektanfrage",
      name,
      replyTo: email,
      message,
    });

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _gotcha: String(values.get("_gotcha") || ""),
        }),
      });

      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.ok && result?.success) {
        setSubmitted(true);
        formElement.reset();
      } else {
        const errorText = result?.message || c.form.errorMessage;
        setErrorMessage(errorText);
        setFallbackMailto(result?.mailto || fallbackUrl);
      }
    } catch {
      setErrorMessage(c.form.errorMessage);
      setFallbackMailto(fallbackUrl);
    } finally {
      setIsSubmitting(false);
    }
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
                {/* Honeypot field */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

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

                {/* Privacy note */}
                <p style={{ marginTop: "1rem", fontSize: "11px", color: "var(--text-dark-muted)", lineHeight: 1.5 }}>
                  {c.form.privacyPrefix}
                  <Link
                    to={locale === "de" ? `/${locale}/datenschutz` : `/${locale}/privacy`}
                    style={{ color: "var(--color-secondary)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    {c.form.privacyLink}
                  </Link>
                  {c.form.privacySuffix}
                </p>

                {/* Error feedback */}
                {errorMessage && (
                  <div
                    role="alert"
                    style={{
                      marginTop: "1.25rem",
                      padding: "1rem 1.25rem",
                      backgroundColor: "rgba(220, 50, 50, 0.08)",
                      border: "1px solid rgba(220, 50, 50, 0.25)",
                      borderRadius: "3px",
                      color: "#fca5a5",
                      fontSize: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    <p style={{ margin: "0 0 0.5rem 0" }}>{errorMessage}</p>
                    {fallbackMailto && (
                      <a
                        href={fallbackMailto}
                        style={{
                          display: "inline-block",
                          color: "var(--color-secondary)",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          fontWeight: 500,
                        }}
                      >
                        {c.form.fallbackDraft} →
                      </a>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
