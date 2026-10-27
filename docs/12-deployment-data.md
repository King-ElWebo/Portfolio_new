# Deployment & Infrastructure Target

> **Status**: Cloudflare Worker, Domain und Git-basierte Veröffentlichung verifiziert (2026-10-27); Neon unprovisioniert
> **Source of Truth**: Hosting, Cloud-Infrastruktur & Datenbank-Integration

---

## 🎯 Bestätigte Zielinfrastruktur `[CONFIRMED]`

| Komponente | Gewählte Technologie / Plattform | Aktueller Integrationsstand | Status |
| :--- | :--- | :--- | :--- |
| **Hosting & Runtime** | **Cloudflare Workers** (via `@cloudflare/vite-plugin`) | Worker `portfolio-bywilk` unter `https://bywilk.at`; lokaler SSR-Build und automatische Veröffentlichung aus `main` geprüft. | `LIVE / VERIFIZIERT` |
| **Datenbank** | **Neon PostgreSQL** (Serverless Postgres) | Zielplattform bestätigt. Aktuell **vollständig unprovisioniert und nicht angebunden**. Dateibasierte Inhalte genügen zum Start. | `CONFIRMED ZIEL / UNPROVISIONIERT` |

---

## 🌐 Cloudflare Workers Implementierungsstand

Das Repository ist für den nativen Betrieb auf Cloudflare Workers vorkonfiguriert:
- **Konfigurationsdatei**: `wrangler.jsonc` mit Worker-Name `portfolio-bywilk`, explizitem Produktionskonto, Compatibility Date `2025-03-01`, Flag `nodejs_compat`, Einstiegspunkt `./workers/app.ts` und statischen Assets in `./build/client`.
- **Vite Plugin**: `@cloudflare/vite-plugin` (1.60.2) in `vite.config.ts` eingebunden (`viteEnvironment: { name: "ssr" }`).
- **Worker Entry Point**: `workers/app.ts` instanziiert `createRequestHandler` mit `virtual:react-router/server-build` und leitet Anfragen über `ExportedHandler<Env>` weiter.
- **Lokale Entwicklung**: `npm run dev` simuliert die Cloudflare Workers SSR-Umgebung transparent.
- **Remote-Status (2026-10-27)**: Worker `portfolio-bywilk` im Konto `987804e2dc70de2af18b781cb0d7bc0b`. Der Push des Reparatur-Commits `be12f44a39b3770a4ff04b9ea53a58ee77b4b47a` löste Cloudflare-Build `4e59ab9d-9cf5-495e-a041-17ce1aac5a78` aus. GitHub meldete dafür `completed / success` mit Worker-Version `7e071705-0ff3-49ce-a3b9-cb3a5bed9fce`. Anschließend lieferten `/de` und `/en` HTTP 200 mit neuer Zusammenarbeit-Sektion und passenden CSS-Regeln. Worker-Versions-IDs sind keine Git-Commits.
- **Git-Integration**: `King-ElWebo/Portfolio_new`, Produktionsbranch `main`. Cloudflare meldete zunächst eine getrennte Git-Verbindung; der Nutzer erneuerte die GitHub-App-Berechtigung. Der neue Push nach der Konfigurationskorrektur bestätigte den wieder funktionierenden Build-Trigger. Für den älteren Commit `9120f028d3af78768efd4ab19efd4f30c187ea6c` waren zuvor keine Statusprüfungen oder Check-Runs vorhanden. Das allein belegt keine konkrete Build-Fehlermeldung.
- **Lokale Authentifizierung**: Die vorhandene Wrangler-Anmeldung hat Zugriff auf ein anderes Konto. Die feste `account_id` verhindert, dass das Produktionsziel aus dieser Anmeldung abgeleitet wird; sie ersetzt keine Zugriffsberechtigung. Für lokale Remote-Aktionen ist eine vom Nutzer durchgeführte Anmeldung mit Zugriff auf das oben genannte Produktionskonto erforderlich. Zugangsdaten und Tokens gehören nicht ins Repository.
- **Bestehende Cloud-Einstellungen**: Domain-Zuordnung und sonstige Dashboard-Einstellungen werden bei dieser Reparatur nicht neu angelegt. Aus den Screenshots lässt sich kein vollständiger Binding- oder Secret-Bestand ableiten.

### Produktions-Build und Prüfung

Workers Builds verwendet das Repository-Root und Produktionsbranch `main`. Die zu prüfenden Dashboard-Befehle sind:

| Schritt | Befehl |
| :--- | :--- |
| Build | `npm run build` |
| Veröffentlichung | `npx wrangler deploy` |

Das Vite-Plugin erzeugt `build/server/wrangler.json` und die lokale Weiterleitung `.wrangler/deploy/config.json`. Nach einem frischen Build muss die erzeugte Konfiguration denselben Worker-Namen und dasselbe Konto wie `wrangler.jsonc` enthalten. `npx wrangler deploy --dry-run` prüft das Paket ohne Veröffentlichung.

Eine erfolgreiche lokale Prüfung bestätigt noch kein Live-Update. Dafür müssen der neue Git-Commit im Cloudflare-Build und die daraus aktiv veröffentlichte Version geprüft werden. Auf `https://bywilk.at/de` und `/en` muss die Zusammenarbeit-Sektion `collaboration-perspectives` enthalten; `collaboration-network` und die Ringgrafik gehören zur älteren Fassung. Bei einem ausbleibenden Build zuerst Git-Verbindung und Build-Historie prüfen, bevor ein Cache-Problem angenommen wird.

Referenzen: [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), [Build-Einstellungen](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [Worker-Name und Konto](https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/).

---

## 🐘 Neon PostgreSQL Integrations-Status

- **Status**: **Unprovisioniert**.
- **Konzept**: Es wurde bewusst noch keine Cloud-Datenbank bei Neon angelegt, da das Portfolio zunächst über lokale typisierte Dateien (`content/projects/`) vollständig autark und latenzfrei betrieben werden kann.
- **Vorbereitung**: Die `.env.example` enthält den formalen Platzhalter `DATABASE_URL` für die spätere Anbindung.
- **Sicherheits-Grundsatz**: Falls Neon angebunden wird, erfolgt der Zugriff ausschließlich serverseitig in Loadern/Actions (niemals Client-seitig gebündelt).

---

## 📋 Noch offene Infrastruktur- & Deployment-Entscheidungen `[OPEN / TODO]`

- [x] **Remote Cloudflare Provisioning**: Bestehender Worker `portfolio-bywilk` im Nutzer-Dashboard nachgewiesen; kein neues Projekt erforderlich.
- [x] **Domain**: `https://bywilk.at` ist öffentlich erreichbar und bedient das Portfolio. DNS-Konfiguration wurde nicht verändert.
- [x] **Automatische Veröffentlichung**: Neuer Push auf `main` löste einen erfolgreichen Cloudflare-Build aus; aktuelle Sektion und Styles auf `/de` und `/en` geprüft.
- [ ] **E-Mail-Provider für Kontaktanfragen**: Auswahl und Anbindung eines Transaktions-Mail-Dienstes (z. B. Resend API oder Cloudflare Workers Mail).
- [ ] **Datenschutzkonforme Analytics**: Aktivierung von Cloudflare Web Analytics (cookie-frei, DSGVO-konform ohne Consent-Banner).
- [ ] **Production Secrets**: Hinterlegen von Secrets via `wrangler secret put` erst bei konkretem Bedarf.
