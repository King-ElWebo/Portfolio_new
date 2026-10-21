# Visual & Interactive Inspiration

> **Zweck**: Strukturierte Benchmark-Analyse, Sammlung herausragender Referenzen und Interaktionsmuster.  
> **Source of Truth**: Inspiration, Gestaltungsrecherche & Qualitätsprüfung

---

## 🎯 Zukünftiger Research-Prozess `[CONFIRMED]`

Der Inspirations- und Benchmark-Prozess folgt einem klaren Trichter:

1. **Breite Recherche**: 20–30 herausragende Referenzen aus den Bereichen Digital Studios, Independent Designer, Portfolio-Showcases und Editorial Websites sammeln.
2. **Kuratierte Verdichtung**: Reduktion auf **6–10 Spitzenreferenzen**, die den Kern von *Cinematic Dark × Warm Editorial* am besten treffen.
3. **Detail-Extraktion statt Plagiat**: Einzelne Ideen, Rhythmen, Typografie-Behandlungen und Interaktionen isolieren und analysieren. **Niemals eine bestehende Website kopieren!**

---

## 🔍 Kriterien für die isolierte Analyse `[CONFIRMED]`

Jede Referenz wird differenziert nach folgenden Teilaspekten bewertet:
- **Hero Composition**: Wie wird Neugier geweckt? Welche Raumaufteilung wird gewählt?
- **Typography**: Schriftwahl, Skalierung, Zeilenabstand, redaktionelle Kontraste.
- **Project Presentation**: Wie werden Projekte inszeniert? Fullscreen, Stills, Video-Loops, Interaktivität?
- **Dark / Light Transition**: Wie wird der Farbumschwung technisch und visuell gelöst?
- **Editorial Layout**: Einsatz von Weißraum, Rhythmus, Magazin-Charakter.
- **Personal / About Treatment**: Wie wird die Person menschlich und professionell greifbar gemacht?
- **Motion & Physics**: Trägheit, Easing, Subtilität der Scroll-Effekte.
- **Navigation**: Schlankheit, Lesbarkeit, Language Switcher Platzierung.
- **Case Studies**: Detailgrad, Problem-Lösungs-Dramaturgie.
- **Contact / CTA**: Einladung zur Interaktion, Barrierefreiheit.
- **Mobile Behaviour**: Wie funktioniert die Seite auf dem Smartphone ohne Desktop-Effekte?

---

## 📋 Standardisiertes Referenz-Schema `[CONFIRMED]`

Jede analysierte Website wird nach folgendem Format dokumentiert:

```text
REFERENCE: [Name / Titel der Website]
URL: [https://...]
TYPE: [Portfolio | Creative Studio | Editorial Magazine | Digital Product]
WHAT I LIKE: [Konkrete Aspekte, Typo, Rhythmus, Farbharmonie, Interaktion]
WHAT I DON'T LIKE: [Was vermieden werden soll, z. B. zu verspielt, unleserlich]
DO NOT COPY: [Explizit festhalten, was NICHT übernommen werden darf]
USE FOR: [Konkreter Bereich, z. B. Hero-Typo, Dark-Cream-Transition, Case-Study-Grid]
NOTES: [Technische oder dramaturgische Besonderheiten]
```

---

## 📂 Dokumentierte Referenzen & Benchmarks

#### REFERENCE: Aimane.dev
- **URL**: `https://www.aimane.dev/`
- **TYPE**: *Creative Developer Portfolio*
- **WHAT I LIKE**: *Faszinierende Interaktion eines foto-basierten Partikelporträts im Hero; hohe haptische Reaktionsfreude auf Cursor-Bewegungen und elegantes Auflösen beim Scrollen.*
- **WHAT I DON'T LIKE**: *Stark technoid-dunkle Gesamtästhetik ohne warmen, redaktionellen Gegenpol.*
- **DO NOT COPY**: *Weder das visuelle Gesamterscheinungsbild noch Typografie, Menüführung, Farbpalette oder Shader-Code 1:1 kopieren! Das Portfolio verfolgt mit Cinematic Dark × Warm Editorial eine eigenständige gestalterische Synthese.*
- **USE FOR**: *Fotografische Wiedererkennbarkeit, luftige Punktzeichnung, gedämpfte Mausreaktion und Scroll-Streuung des Hero-Porträts. Die eigene Three.js-Implementierung bleibt davon technisch unabhängig.*
- **NOTES**: *Die technische Basis unseres Three.js-Porträts wurde eigenständig umgesetzt. Rendering-Verfeinerung erfolgte unter DEC-022; persönliche 3D-Geometrie bleibt offen. Die Referenz wurde ursprünglich als 3D-Skulptur eingeordnet; die erneute Prüfung unten korrigiert diese technische Annahme.*

