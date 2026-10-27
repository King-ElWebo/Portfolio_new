import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Link } from "react-router";
import type { Locale, Translations } from "~/i18n/translations";
import { createContactDraft } from "./contactDraft";
import "~/styles/home-contact.css";

interface ContactApiResponse {
  success?: boolean;
  message?: string;
  mailto?: string;
  error?: string;
}

interface HomeContactProps {
  t: Translations;
  locale?: Locale;
}

function Arrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function HomeContact({ t, locale = "de" }: HomeContactProps) {
  const c = t.homeContact;
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const targetOpenRef = useRef(false);
  const contentHeightRef = useRef(0);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  function finishTransition() {
    const disclosure = disclosureRef.current;
    if (!disclosure) return;
    const animations = animationsRef.current;
    animationsRef.current = [];
    disclosure.open = targetOpenRef.current;
    disclosure.style.removeProperty("height");
    disclosure.style.removeProperty("overflow");
    delete disclosure.dataset.closing;
    if (composerRef.current) composerRef.current.inert = false;
    animations.forEach((animation) => animation.cancel());
  }

  useEffect(() => {
    const disclosure = disclosureRef.current;
    const composer = composerRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (animationsRef.current.length) finishTransition(); };
    const motionChange = () => { if (preference.matches) finish(); };
    const visibilityChange = () => { if (document.hidden) finish(); };
    const resize = new ResizeObserver(() => {
      if (composer && composer.getBoundingClientRect().height !== contentHeightRef.current) finish();
    });
    if (composer) resize.observe(composer);
    preference.addEventListener("change", motionChange);
    window.addEventListener("resize", finish);
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      resize.disconnect();
      preference.removeEventListener("change", motionChange);
      window.removeEventListener("resize", finish);
      document.removeEventListener("visibilitychange", visibilityChange);
      animationsRef.current.forEach((animation) => animation.cancel());
      animationsRef.current = [];
      disclosure?.style.removeProperty("height");
      disclosure?.style.removeProperty("overflow");
    };
  }, []);

  function toggleDisclosure(open: boolean, keyboard = false) {
    const disclosure = disclosureRef.current;
    const composer = composerRef.current;
    const summary = summaryRef.current;
    if (!disclosure || !composer || !summary) return;

    const wasOpen = disclosure.open;
    const startHeight = disclosure.getBoundingClientRect().height;
    const contentStyle = getComputedStyle(composer);
    const startOpacity = wasOpen ? contentStyle.opacity : "0";
    const startTransform = wasOpen ? contentStyle.transform : "translateY(6px)";

    disclosure.style.height = `${startHeight}px`;
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];
    targetOpenRef.current = open;
    composer.inert = !open;
    if (!open && composer.contains(document.activeElement)) summary.focus({ preventScroll: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (keyboard || reduced || typeof disclosure.animate !== "function") {
      finishTransition();
      if (keyboard) {
        const target = open ? nameRef.current : summary;
        target?.focus({ preventScroll: true });
        const rect = target?.getBoundingClientRect();
        if (target && rect) {
          const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
          if (rect.top < margin || rect.bottom > window.innerHeight) {
            target.scrollIntoView({ block: "nearest", behavior: "instant" });
          }
        }
      }
      return;
    }

    disclosure.open = true;
    disclosure.dataset.closing = String(!open);
    disclosure.style.overflow = "hidden";
    contentHeightRef.current = composer.getBoundingClientRect().height;
    const endHeight = summary.getBoundingClientRect().height + (open ? contentHeightRef.current : 0);
    const easing = getComputedStyle(disclosure).getPropertyValue("--hp-ease-out").trim()
      || "cubic-bezier(0.16, 1, 0.3, 1)";
    const height = disclosure.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: open ? 280 : 200, easing, fill: "both" },
    );
    const content = composer.animate(
      [{ opacity: startOpacity, transform: startTransform },
        { opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(4px)" }],
      { duration: open ? 220 : 150, easing, fill: "both" },
    );
    animationsRef.current = [height, content];
    height.onfinish = () => {
      if (animationsRef.current[0] === height) finishTransition();
    };
  }

  function handleToggleClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const open = animationsRef.current.length ? targetOpenRef.current : disclosureRef.current?.open;
    toggleDisclosure(!open, event.detail === 0);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formElement = event.currentTarget;
    const values = new FormData(formElement);
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const message = String(values.get("message") || "").trim();

    const fallbackUrl = createContactDraft({
      recipient: c.email,
      subjectPrefix: c.form.subjectPrefix,
      name,
      replyTo: email,
      message,
    });

    setSubmitting(true);
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
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-7xl home-contact-section" id="contact" aria-label={c.regionLabel}>
      <header className="home-contact-invitation">
        <h2 className="home-contact-heading">{c.headline.lead}<em>{c.headline.accent}</em></h2>
        <p className="home-contact-intro">{c.intro}</p>
      </header>

      <details className="home-contact-disclosure" id="home-contact-disclosure" ref={disclosureRef}
        onKeyDown={(event) => {
          if (event.key === "Escape" && event.currentTarget.open) {
            event.preventDefault();
            toggleDisclosure(false, true);
          }
        }}>
        <summary className="home-contact-toggle" onClick={handleToggleClick} ref={summaryRef}>
          <span className="home-contact-open-label">{c.openForm}</span>
          <span className="home-contact-toggle-icon" aria-hidden="true">
            <span className="home-contact-icon-open"><Arrow /></span>
            <svg className="home-contact-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14" /></svg>
          </span>
        </summary>
        <div className="home-contact-composer" ref={composerRef}>
          <h3 className="home-contact-compose-heading" id="home-contact-compose-heading">{c.form.headline.lead} <em>{c.form.headline.accent}</em></h3>
          <p className="home-contact-compose-intro">{c.form.intro}</p>

          {submitted ? (
            <div
              className="home-contact-success-box"
              role="status"
              aria-live="polite"
              style={{
                marginTop: "1.75rem",
                padding: "2rem",
                backgroundColor: "var(--bg-dark-surface)",
                border: "1px solid var(--color-secondary)",
                borderRadius: "3px",
                color: "var(--color-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "0.5rem" }}>✓</div>
              <p style={{ margin: 0 }}>
                {c.form.successMsg}
              </p>
            </div>
          ) : (
            <form className="home-contact-form" aria-labelledby="home-contact-compose-heading" onSubmit={handleSubmit}>
              {/* Invisible anti-spam honeypot */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

              <div className="home-contact-fields">
                <label className="home-contact-field" htmlFor="home-contact-name">{c.form.nameLabel}
                  <input id="home-contact-name" name="name" type="text" autoComplete="name" placeholder={c.form.namePlaceholder} maxLength={120} required ref={nameRef} />
                </label>
                <label className="home-contact-field" htmlFor="home-contact-email">{c.form.emailLabel}
                  <input id="home-contact-email" name="email" type="email" autoComplete="email" placeholder={c.form.emailPlaceholder} maxLength={254} required />
                </label>
              </div>
              <label className="home-contact-field home-contact-message" htmlFor="home-contact-message">{c.form.messageLabel}
                <textarea id="home-contact-message" name="message" rows={3} placeholder={c.form.messagePlaceholder} maxLength={3000} required />
              </label>

              <button className="home-contact-draft-button" type="submit" disabled={submitting}>
                {submitting
                  ? c.form.submittingLabel
                  : c.form.submitLabel}
                <Arrow />
              </button>

              {/* Privacy Notice */}
              <p className="home-contact-mail-hint" style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-dark-muted)" }}>
                {c.form.privacyPrefix}
                <Link
                  to={locale === "de" ? `/${locale}/datenschutz` : `/${locale}/privacy`}
                  style={{ color: "var(--color-secondary)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  {c.form.privacyLink}
                </Link>
                {c.form.privacySuffix}
              </p>

              {/* Error feedback with direct mailto fallback */}
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
      </details>
      <div className="home-contact-afterword">
        <p className="home-contact-whisper">{c.helper}</p>
        <a className="home-contact-email" href={"mailto:" + c.email}>{c.email}</a>
      </div>
    </section>
  );
}
