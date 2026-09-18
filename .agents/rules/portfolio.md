# Antigravity Workspace Rule: Portfolio

> **Scope**: Repository-spezifische Richtlinie für Antigravity in diesem Workspace.  
> **Referenz**: Siehe primär [`/AGENTS.md`](../../AGENTS.md) und [`/docs/`](../../docs/).

---

## 🧭 Kernregeln für Antigravity

1. **AGENTS.md ist oberste Arbeitsanweisung**:
   Lies vor substanziellen Arbeiten immer [`AGENTS.md`](../../AGENTS.md) und die relevanten Dateien in [`/docs/`](../../docs/).
2. **Klares Statussystem respektieren**:
   Unterscheide stets strikt zwischen `CONFIRMED`, `WORKING DIRECTION`, `NEEDS CONFIRMATION`, `TODO`, `PLACEHOLDER`, `MISSING` und `REJECTED`. Erhebe unbestätigte Ideen niemals stillschweigend zu Vorgaben.
3. **Keine Architektur- und Design-Erfindungen**:
   Wenn Framework, Deployment-Adapter, Schriftarten oder Datenmodelle nicht in `/docs` dokumentiert sind, frage den Nutzer oder präsentiere Optionen, anstatt willkürliche Fakten zu schaffen.
4. **Keine Code-Implementierung in Planungsphasen**:
   Plane, strukturiere und dokumentiere, wenn Planung gefordert ist. Schreibe keinen UI- oder Anwendungs-Code, solange keine explizite Implementierungsfreigabe vorliegt.
5. **Keine spekulativen Verzeichnisse oder Abhängigkeiten**:
   Erstelle keine leeren App-Ordner (`app/`, `src/`) und installiere keine npm-Packages ohne ausdrückliche Bestätigung.
6. **Schlankes Skill-Set nutzen**:
   Wähle stets die kleinste sinnvolle Skill-Kombination (maximal 2–3) passend zur aktuellen Teilaufgabe gemäß [`docs/11-agent-workflow.md`](../../docs/11-agent-workflow.md).
7. **Verifikation vor Abschluss**:
   Überprüfe vor jeder Fertigmeldung die tatsächlichen Dateiänderungen, Git-Status und Konsistenz aller internen Referenzen.
