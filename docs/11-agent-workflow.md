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
> **Es wird immer die kleinste sinnvolle Kombination für die spezifische Aufgabe gewählt.**

---

## 🧩 Phasenbezogene Skill-Zuordnung

| Phase | Primäre Skills | Zweck & Fokus |
| :--- | :--- | :--- |
| **1. Strategy & Ideation** | `brainstorming` | Strukturierung von Ideen, Hinterfragen von Anforderungen |
| **2. Research & Benchmarks** | `firecrawl-search`, `firecrawl-scrape` | Gezielte Recherche offizieller Dokumentation & Referenzen |
| **3. Visual Direction** | `frontend-design`, `ui-ux-pro-max` | Gestaltung von Layouts, Typografie und Farbwelten |
| **4. Anti-Generic Review** | `design-taste-frontend` | Schutz vor generischem AI-/SaaS-Slop und Template-Mustern |
| **5. Microinteraction Thinking** | `emil-design-eng` | Feinschliff von Interaktionsdetails und haptischem Feedback |
| **6. Motion & Transitions** | `cinematic-gsap-lenis-motion-system`, `gsap-scrolltrigger` *(nur bei Bedarf)* | Choreografie von ScrollTrigger-Sequenzen und Lenis |
| **7. Engineering & Code** | `react-best-practices`, `composition-patterns` | Saubere Komponentenstrukturen und TypeScript-Disziplin |
| **8. Quality & Auditing** | `design-review`, `typography-audit`, `ui-ux-audit`, `web-accessibility` | Systematische Überprüfung vor dem Release |
| **9. Process & QA** | `writing-plans`, `verification-before-completion` | Strukturierte Planung und Verifikation vor Aufgabenabschluss |

### Praxisbeispiele für schlanke Kombinationen:
- **Design Exploration**:  
  `brainstorming` → `frontend-design` → `ui-ux-pro-max` *(maximal 2–3 Skills)*.
- **Frontend-Implementierung**:  
  Framework-Dokumentation → `react-best-practices` *(keine gleichzeitigen 5 Motion-Skills)*.
- **Accessibility & Quality Review**:  
  `web-accessibility` → `verification-before-completion`.

---

## 🛠️ Design-Tooling (Nicht-Runtime)

### 1. Stitch MCP
- **Einsatzbereich**: Design-Exploration, visuelle Prototypen, Erprobung alternativer Homepage-Kompositionen.
- **Status**: **Reines Entwicklungs- und Design-Tool**, absolut **keine Runtime-Dependency** im späteren Codebase.
- **Nutzung**: Generierung und Gegenüberstellung von Layout-Varianten vor der Code-Erstellung.

### 2. Nano Banana / Bildgenerierung
- **Einsatzbereich**: Visuelle Assets, Moodboards, Editorial-Hintergründe, Texturen und Concept-Mockups.
- **Status**: Asset-Produktion. Hat keinerlei Einfluss auf die Anwendungs- oder Code-Architektur.

---

## 🚫 No-Gos für Agenten

1. **Keine stillschweigenden Entscheidungen**: Fehlende Entscheidungen zu Frameworks, Design oder Content niemals selbst erfinden, sondern als Frage an den Nutzer formulieren.
2. **Keine spekulative Code-Erstellung**: Wenn die Aufgabe eine Planungs- oder Dokumentationsaufgabe ist, darf kein Produktiv-Code geschrieben oder installiert werden.
3. **Keine Secrets in Repositories**: Niemals API-Keys, Token oder Zugangsdaten in Dateien hinterlegen.
