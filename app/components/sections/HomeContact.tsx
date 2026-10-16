import { useEffect, useRef, type FormEvent, type SyntheticEvent } from "react";
import type { Translations } from "~/i18n/translations";
import { createContactDraft } from "./contactDraft";
import "~/styles/home-contact.css";

interface HomeContactProps { t: Translations }

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={back ? "M19 12H5m7 7-7-7 7-7" : "M7 17 17 7M7 7h10v10"} />
    </svg>
  );
}

export function HomeContact({ t }: HomeContactProps) {
  const c = t.homeContact;
  const sectionRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const shouldFocus = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const isOpen = event.currentTarget.open;
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      if (isOpen) nameRef.current?.focus({ preventScroll: true });
      else summaryRef.current?.focus({ preventScroll: true });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    window.location.href = createContactDraft({
      recipient: c.email,
      subjectPrefix: c.form.subjectPrefix,
      name: String(values.get("name") || "").trim(),
      replyTo: String(values.get("email") || "").trim(),
      message: String(values.get("message") || "").trim(),
    });
  }

  return (
    <section className="max-w-7xl home-contact-section" id="contact" aria-label={c.regionLabel} ref={sectionRef}>
      <header className="home-contact-invitation">
        <h2 className="home-contact-heading">{c.headline.lead}<em>{c.headline.accent}</em></h2>
        <p className="home-contact-intro">{c.intro}</p>
      </header>

      <details className="home-contact-disclosure" id="home-contact-disclosure" onToggle={handleToggle}
        onKeyDown={(event) => {
          if (event.key === "Escape" && event.currentTarget.open) {
            event.preventDefault();
            shouldFocus.current = true;
            event.currentTarget.open = false;
          }
        }}>
        <summary className="home-contact-toggle" onClick={() => { shouldFocus.current = true; }} ref={summaryRef}>
          <span className="home-contact-open-label">{c.openForm}</span>
          <span className="home-contact-back-label"><Arrow back />{c.form.back}</span>
          <span className="home-contact-open-arrow"><Arrow /></span>
        </summary>
        <div className="home-contact-composer">
          <h2 className="home-contact-compose-heading">{c.form.headline.lead}<em>{c.form.headline.accent}</em></h2>
          <p className="home-contact-intro">{c.form.intro}</p>
          <form className="home-contact-form" action={"mailto:" + c.email} method="post" encType="text/plain" onSubmit={handleSubmit}>
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
            <button className="home-contact-draft-button" type="submit">{c.form.submitLabel}<Arrow /></button>
            <p className="home-contact-mail-hint">{c.form.mailHint}</p>
            <p className="home-contact-direct"><span>{c.form.directLabel}</span><a href={"mailto:" + c.email}>{c.email}</a></p>
          </form>
        </div>
      </details>
      <div className="home-contact-afterword">
        <p className="home-contact-whisper">{c.helper}</p>
        <a className="home-contact-email" href={"mailto:" + c.email}>{c.email}</a>
      </div>
      <p className="home-contact-wordmark" aria-hidden="true">WILK</p>
    </section>
  );
}
