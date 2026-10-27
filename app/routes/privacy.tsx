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
        ? "Datenschutzerklärung — WILK"
        : "Privacy Policy — WILK",
    },
    {
      name: "description",
      content: isDe
        ? "Transparente Information über die Verarbeitung personenbezogener Daten gemäß DSGVO und § 165 TKG 2021 auf bywilk.at."
        : "Transparent disclosure on the processing of personal data under GDPR and § 165 Austrian TKG 2021 on bywilk.at.",
    },
  ];
}

export default function PrivacyRoute() {
  const { locale, t } = useLoaderData<typeof loader>();
  const isDe = locale === "de";

  return (
    <div className="legal-page-root">
      <SiteHeader t={t} locale={locale} />

      <main id="main-content" className="legal-main" tabIndex={-1}>
        <header className="legal-header">
          <span className="legal-kicker">
            {isDe
              ? "Datenschutz & Transparenz // DSGVO & TKG"
              : "Privacy & Data Protection // GDPR & TKG"}
          </span>
          <h1 className="legal-title">
            {isDe ? "Datenschutzerklärung" : "Privacy Policy"}
          </h1>
          <p className="legal-subtitle">
            {isDe
              ? "Information über Art, Umfang und Zweck der Erhebung und Verwendung personenbezogener Daten gemäß Art. 13 und 14 der Datenschutz-Grundverordnung (DSGVO) sowie § 165 Telekommunikationsgesetz 2021 (TKG 2021)."
              : "Information on the nature, scope, and purpose of processing personal data in accordance with Articles 13 and 14 of the General Data Protection Regulation (GDPR) and § 165 Austrian Telecommunications Act 2021 (TKG 2021)."}
          </p>
        </header>

        <div className="legal-content">
          {/* Section 1: Verantwortlicher */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "1. Verantwortlicher für die Datenverarbeitung"
                : "1. Controller"}
            </h2>
            <p>
              {isDe
                ? "Verantwortlicher im Sinne der DSGVO und des österreichischen Datenschutzgesetzes (DSG) ist:"
                : "The controller within the meaning of the GDPR and the Austrian Data Protection Act (DSG) is:"}
            </p>
            <div className="legal-meta-grid">
              <span className="legal-meta-label">
                {isDe ? "Verantwortlicher" : "Controller"}
              </span>
              <span className="legal-meta-value">
                <strong>Benjamin Wilk</strong> (WILK)
              </span>

              <span className="legal-meta-label">
                {isDe ? "Anschrift" : "Address"}
              </span>
              <span className="legal-meta-value">
                Pia-Maria-Plechl-Weg 29
                <br />
                1130 Wien, {isDe ? "Österreich" : "Austria"}
              </span>

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
            </div>
          </section>

          {/* Section 2: Hosting & Edge Infrastructure */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "2. Hosting & Bereitstellung der Website (Cloudflare Workers)"
                : "2. Web Hosting & Edge Infrastructure (Cloudflare Workers)"}
            </h2>
            <p>
              {isDe
                ? "Wir betreiben diese Website auf der Serverless-Edge-Infrastruktur von Cloudflare Workers. Anbieter ist Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA."
                : "We host this website on the serverless edge infrastructure of Cloudflare Workers, provided by Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA."}
            </p>
            <p>
              {isDe
                ? "Bei jedem Aufruf unserer Website erfasst Cloudflare automatisch technische Verbindungsinformationen (Server-Logfiles), die Ihr Browser an das Edge-Netzwerk übermittelt. Hierzu zählen:"
                : "Whenever our website is accessed, Cloudflare automatically processes technical connection data (server logs) transmitted by your browser to the edge network. This includes:"}
            </p>
            <ul>
              <li>
                {isDe
                  ? "IP-Adresse des anfragenden Endgeräts (zur TCP/IP-Verbindung und Geolocation-Routing)"
                  : "IP address of the requesting device (for TCP/IP connection and edge routing)"}
              </li>
              <li>
                {isDe
                  ? "Datum und Uhrzeit des Abrufs"
                  : "Date and time of access"}
              </li>
              <li>
                {isDe
                  ? "Aufgerufene URL und HTTP-Methode"
                  : "Requested resource/path and HTTP method"}
              </li>
              <li>
                {isDe
                  ? "Übertragene Datenmenge und HTTP-Statuscode"
                  : "Transmitted data volume and HTTP response status code"}
              </li>
              <li>
                {isDe
                  ? "Browsertyp, Version und Betriebssystem (User-Agent)"
                  : "Browser type, version, and operating system (User-Agent)"}
              </li>
              <li>
                {isDe
                  ? "Referrer URL (zuvor besuchte Seite, sofern übermittelt)"
                  : "Referrer URL (previously visited website, if transmitted)"}
              </li>
            </ul>
            <p>
              <strong>{isDe ? "Zweck & Rechtsgrundlage:" : "Purpose & Legal Basis:"}</strong>{" "}
              {isDe
                ? "Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO an einer schnellen, stabilen, weltweiten Auslieferung, Ausfallsicherheit, Lastverteilung sowie der Abwehr von Cyberangriffen (DDoS-Schutz, Web Application Firewall)."
                : "Processing is based on our legitimate interest pursuant to Art. 6 (1) (f) GDPR in delivering a resilient, high-speed global website, load balancing, and preventing malicious cyber attacks (DDoS mitigation, Web Application Firewall)."}
            </p>
            <p>
              <strong>{isDe ? "Drittlandübermittlung & Garantien:" : "Third-Country Transfer Safeguards:"}</strong>{" "}
              {isDe
                ? "Cloudflare, Inc. ist unter dem EU-US Data Privacy Framework (DPF) zertifiziert. Die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der Europäischen Kommission gemäß Art. 45 DSGVO sowie standardisierte Vertragsklauseln (Standard Contractual Clauses – SCC) im Rahmen unseres Auftragsverarbeitungsvertrages (AVV)."
                : "Cloudflare, Inc. is certified under the EU-US Data Privacy Framework (DPF). Transfers to the USA are safeguarded by the European Commission's adequacy decision under Art. 45 GDPR and Standard Contractual Clauses (SCC) under our Data Processing Addendum (DPA)."}
            </p>
            <p>
              <strong>{isDe ? "Speicherdauer:" : "Retention:"}</strong>{" "}
              {isDe
                ? "Verbindungs- und Sicherheitslogs werden von Cloudflare im Rahmen standardisierter Betriebs- und Rotationszyklen temporär zur Gewährleistung der Netzsicherheit und Fehleranalyse vorgehalten und anschließend rollierend gelöscht bzw. anonymisiert aggregiert (die konkrete Aufbewahrungsdauer unterliegt den vorkonfigurierten Systemzyklen der Edge-Infrastruktur und ist im Cloudflare-Dashboard zu verifizieren), es sei denn, ein konkreter Sicherheitsvorfall macht eine längere Aufbewahrung zu Dokumentations- und Abwehrzwecken erforderlich."
                : "Connection and security logs are temporarily retained by Cloudflare under standard operational rotation cycles to maintain edge network integrity and diagnostic capabilities, after which they are cyclically purged or anonymized (the exact retention duration is governed by provider infrastructure policies and is subject to dashboard-level verification), unless a specific security event necessitates extended retention for investigation."}
            </p>
          </section>

          {/* Section 3: Cloudflare Web Analytics */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "3. Datenschutzfreundliche Webanalyse (Cloudflare Web Analytics)"
                : "3. Privacy-Friendly Web Analytics (Cloudflare Web Analytics)"}
            </h2>
            <p>
              {isDe
                ? "Wir nutzen auf dieser Website den Dienst Cloudflare Web Analytics von Cloudflare, Inc. Im Gegensatz zu traditionellen Analysewerkzeugen arbeitet dieser Dienst mit einem strikten Privacy-First-Ansatz:"
                : "This website utilizes Cloudflare Web Analytics, operated by Cloudflare, Inc. Unlike traditional analytics solutions, this service operates strictly under a privacy-first architecture:"}
            </p>
            <ul>
              <li>
                <strong>{isDe ? "Keine Cookies:" : "No Cookies:"}</strong>{" "}
                {isDe
                  ? "Es werden keinerlei Cookies auf Ihrem Endgerät abgelegt."
                  : "No tracking cookies are stored on your device."}
              </li>
              <li>
                <strong>{isDe ? "Kein Webspeicher-Zugriff:" : "No Terminal Storage Access:"}</strong>{" "}
                {isDe
                  ? "Es erfolgt kein Tracking über localStorage oder sessionStorage."
                  : "No tracking identifiers are stored in localStorage or sessionStorage."}
              </li>
              <li>
                <strong>{isDe ? "Kein geräteübergreifendes Profiling:" : "No Cross-Site Profiling:"}</strong>{" "}
                {isDe
                  ? "Es werden weder Nutzerprofile noch Fingerabdrücke Ihres Browsers erstellt."
                  : "No user profiles or persistent device fingerprints are constructed."}
              </li>
              <li>
                <strong>{isDe ? "Anonymisierte Metriken:" : "Aggregated Metrics:"}</strong>{" "}
                {isDe
                  ? "Erfasst werden ausschließlich aggregierte Performance- und Nutzungsdaten wie Seitenladezeiten (Core Web Vitals), Seitenaufrufe, aggregierte Herkunftsländer und Gerätetypen. IP-Adressen werden unmittelbar auf Regionsebene anonymisiert und nicht für Analytics gespeichert."
                  : "Only aggregated performance metrics such as page load speed (Core Web Vitals), visit counts, aggregated country origins, and device types are processed. IP addresses are dropped or localized at edge PoPs and not stored for analytics."}
              </li>
            </ul>
            <p>
              <strong>{isDe ? "Rechtsgrundlage:" : "Legal Basis:"}</strong>{" "}
              {isDe
                ? "Die Nutzung stützt sich auf Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Optimierung und Stabilität unseres Webangebots ohne unverhältnismäßigen Eingriff in die Privatsphäre der Besucher)."
                : "Processing is grounded in Art. 6 (1) (f) GDPR (legitimate interest in optimizing site performance and usability without infringing upon visitor privacy)."}
            </p>
          </section>

          {/* Section 4: Cookies & Storage */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "4. Lokale Speicherung & Spracheinstellung (Cookies & Storage)"
                : "4. Functional Storage & Language Preferences"}
            </h2>
            <p>
              {isDe
                ? "Zur Erbringung der vom Nutzer gewünschten Sprachauswahl setzen wir funktionale Speichertechnologien ein:"
                : "To deliver the multilingual experience explicitly requested by the visitor, we utilize strictly functional storage:"}
            </p>
            <div className="legal-meta-grid">
              <span className="legal-meta-label">
                {isDe ? "Speicherelement" : "Storage Item"}
              </span>
              <span className="legal-meta-value">
                Cookie: <code>portfolio_locale</code> / localStorage:{" "}
                <code>portfolio_locale</code>
              </span>

              <span className="legal-meta-label">
                {isDe ? "Zweck" : "Purpose"}
              </span>
              <span className="legal-meta-value">
                {isDe
                  ? "Speichert die vom Besucher manuell gewählte Sprache (Deutsch oder Englisch), um diese bei Unterseiten-Wechseln und künftigen Besuchen beizubehalten."
                  : "Persists the manually chosen language preference (German or English) across page navigation and subsequent visits."}
              </span>

              <span className="legal-meta-label">
                {isDe ? "Speicherdauer" : "Lifetime"}
              </span>
              <span className="legal-meta-value">
                {isDe
                  ? "Cookie: 1 Jahr (SameSite=Lax, Secure auf HTTPS). LocalStorage: Bis zur manuellen Löschung durch den Nutzer im Browser."
                  : "Cookie: 1 year (SameSite=Lax, Secure over HTTPS). LocalStorage: Persistent until cleared by user."}
              </span>

              <span className="legal-meta-label">
                {isDe ? "Rechtsgrundlage" : "Legal Basis"}
              </span>
              <span className="legal-meta-value">
                {isDe
                  ? "§ 165 Abs. 3 TKG 2021 (unbedingt erforderlich zur Erbringung des vom Nutzer ausdrücklich gewünschten Telemediendienstes) i.V.m. Art. 6 Abs. 1 lit. f DSGVO."
                  : "§ 165 (3) Austrian TKG 2021 (strictly necessary for providing the explicit user-requested service) in conjunction with Art. 6 (1) (f) GDPR."}
              </span>
            </div>
            <p>
              {isDe
                ? "Es werden keine Marketing- oder Tracking-Cookies eingesetzt. Ein Cookie-Einwilligungsbanner ist für diesen rein funktionalen Zweck rechtlich nicht erforderlich."
                : "No advertising or behavioral tracking cookies are utilized. A consent banner is not required under Austrian/EU law for this strictly necessary functional mechanism."}
            </p>
          </section>

          {/* Section 5: Lokale Schriftarten */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "5. Lokale Schriftarten (Self-Hosted Webfonts)"
                : "5. Local Font Hosting (Self-Hosted Webfonts)"}
            </h2>
            <p>
              {isDe
                ? "Diese Website verwendet zur einheitlichen und ansprechenden typografischen Darstellung die Schriften Inter, JetBrains Mono und Playfair Display. Sämtliche Schriftdateien sind lokal auf unserer Infrastruktur gehostet und werden direkt von unserer Domain ausgeliefert."
                : "This website utilizes the font families Inter, JetBrains Mono, and Playfair Display. All font files are self-hosted directly on our domain and edge infrastructure."}
            </p>
            <p>
              {isDe
                ? "Beim Aufruf unserer Seiten wird keine Verbindung zu Servern von Google Fonts oder anderen Drittanbietern aufgebaut. Ihre IP-Adresse wird nicht an externe Font-Netzwerke übermittelt."
                : "No network requests are dispatched to Google Fonts or other third-party font servers. Your IP address is never transmitted to external font distributors."}
            </p>
          </section>

          {/* Section 6: Kontaktaufnahme & Kontaktformular */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "6. Kontaktaufnahme (Kontaktformular & E-Mail)"
                : "6. Contact Inquiries (Form & Direct Email)"}
            </h2>
            <p>
              {isDe
                ? "Wenn Sie uns per Webformular oder per E-Mail kontaktieren, werden die von Ihnen eingegebenen Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns verarbeitet:"
                : "When you contact us via our web contact form or direct email, the data you provide is processed for handling and responding to your inquiry:"}
            </p>
            <ul>
              <li>{isDe ? "Name bzw. Organisation" : "Name or organization"}</li>
              <li>{isDe ? "E-Mail-Adresse" : "Email address"}</li>
              <li>{isDe ? "Nachrichteninhalt & Projektbeschreibung" : "Message content & project scope"}</li>
              <li>{isDe ? "Zeitstempel der Übermittlung" : "Transmission timestamp"}</li>
            </ul>
            <p>
              <strong>{isDe ? "Rechtsgrundlage:" : "Legal Basis:"}</strong>{" "}
              {isDe
                ? "Die Datenverarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen bzw. zur Erfüllung eines Vertragsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO) sowie auf Grundlage unseres berechtigten Interesses an einer zuverlässigen und professionellen Kommunikation (Art. 6 Abs. 1 lit. f DSGVO)."
                : "Data processing is conducted for taking pre-contractual measures or fulfilling contractual obligations (Art. 6 (1) (b) GDPR), as well as our legitimate interest in effective business communication (Art. 6 (1) (f) GDPR)."}
            </p>
            <p>
              <strong>{isDe ? "Verarbeitungskette & E-Mail-Infrastruktur:" : "Processing Chain & Email Infrastructure:"}</strong>{" "}
              {isDe
                ? "Formulareingaben werden über den Cloudflare-Worker-Dienst TLS-verschlüsselt an die API unseres transaktionalen E-Mail-Dienstleisters Resend (Resend Inc., 2261 Market St #4000, San Francisco, CA 94114, USA) übermittelt. Der Versand ist auf die europäische Rechenzentrumsregion von Resend (Dublin, Irland) konfiguriert. Resend ist unter dem EU-US Data Privacy Framework zertifiziert. Die Benachrichtigung wird an unsere geschäftliche Empfängeradresse office@bywilk.at zugestellt und über den Dienst Cloudflare Email Routing an das verwaltete Postfach des Seitenbetreibers weitergeleitet. Bei direkter E-Mail-Kontaktaufnahme an office@bywilk.at erfolgt die Verarbeitung direkt über die Mail-Routing- und DNS-Infrastruktur von Cloudflare."
                : "Form submissions are securely dispatched TLS-encrypted via the Cloudflare Worker runtime to the API of our transactional email provider Resend (Resend Inc., 2261 Market St #4000, San Francisco, CA 94114, USA). Dispatch is configured through Resend's European region (Dublin, Ireland). Resend is certified under the EU-US Data Privacy Framework. The notification email is addressed to our business mailbox office@bywilk.at and forwarded via Cloudflare Email Routing to the operator's managed mailbox. Direct emails sent to office@bywilk.at are processed via Cloudflare's email routing and DNS infrastructure."}
            </p>
            <p>
              <strong>{isDe ? "Speicherdauer & Differenzierung:" : "Retention & Categories:"}</strong>{" "}
              {isDe
                ? "Wir differenzieren bei der Aufbewahrung strikt nach dem Charakter der Korrespondenz: Allgemeine Anfragen und unverbindliche Vorfeldkontakte werden gelöscht, sobald der Sachverhalt abschließend geklärt ist und keine weitere Kommunikation zu erwarten ist. Führt die Kontaktaufnahme hingegen zu einem Vertragsschluss oder entstehen daraus geschäftliche und steuerlich relevante Unterlagen (z. B. Angebote, Verträge, Abrechnungen), werden diese Korrespondenzen gemäß den gesetzlichen Aufbewahrungspflichten nach § 132 Bundesabgabenordnung (BAO) sowie § 212 Unternehmensgesetzbuch (UGB) für die Dauer von mindestens 7 Jahren aufbewahrt."
                : "We strictly differentiate retention based on inquiry characteristics: General exploratory questions and non-contractual messages are deleted once the matter is conclusively resolved and no ongoing dialogue is required. Where inquiries lead to contract formation or contain commercial/tax-relevant documentation (e.g. proposals, orders, accounting records), they are retained pursuant to statutory retention mandates under § 132 Austrian Federal Fiscal Code (BAO) and § 212 Austrian Commercial Code (UGB) for a statutory minimum of 7 years."}
            </p>
          </section>

          {/* Section 7: Spamschutz */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "7. Spamschutz & Missbrauchsprävention"
                : "7. Anti-Spam & Abuse Protection"}
            </h2>
            <p>
              {isDe
                ? "Zum Schutz vor automatisierter Spam-Übermittlung setzen wir serverseitige Filtertechniken (unsichtbare Honeypot-Felder) ein. Soweit Cloudflare Turnstile zur Bot-Erkennung zugeschaltet ist, analysiert dieser Dienst technische Browsermerkmale zur Unterscheidung menschlicher Nutzer von bösartigen Crawlern, ohne verhaltensbezogene Tracking-Cookies zu setzen."
                : "To safeguard our communication channels from automated spam, we employ server-side honeypot filtering. Where Cloudflare Turnstile is enabled, it analyzes non-identifying technical browser attributes without setting persistent tracking cookies."}
            </p>
            <p>
              <strong>{isDe ? "Rechtsgrundlage:" : "Legal Basis:"}</strong>{" "}
              {isDe
                ? "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Abwehr von Spam, Denial-of-Service-Angriffen und Serverüberlastung)."
                : "Art. 6 (1) (f) GDPR (legitimate interest in system availability and preventing automated abuse)."}
            </p>
          </section>

          {/* Section 8: Betroffenenrechte */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "8. Ihre Rechte als betroffene Person"
                : "8. Your Rights as a Data Subject"}
            </h2>
            <p>
              {isDe
                ? "Nach den Bestimmungen der DSGVO stehen Ihnen bezüglich Ihrer bei uns verarbeiteten Daten folgende Rechte zu:"
                : "Under the provisions of the GDPR, you have the following rights regarding your personal data:"}
            </p>
            <ul>
              <li>
                <strong>{isDe ? "Auskunftsrecht (Art. 15 DSGVO):" : "Right of Access (Art. 15 GDPR):"}</strong>{" "}
                {isDe
                  ? "Sie haben das Recht auf Bestätigung und Auskunft über die von uns verarbeiteten Daten."
                  : "You have the right to obtain confirmation and information regarding data processed concerning you."}
              </li>
              <li>
                <strong>{isDe ? "Recht auf Berichtigung (Art. 16 DSGVO):" : "Right to Rectification (Art. 16 GDPR):"}</strong>{" "}
                {isDe
                  ? "Sie haben das Recht auf unverzügliche Vervollständigung oder Berichtigung unrichtiger Daten."
                  : "You have the right to request the rectification or completion of inaccurate data."}
              </li>
              <li>
                <strong>{isDe ? "Recht auf Löschung (Art. 17 DSGVO):" : "Right to Erasure (Art. 17 GDPR):"}</strong>{" "}
                {isDe
                  ? "Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen."
                  : "You may request the deletion of your personal data, subject to statutory retention obligations."}
              </li>
              <li>
                <strong>{isDe ? "Recht auf Einschränkung (Art. 18 DSGVO):" : "Right to Restriction (Art. 18 GDPR):"}</strong>{" "}
                {isDe
                  ? "Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen."
                  : "You have the right to request restriction of processing."}
              </li>
              <li>
                <strong>{isDe ? "Recht auf Datenübertragbarkeit (Art. 20 DSGVO):" : "Right to Data Portability (Art. 20 GDPR):"}</strong>{" "}
                {isDe
                  ? "Sie haben das Recht, Ihre bereitgestellten Daten in einem strukturierten, gängigen Format zu erhalten."
                  : "You have the right to receive your data in a structured, machine-readable format."}
              </li>
              <li>
                <strong>{isDe ? "Widerspruchsrecht (Art. 21 DSGVO):" : "Right to Object (Art. 21 GDPR):"}</strong>{" "}
                {isDe
                  ? "Sie können einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO jederzeit aus Gründen Ihrer besonderen Situation widersprechen."
                  : "You may object to processing based on Art. 6 (1) (f) GDPR at any time on grounds relating to your particular situation."}
              </li>
            </ul>
            <p>
              {isDe
                ? "Zur Geltendmachung Ihrer Rechte genügt eine formlose Nachricht per E-Mail an: "
                : "To exercise any of these rights, please send an informal email to: "}
              <a href="mailto:office@bywilk.at">office@bywilk.at</a>.
            </p>
          </section>

          {/* Section 9: Aufsichtsbehörde */}
          <section className="legal-section">
            <h2 className="legal-section-title">
              {isDe
                ? "9. Beschwerderecht bei der Aufsichtsbehörde"
                : "9. Right to Lodge a Complaint"}
            </h2>
            <p>
              {isDe
                ? "Sollten Sie der Ansicht sein, dass die Verarbeitung Ihrer personenbezogenen Daten gegen geltendes Datenschutzrecht verstößt, haben Sie das Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde. In Österreich ist dies:"
                : "If you believe that the processing of your data violates applicable data protection legislation, you have the right to lodge a complaint with the competent supervisory authority. In Austria, this is:"}
            </p>
            <div className="legal-meta-grid">
              <span className="legal-meta-label">
                {isDe ? "Behörde" : "Supervisory Authority"}
              </span>
              <span className="legal-meta-value">
                <strong>Österreichische Datenschutzbehörde (DSB)</strong>
              </span>

              <span className="legal-meta-label">
                {isDe ? "Anschrift" : "Address"}
              </span>
              <span className="legal-meta-value">
                Barichgasse 40–42
                <br />
                1030 Wien, {isDe ? "Österreich" : "Austria"}
              </span>

              <span className="legal-meta-label">
                {isDe ? "Telefon / E-Mail" : "Phone / Email"}
              </span>
              <span className="legal-meta-value">
                Tel: +43 1 52 152-0
                <br />
                E-Mail: <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a>
              </span>

              <span className="legal-meta-label">
                {isDe ? "Website" : "Website"}
              </span>
              <span className="legal-meta-value">
                <a
                  href="https://www.dsb.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.dsb.gv.at
                </a>
              </span>
            </div>
          </section>

          {/* Bottom navigation */}
          <div className="legal-footer-nav">
            <Link to={`/${locale}`} className="legal-back-link">
              ← {isDe ? "Zurück zur Startseite" : "Return to Homepage"}
            </Link>
            <Link
              to={isDe ? `/${locale}/impressum` : `/${locale}/legal-notice`}
              className="legal-back-link"
            >
              {isDe ? "Zum Impressum →" : "View Legal Notice →"}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter t={t} locale={locale} />
    </div>
  );
}
