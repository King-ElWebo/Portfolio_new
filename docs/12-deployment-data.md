# Deployment & Infrastructure Target

> **Status**: IN PROGRESS (Cloudflare Workers Konfiguration & Vite-Plugin implementiert; Remote-Deployment & Neon unprovisioniert)  
> **Source of Truth**: Hosting, Cloud-Infrastruktur & Datenbank-Integration

---

## 🎯 Bestätigte Zielinfrastruktur `[CONFIRMED]`

| Komponente | Gewählte Technologie / Plattform | Aktueller Integrationsstand | Status |
| :--- | :--- | :--- | :--- |
| **Hosting & Runtime** | **Cloudflare Workers** (via `@cloudflare/vite-plugin`) | `wrangler.jsonc`, `vite.config.ts` und `workers/app.ts` im Repository konfiguriert. Lokale SSR-Ausführung aktiv. | `CONFIRMED / IMPLEMENTIERT` |
| **Datenbank** | **Neon PostgreSQL** (Serverless Postgres) | Zielplattform bestätigt. Aktuell **vollständig unprovisioniert und nicht angebunden**. Dateibasierte Inhalte genügen zum Start. | `CONFIRMED ZIEL / UNPROVISIONIERT` |

---

## 🌐 Cloudflare Workers Implementierungsstand

Das Repository ist für den nativen Betrieb auf Cloudflare Workers vorkonfiguriert:
- **Konfigurationsdatei**: `wrangler.jsonc` mit Schema, Compatibility Date `2025-03-01`, Flag `nodejs_compat`, Einstiegspunkt `./workers/app.ts` und statischen Assets in `./build/client`.
- **Vite Plugin**: `@cloudflare/vite-plugin` (1.60.2) in `vite.config.ts` eingebunden (`viteEnvironment: { name: "ssr" }`).
- **Worker Entry Point**: `workers/app.ts` instanziiert `createRequestHandler` mit `virtual:react-router/server-build` und leitet Anfragen über `ExportedHandler<Env>` weiter.
- **Lokale Entwicklung**: `npm run dev` simuliert die Cloudflare Workers SSR-Umgebung transparent.
- **Remote-Status**: Noch kein Remote-Deployment, keine Cloudflare-Bindings (KV, D1, Queues) und kein Custom-Domain-Binding durchgeführt.

---

## 🐘 Neon PostgreSQL Integrations-Status

- **Status**: **Unprovisioniert**.
- **Konzept**: Es wurde bewusst noch keine Cloud-Datenbank bei Neon angelegt, da das Portfolio zunächst über lokale typisierte Dateien (`content/projects/`) vollständig autark und latenzfrei betrieben werden kann.
- **Vorbereitung**: Die `.env.example` enthält den formalen Platzhalter `DATABASE_URL` für die spätere Anbindung.
- **Sicherheits-Grundsatz**: Falls Neon angebunden wird, erfolgt der Zugriff ausschließlich serverseitig in Loadern/Actions (niemals Client-seitig gebündelt).

---

## 📋 Noch offene Infrastruktur- & Deployment-Entscheidungen `[OPEN / TODO]`

- [ ] **Remote Cloudflare Provisioning**: Anlegen des Cloudflare Worker Projekts im Cloudflare Dashboard / CLI vor dem Go-Live.
- [ ] **Domain & DNS**: Finale Festlegung der Domain (Arbeitspräferenz `bywilk`) und Aufschaltung via Cloudflare DNS.
- [ ] **E-Mail-Provider für Kontaktanfragen**: Auswahl und Anbindung eines Transaktions-Mail-Dienstes (z. B. Resend API oder Cloudflare Workers Mail).
- [ ] **Datenschutzkonforme Analytics**: Aktivierung von Cloudflare Web Analytics (cookie-frei, DSGVO-konform ohne Consent-Banner).
- [ ] **Production Secrets**: Hinterlegen von Secrets via `wrangler secret put` erst bei konkretem Bedarf.
