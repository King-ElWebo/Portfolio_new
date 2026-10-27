import { useLoaderData, Link, type LoaderFunctionArgs } from "react-router";
import { getTranslations, type Locale } from "~/i18n/translations";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { SiteFooter } from "~/components/layout/SiteFooter";
import "~/styles/legal.css";

export function loader({ params }: LoaderFunctionArgs) {
  const rawLocale = params.locale;
  if (rawLocale !== "de" && rawLocale !== "en") {
    throw new Response("Not Found", { status: 404 });
  }

  const locale = rawLocale as Locale;
  const { t } = getTranslations(locale);

  return { locale, t };
}

export function meta({ data }: { data?: { locale: Locale; t: any } }) {
  const isDe = data?.locale === "de";
  return [
    {
      title: isDe
        ? "Impressum & Offenlegung — WILK"
        : "Legal Notice & Mandatory Disclosure — WILK",
    },
    {
      name: "description",
      content: isDe
        ? "Gesetzliche Anbieterkennzeichnung und Offenlegung nach § 5 ECG, § 63 GewO und § 25 MedienG für das Studio WILK (Benjamin Wilk, Wien)."
        : "Mandatory legal notice and Austrian regulatory disclosure pursuant to § 5 ECG, § 63 GewO, and § 25 MedienG for WILK (Benjamin Wilk, Vienna).",
    },
  ];
}

