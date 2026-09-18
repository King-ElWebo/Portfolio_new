# AI Agent Workflow & Skill Orchestration

> **Status**: CONFIRMED VORGABE  
> **Source of Truth**: Rollenverteilung für KI-Agenten, Skill-Auswahl & Tooling-Richtlinien

---

## 🤖 Primäre Rollenverteilung

Dieses Projekt wird kollaborativ durch spezialisierte KI-Agenten und den Entwickler aufgebaut:

- **Antigravity**: Primärer interaktiver Entwicklungs- und Design-Agent (Pair Programming, Konzeption, geführte Implementierung).
- **Codex**: Sekundärer Implementierungs-, Review- und Architektur-Agent (Hintergrund-Aufgaben, Code-Reviews, Refactorings).
- *(Weitere spezialisierte Subagents können nach Bedarf punktuell hinzugezogen werden).*

---

## 🎯 Die eiserne Skill-Regel: Minimalprinzip `[CONFIRMED]`

> [!WARNING]
> **NIEMALS alle Skills gleichzeitig aktivieren oder laden!**  
> Die Aktivierung übermäßig vieler Skills führt zu Kontext-Überladung, widersprüchlichen Anweisungen und generischem Code.  
> **Es wird immer die kleinste sinnvolle Kombination für die spezifische Teilaufgabe gewählt.**

---

## 🧩 Phasenbezogene Skill-Zuordnung

| Phase | Primäre Skills & Tools | Zweck & Fokus |
| :--- | :--- | :--- |
| **1. Strategy / Ideation** | `brainstorming` | Strukturierung von Ideen, Hinterfragen von Anforderungen |
| **2. Research** | `firecrawl-search`, `firecrawl-scrape`, `firecrawl-website-design-clone` | Gezielte Recherche offizieller Dokumentation & Referenzen |
| **3. Visual Exploration** | `frontend-design`, `ui-ux-pro-max`, `Stitch MCP` | Entwurf von Layouts, typografischen Hierarchien & Varianten |
| **4. Anti-Generic / Art-Direction Review** | `design-taste-frontend` | Schutz vor generischem AI-/SaaS-Slop und Modetrends |
| **5. Design Refinement / Quality** | `Impeccable` | Kritische Design-Reviews, Polish & Beseitigung visueller Komplexität |
| **6. Microinteractions** | `emil-design-eng` | Feinschliff von Interaktionsdetails und haptischem Feedback |
| **7. Motion** | `cinematic-gsap-lenis-motion-system`, `gsap-scrolltrigger` *(gsap-react / gsap-performance nur bei konkreter Notwendigkeit)* | Choreografie von Scroll-Sequenzen und Performance-Tuning |
| **8. Engineering** | `react-best-practices`, `composition-patterns` | Saubere Komponentenarchitektur & TypeScript-Disziplin |
| **9. Final Quality & QA** | `design-review`, `typography-audit`, `ui-ux-audit`, `web-accessibility`, `Impeccable`, `verification-before-completion` | Abschließendes Auditing vor Release & Fertigmeldung |

---

## 💎 Impeccable: Design-Quality & Refinement `[CONFIRMED]`

`Impeccable` ist als spezialisiertes Werkzeug für **Design-Kritik, Veredelung und visuelle Qualität** in das Projekt integriert.

### Einsatzlogik für Impeccable:
- **Kein Einsatz während des frühen Brainstormings**: In ersten Ideenrunden wird Impeccable **nicht automatisch** hinzugeschaltet.
- **Einsatz erst bei konkreten Entwürfen**: Sobald eine visuelle Richtung oder ein konkreter UI-Entwurf vorliegt, wird Impeccable aktiviert für:
  - **Design Critique**: Aufspüren von Schwachstellen, unsauberer Ausrichtung oder visuellen Brüchen.
  - **Refinement / Polish**: Typografischer Feinschliff, Abstands-Präzision und Rhythmus.
  - **Entrümpelung**: Reduktion unnötiger visueller Komplexität und Zierde.
  - **Abschließende UI-/Design-Audits**: Überprüfung vor der finalen Freigabe.
- **Motion-Funktionen**: Dürfen nur dann eingesetzt werden, wenn die Animation zuvor konzeptionell begründet wurde.

> [!IMPORTANT]
> **Impeccable-Prinzip**:  
> Impeccable agiert als **Reviewer und Refinement-Spezialist**.  
> Es ersetzt **weder** den Creative Brief, die Art Direction, das Design System, noch Nutzerentscheidungen oder Source-of-Truth-Dokumente.  
> Impeccable darf **keine offenen architektonischen oder gestalterischen Entscheidungen stillschweigend finalisieren**.

---

## 🧵 Google Stitch MCP: Design Exploration Tooling `[CONFIRMED]`

Google Stitch MCP ist als externes Design-Exploration-Werkzeug angebunden.

### Geeignete Einsatzbereiche:
- Generierung alternativer **Homepage-Kompositionsvarianten**
- Erprobung unterschiedlicher **Hero-Varianten**
- Visuelle **Layout-Exploration** für Case Studies
- Testen alternativer Ausprägungen der Art Direction (Cinematic, Editorial, Hybrid)
- Schnelle Erzeugung interaktiver **UI-Prototypen**

### Klare Befugnisgrenzen für Stitch MCP:
- **Stitch-Outputs sind NIEMALS automatisch final**: Sie dienen als Diskussions- und Entscheidungsgrundlage.
- **Stitch darf**:
  - Bestehende, bestätigte Vorgaben aus `/docs` interpretieren.
  - Mehrere visuelle Varianten zur Auswahl durch den Nutzer erzeugen.
- **Stitch darf NICHT**:
  - ❌ Architekturentscheidungen treffen.
  - ❌ Produktanforderungen oder Briefing-Inhalte eigenmächtig verändern.
  - ❌ Runtime-Dependencies im Codebase vorgeben (Stitch ist reines Dev-Tooling).
  - ❌ Noch offene Projektentscheidungen als bestätigt behandeln.

> **Priorität**: Die Dokumentation in `/docs` steht strikt über allen Stitch-Outputs.

---

## 🔄 Beispielhafter Portfolio-Design-Workflow

Um das Minimalprinzip in der Praxis einzuhalten, folgt der Entwurfsprozess diesem linearen Ablauf:

```text
1. Ideation & Struktur
   └─ brainstorming

2. Visuelle Grobentwürfe
   └─ frontend-design + ui-ux-pro-max + Stitch MCP

3. Nutzer-Feedback & Richtungsentscheidung
   └─ Nutzer wählt oder kombiniert eine Richtung

4. Detailkritik & Vereinfachung
   └─ Impeccable Critique

5. Iteration & Ausarbeitung
   └─ Design-Anpassung

6. Feinschliff & Polish
   └─ Impeccable Polish

7. Finales Quality Gate
   └─ design-review + web-accessibility + typography-audit + verification-before-completion
```

---

## 🚫 Übergreifende No-Gos für Agenten

1. **Keine stillschweigenden Entscheidungen**: Fehlende Entscheidungen zu Frameworks, Design, Schriften oder Content niemals selbst erfinden, sondern als Frage an den Nutzer formulieren.
2. **Keine spekulative Code-Erstellung**: Wenn die Aufgabe eine Planungs- oder Dokumentationsaufgabe ist, darf kein Produktiv-Code geschrieben oder installiert werden.
3. **Keine Secrets in Repositories**: Niemals API-Keys, Token oder Zugangsdaten in Dateien hinterlegen.