**Erneute technische und visuelle Analyse — 2026-10-21:**

- **Nutzerrahmen:** Keine kostenpflichtige Scan-App. Gegenstand ist zunächst die erneute Analyse der Referenz, keine Freigabe zum Austausch des bestehenden Renderers.
- **Verifiziert:** Die aktuelle Hero-Komponente erhält `man.png` als Fotovorlage. Sie konfiguriert maximal 4.000 Partikel, filtert Bildpixel und verwendet eine 2D-Partikelbibliothek. Diese liest das Bild per `drawImage`/`getImageData`, verankert Punkte an Pixelpositionen und zeichnet Kreise über `CanvasRenderingContext2D`. Für diesen Porträteffekt wird kein 3D-Kopfmodell geladen.
- **Bewegung:** Maus- und Touch-Bewegung wirken als Störkraft; Reibung und Anziehung zu den Bildpositionen stellen die Form wieder her. Eine per GSAP geglättete, scrollabhängige `entropy` verändert die Streuung. Das ist keine gemessene räumliche Gesichtsgeometrie.
- **Visueller Eindruck:** Luftige Punktverteilung, viel Schwarzraum und fotografisch bestimmte Konturen tragen die Wiedererkennbarkeit. Die starre Fotoperspektive erhält Augenabstand, Nasenform, Mund und Haarumriss; eine echte Kopfrotation ist damit nicht belegt.
- **Folgerung / vorgeschlagener nächster Versuch:** Ein persönliches, foto-basiertes Partikelporträt ist ohne kostenpflichtigen Scan möglich. Ein scharfes, unverdecktes Foto könnte die Form liefern; der bestehende Three.js-Renderer kann grundsätzlich für eine überwiegend frontale Punktdarstellung mit zurückhaltender, gestalteter Tiefe weiterverwendet werden. Diese Tiefe wäre als Näherung zu verstehen. Ein frei drehbares persönliches 3D-Modell bleibt eine separate Aufgabe. Noch keine Implementierung dieser Alternative.
- **Quellen:** [Fotovorlage](https://www.aimane.dev/man.png), [Hero-Aufruf](https://www.aimane.dev/_next/static/chunks/562-d9c1aa4f6a32ef8f.js), [Porträt-Komponente](https://www.aimane.dev/_next/static/chunks/154.a385c180b3f542aa.js), [2D-Partikelbibliothek](https://www.aimane.dev/_next/static/chunks/501.d20cdd958275de5a.js). Aktuelle öffentliche Dateien am oben genannten Datum geprüft; Hash-URLs können sich bei einem neuen Build ändern.
- **Lokale Belege:** `qa-results/reference-aimane/` enthält die geprüften öffentlichen Quelldateien und eine Hero-Aufnahme, Git-ignoriert. Kein fremder Code und kein fremdes Porträt in die Anwendung übernommen. Private persönliche Fotos wurden nicht übertragen.

**Anschließende Nutzerentscheidung:** Die foto-basierte 2D-Richtung wurde am 2026-10-21 ausdrücklich zur Umsetzung freigegeben (DEC-033). Die eigene Implementierung verwendet weiterhin den bestehenden Three.js-Renderer, eine orthografische Kamera und persönliche Fotopunkte. Es wird keine fremde Partikelbibliothek übernommen.

---

## 🧪 Der 30-Sekunden-Feedback-Test `[CONFIRMED]`

Sobald Prototypen oder Design-Explorationen vorliegen, werden Testpersonen nicht einfach gefragt: *„Welche Variante gefällt dir besser?“*  
Stattdessen werden folgende strategische Kontrollfragen gestellt:

1. **„Was glaubst du, was diese Person beruflich macht?“**  
   *(Prüfung: Wird „Digital Designer & Software Developer“ sofort verstanden?)*
2. **„Welche Art von Projekt würdest du bei ihr anfragen?“**  
   *(Prüfung: Werden Websites, Apps und komplexe digitale Produkte wahrgenommen?)*
3. **„Würdest du ihr auch eine technisch komplexere Web-Anwendung zutrauen?“**  
   *(Prüfung: Wirkt der Auftritt nicht wie ein reiner Oberflächen-Designer?)*
4. **„Wirkt die Person nur für kleine Websites oder auch für größere Projekte geeignet?“**  
   *(Prüfung: Trägt der Auftritt professionelle Reife und Zuverlässigkeit?)*
5. **„Was ist dir nach 30 Sekunden Betrachtung im Gedächtnis geblieben?“**  
   *(Prüfung: Welches Projekt oder welches visuelle Merkmal hat sich verankert?)*