export default function ImpressumRoute() {
  const { locale, t } = useLoaderData<typeof loader>();
  const isDe = locale === "de";

  return (
    <div className="legal-page-root">
      <SiteHeader t={t} locale={locale} />

      <main id="main-content" className="legal-main" tabIndex={-1}>
        <header className="legal-header">
          <span className="legal-kicker">
            {isDe
              ? "Rechtliche Pflichtangaben // Österreich"
              : "Regulatory Disclosure // Austria"}
          </span>
          <h1 className="legal-title">
            {isDe ? "Impressum & Offenlegung" : "Legal Notice"}
          </h1>
          <p className="legal-subtitle">
            {isDe
              ? "Informationspflichten nach § 5 Abs. 1 E-Commerce-Gesetz (ECG), § 63 Gewerbeordnung 1994 (GewO) und Offenlegungspflicht nach § 25 Mediengesetz (MedienG)."
              : "Mandatory information pursuant to § 5 (1) Austrian E-Commerce Act (ECG), § 63 Austrian Trade Act 1994 (GewO), and disclosure obligations under § 25 Austrian Media Act (MedienG)."}
          </p>
        </header>

        <div className="legal-content">
          {/* Section 1: Medieninhaber & Diensteanbieter */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "1. Diensteanbieter & Medieninhaber"
                : "1. Service Provider & Media Owner"}
            </h2>
            <div className="legal-meta-grid">
              <span className="legal-meta-label">
                {isDe ? "Name / Inhaber" : "Legal Operator"}
              </span>
              <span className="legal-meta-value">
                <strong>Benjamin Wilk</strong>
              </span>

              <span className="legal-meta-label">
                {isDe ? "Geschäftsbezeichnung" : "Public Business Name"}
              </span>
              <span className="legal-meta-value">WILK</span>

              <span className="legal-meta-label">
                {isDe ? "Rechtsform" : "Legal Form"}
              </span>
              <span className="legal-meta-value">
                {isDe
                  ? "Einzelunternehmer (nicht im Firmenbuch eingetragen)"
                  : "Sole Proprietor (unregistered, not entered in the commercial register / Firmenbuch)"}
              </span>

              <span className="legal-meta-label">
                {isDe ? "Standort & Anschrift" : "Business Address"}
              </span>
              <span className="legal-meta-value">
                Pia-Maria-Plechl-Weg 29
                <br />
                1130 Wien
                <br />
                {isDe ? "Österreich" : "Austria"}
              </span>
            </div>
          </section>

          {/* Section 2: Kontaktaufnahme */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe ? "2. Kontaktaufnahme" : "2. Contact Information"}
            </h2>
            <div className="legal-meta-grid">
              <span className="legal-meta-label">
                {isDe ? "E-Mail" : "Email"}
              </span>
              <span className="legal-meta-value">
                <a href="mailto:office@bywilk.at">office@bywilk.at</a>
              </span>

              <span className="legal-meta-label">
                {isDe ? "Website" : "Website"}
              </span>
              <span className="legal-meta-value">
                <a
                  href="https://bywilk.at"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://bywilk.at
                </a>
              </span>

              <span className="legal-meta-label">
                {isDe ? "Kontaktweg" : "Direct Inquiries"}
              </span>
              <span className="legal-meta-value">
                {isDe ? (
                  <>
                    Direkte E-Mail oder über das gesicherte{" "}
                    <Link to={`/${locale}/contact`}>Kontaktformular</Link> auf
                    dieser Website.
                  </>
                ) : (
                  <>
                    Direct email or via the secure{" "}
                    <Link to={`/${locale}/contact`}>contact form</Link> on this
                    website.
                  </>
                )}
              </span>
            </div>
          </section>

          {/* Section 3: Gewerberecht & Aufsicht */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "3. Gewerberechtliche Angaben & Aufsichtsbehörde"
                : "3. Trade Registration & Regulatory Authority"}
            </h2>
            <div className="legal-meta-grid">
              <span className="legal-meta-label">
                {isDe ? "Gewerbewortlaut" : "Registered Trade"}
              </span>
              <span className="legal-meta-value">
                „Dienstleistungen in der automatischen Datenverarbeitung und
                Informationstechnik“
              </span>

              <span className="legal-meta-label">
                {isDe ? "GISA-Zahl" : "GISA Identifier"}
              </span>
              <span className="legal-meta-value">39386267</span>

              <span className="legal-meta-label">
                {isDe ? "Gewerbebehörde" : "Trade Authority"}
              </span>
              <span className="legal-meta-value">
                Magistrat der Stadt Wien
                <br />
                Magistratisches Bezirksamt für den 13. und 14. Bezirk
              </span>

              <span className="legal-meta-label">
                {isDe ? "Kammerorganisation" : "Chamber Affiliation"}
              </span>
              <span className="legal-meta-value">
                {isDe
                  ? "Wirtschaftskammerorganisation (Zuständige Landeskammer: Wirtschaftskammer Wien / WKO Wien; Fachgruppe: voraussichtlich Fachgruppe Unternehmensberatung, Buchhaltung und Informationstechnologie – UBIT)"
                  : "Austrian Economic Chambers (Regional Chamber: Wirtschaftskammer Wien / WKO Vienna; Specialist Division: presumably Management Consultancy, Accounting and IT – UBIT)"}
              </span>

              <span className="legal-meta-label">
                {isDe ? "Berufsrecht" : "Applicable Law"}
              </span>
              <span className="legal-meta-value">
                {isDe
                  ? "Gewerbeordnung 1994 (GewO), abrufbar im Rechtsinformationssystem des Bundes (RIS) unter "
                  : "Austrian Trade Regulation Act 1994 (GewO), accessible via the Federal Legal Information System (RIS) at "}
                <a
                  href="https://www.ris.bka.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.ris.bka.gv.at
                </a>
              </span>
            </div>
          </section>

          {/* Section 4: Steuern & Firmenbuch */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "4. Steuern & Firmenbuch"
                : "4. Taxation & Commercial Register"}
            </h2>
            <p>
              <strong>{isDe ? "Umsatzsteuer:" : "Value Added Tax:"}</strong>{" "}
              {isDe
                ? "Als nicht im Firmenbuch eingetragener Einzelunternehmer besteht keine Umsatzsteuer-Identifikationsnummer (UID)."
                : "As a sole proprietor not entered in the commercial register, no VAT identification number (UID) is assigned."}
            </p>
            <p>
              <strong>
                {isDe ? "Firmenbucheintrag:" : "Commercial Register Entry:"}
              </strong>{" "}
              {isDe
                ? "Als nicht protokolliertes Einzelunternehmen besteht keine Eintragung im Firmenbuch und keine Firmenbuchnummer."
                : "As an unregistered sole proprietorship, no entry in the commercial register (Firmenbuch) and no register number exists."}
            </p>
          </section>

          {/* Section 5: Grundlegende Richtung (Blattlinie) */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "5. Grundlegende Richtung des Mediums (Blattlinie)"
                : "5. Purpose & Editorial Direction"}
            </h2>
            <div className="legal-callout">
              <p>
                {isDe
                  ? "Die Website https://bywilk.at dient der professionellen Präsentation von Dienstleistungen in den Bereichen digitales Design, Webentwicklung und Software-Engineering, der Dokumentation ausgewählter Arbeits- und Projektreferenzen sowie unabhängiger technischer Forschungsprojekte (The Lab) und der geschäftlichen Kontaktaufnahme."
                  : "The website https://bywilk.at serves the professional presentation of digital design, web development, and software engineering services, the documentation of selected client references and independent technology experiments (The Lab), as well as direct business communication."}
              </p>
            </div>
          </section>

          {/* Section 6: Streitschlichtung */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "6. Streitschlichtung & Verbraucherhinweise"
                : "6. Dispute Resolution"}
            </h2>
            <p>
              {isDe
                ? "Verbraucher haben die Möglichkeit, Beschwerden an die zuständige Verbraucherschlichtungsstelle zu richten. Wir sind jedoch weder gesetzlich verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle gemäß dem Alternativen Streitbeilegung-Gesetz (AStG) teilzunehmen."
                : "Consumers have the option to address complaints to a competent consumer dispute arbitration board. However, we are neither legally obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration body pursuant to the Austrian Alternative Dispute Resolution Act (AStG)."}
            </p>
          </section>

          {/* Section 7: Haftung & Urheberrecht */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "7. Haftungsausschluss & Urheberrecht"
                : "7. Liability & Copyright"}
            </h2>
            <p className="legal-section-subtitle">
              {isDe ? "Haftung für Inhalte" : "Liability for Content"}
            </p>
            <p>
              {isDe
                ? "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen gesetzlichen Bestimmungen verantwortlich."
                : "The contents of this website were created with the greatest care. However, we cannot assume liability for the correctness, completeness, and topicality of the content. As a service provider, we are responsible for our own content according to general laws."}
            </p>

            <p className="legal-section-subtitle">
              {isDe ? "Haftung für externe Links" : "Liability for External Links"}
            </p>
            <p>
              {isDe
                ? "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich."
                : "This website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any responsibility for these external contents. The respective operator of the linked pages is solely responsible for their content."}
            </p>

            <p className="legal-section-subtitle">
              {isDe ? "Urheberrecht" : "Copyright"}
            </p>
            <p>
              {isDe
                ? "Die durch den Seitenbetreiber erstellten Inhalte, Designs, Interface-Konzepte, Fotografien, 3D-/Partikel-Visualisierungen und Code-Artefakte auf dieser Website unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung von Benjamin Wilk."
                : "All contents, interface designs, creative concepts, photographs, 3D/particle visualisations, and software code on this website are protected under Austrian and international copyright laws. Any reproduction, processing, or commercial exploitation requires prior written permission from Benjamin Wilk."}
            </p>
          </section>

          {/* Bottom navigation */}
          <div className="legal-footer-nav">
            <Link to={`/${locale}`} className="legal-back-link">
              ← {isDe ? "Zurück zur Startseite" : "Return to Homepage"}
            </Link>
            <Link
              to={isDe ? `/${locale}/datenschutz` : `/${locale}/privacy`}
              className="legal-back-link"
            >
              {isDe
                ? "Zur Datenschutzerklärung →"
                : "View Privacy Policy →"}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter t={t} locale={locale} />
    </div>
  );
}
