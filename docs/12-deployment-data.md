# Deployment & Infrastructure Target

> **Status**: CONFIRMED VORGABE (Ziele gesetzt, Tooling-Details noch offen)  
> **Source of Truth**: Hosting, Cloud-Infrastruktur & Datenbank

---

## 🎯 Bestätigte Zielinfrastruktur `[CONFIRMED]`

| Komponente | Gewählte Technologie / Plattform | Status |
| :--- | :--- | :--- |
| **Hosting & Deployment** | **Cloudflare** (Pages / Workers / OpenNext) | `CONFIRMED` |
| **Datenbank** | **Neon PostgreSQL** (Serverless Postgres) | `CONFIRMED` |

---

## 🛑 Wichtige Handlungsregeln für Agents `[CONFIRMED]`

1. **Keine Vercel-spezifischen Annahmen treffen**:  
   Das Projekt wird **nicht** auf Vercel gehostet. Es dürfen keine Vercel-exklusiven APIs (`@vercel/analytics`, `@vercel/og`, Vercel Edge Runtime Spezifika) ungeprüft eingeplant werden, es sei denn, sie sind vollständig standardkonform und auf Cloudflare lauffähig.
2. **Noch keine Blind-Konfigurationen anlegen**:  
   Es werden zum jetzigen Zeitpunkt **weder `wrangler.json`/`wrangler.toml` noch spezifische Cloudflare-Adapter-Dateien** erzeugt. Diese entstehen erst, wenn das Framework final gewählt wurde.
3. **Keine Datenbank vorab provisionieren**:  
   Es wird vorerst kein Neon-Projekt, kein API-Token und keine echte Verbindung angelegt.

---

## 🌐 Cloudflare Deployment-Strategie `[OPEN / TO BE EVALUATED]`

Sobald das Framework entschieden ist, wird der offizielle, empfohlene Integrationspfad recherchiert:
- **Bei Next.js**: Evaluierung des aktuellen Stands von `@opennextjs/cloudflare` oder des nativen Cloudflare-Supportings.
- **Bei statischen / SSG-Frameworks**: Cloudflare Pages mit standardmäßigen Static Builds und Functions.
- **Offizielle Dokumentation als Source of Truth**: Ausschließlich [developers.cloudflare.com](https://developers.cloudflare.com) für Konfigurations- und Deploymentfragen heranziehen.

---

## 🐘 Neon PostgreSQL Integrations-Strategie `[OPEN / TO BE EVALUATED]`

Bei der späteren Anbindung von Neon sind folgende Kernpunkte zu berücksichtigen:
- **Connection Pooling**: Nutzung des serverless Neon Connection Poolers (`-pooler` Hostname) für Edge-Runtimes.
- **Serverless Driver**: Einsatz von `@neondatabase/serverless` (HTTP- oder WebSocket-basiert) für extrem schnelle Kaltstarts ohne TCP-Verbindungsüberhang.
- **Migrationen**: Definition eines sauberen Migrations-Workflows (z. B. via Drizzle Kit), der CI/CD-fähig ist.
- **Lokale Entwicklung**: Anbindung über Umgebungsvariablen (`.env.local`), die niemals in Git committet werden.
- **Offizielle Dokumentation als Source of Truth**: Ausschließlich [neon.tech/docs](https://neon.tech/docs) heranziehen.

---

## 📋 Noch offene Infrastruktur-Entscheidungen `[OPEN / TODO]`

- [ ] **Framework-Wahl**: Next.js App Router vs. Alternativen.
- [ ] **Cloudflare Adapter**: Konkreter Build- und Deployment-Adapter für das gewählte Framework.
- [ ] **ORM / Query Builder**: Drizzle ORM, Kysely oder nativer Neon-Driver.
- [ ] **E-Mail-Provider für Kontaktanfragen**: Resend, Cloudflare Workers Mail oder SMTP.
- [ ] **Analytics (DSGVO-konform)**: Cloudflare Web Analytics, Plausible oder Umami (keine Cookies, kein Consent-Banner nötig).
- [ ] **Asset- & Medien-Storage**: Cloudflare Images / R2 (nur falls dynamischer Media-Upload benötigt wird).
