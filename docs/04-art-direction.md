# Art Direction & Visual Identity

> **Zweck**: Definition der visuellen Tonalität, Stimmungen, Kontraste, Design-Explorationen und des freigegebenen visuellen Baselines.  
> **Source of Truth**: Visuelle Identität, Ästhetik & Art Direction  
> **Status**: CONFIRMED BASELINE (D3.1 — Visual Polish freigegeben und in React implementiert)

---

## 🎭 Leitidee: *Cinematic Dark × Warm Editorial* `[CONFIRMED]`

Die visuelle Identität basiert auf dem bewusst gestalteten Wechselspiel zweier gegensätzlicher, harmonierender Welten in einem 3-Akt-Rhythmus:

1. **Act I & III: Cinematic Obsidian Dark (Fokus & Immersion)**:  
   Tiefes, warmes Dunkel (`#0d0e11`), das an Kinoatmosphäre und ruhige Galerieräume erinnert. Verleiht den Projekten, Shaders und interaktiven Elementen Leuchtkraft, Ernsthaftigkeit und eine fokussierte Bühne.
2. **Act II: Warm Editorial Cream / Paper (Menschlichkeit & Intellekt)**:  
   Warme Papiertöne (`#f6f3ec`), die Ruhe, Zugänglichkeit und redaktionelle Tiefe vermitteln. Schafft den idealen Raum für Vertrauen, About, Philosophie und Leistungsbeschreibung.

---

## 🏛 Bestätigte Gestaltungsprinzipien `[CONFIRMED]`

- **Statische Exzellenz**: Das Layout muss bereits ohne eine einzige Zeile JavaScript oder Animation absolut vollendet und lesbar wirken.
- **Große, redaktionelle Typografie**: Selbstbewusste Headlines mit starkem Kontrast zwischen klassischer Eleganz und technischer Präzision.
- **Farbtöne mit Tiefe & Wärme**: Organische Obsidian-Töne statt hartem `#000000`; feines Cream/Paper statt klinischem `#FFFFFF`. Warme Gold-/Bronze-Akzente (`#ebbf87`) als subtile Lichtführung.
- **Projekte im Mittelpunkt**: Die Arbeit ist der Star; das Interface hält sich vornehm zurück und dient als ruhiger Rahmen.
- **Persönliche Glaubwürdigkeit**: Design + Development in einer Person, greifbar durch authentische Haltung ohne Marketing-Floskeln.

---

## 🚫 Konsequent abgelehnte Ästhetik (Anti-Patterns) `[REJECTED]`

Folgende Stile und Elemente sind projektweit strikt untersagt:
- ❌ **Keine generische AI- / SaaS-Ästhetik** (lila/blaue Standard-Gradients, austauschbare Vektor-Illustrationen).
- ❌ **Keine sinnlosen Bento-Grids** (keine krampfhaft in kleine Kästchen zerlegte Informationsarchitektur).
- ❌ **Keine dekorativen Gradient-Orbs** oder unmotivierter Neumorphismus/Glassmorphism.
- ❌ **Keine Skill-Prozentbalken** („CSS 90%“, „Figma 95%“) oder Gamification-Badges.
- ❌ **Kein Neon-Cyberpunk- / Matrix-Grün-Look**.

---

## 🧭 Historie der Design-Exploration & Genehmigte Baseline

Die Design-Findung wurde systematisch über Google Stitch MCP in mehreren Iterationsstufen durchgeführt:
1. **Richtung A (Cinematic / Immersive)**: Starker Fokus auf Bildgewalt und dunkle Atmosphären.
2. **Richtung B (Editorial / Refined)**: Typografie- und weißraumfokussierter Magazin-Rhythmus.
3. **Richtung C (Hybrid)**: Ausgewogene Symbiose aus dunklem Hero und hellem Lesebereich.
4. **Verfeinerungsstufen D, D2, D3**: Schärfung des 3-Akt-Rhythmus und der Komponenten-Hierarchie.
5. **Freigabe: D3.1 — Visual Polish `[CONFIRMED BASELINE]`**:
   - **Stitch Project ID**: `9864955914556862585`
   - **Stitch Screen ID**: `projects/9864955914556862585/screens/6ee11b79164049f5885ec647cf18a32a`
   - **Status im Code**: Der aktuelle React-Code in `app/components/` und `app/app.css` spiegelt die visuelle Struktur dieser freigegebenen Baseline wider.

> [!IMPORTANT]
> **D3.1 ist die visuelle Implementierungs-Baseline, nicht der in Stein gemeißelte Endzustand.**  
> Es wird strikt unterschieden zwischen:
> - **Freigegebener visueller Struktur**: 3-Akt-Dramaturgie, Hero-Aufteilung, 16:9 und 4:8 Projekt-Grid, Editorial Capabilities, Practitioner-Block, Contact-Box.
> - **Temporären Implementierungsentscheidungen**: Vorläufige Stitch-Demo-Texte, generische Basismesh-Partikel.
> - **Arbeitswerten (Working Design Values)**: Die in `app.css` hinterlegten Farb- und Schrift-Tokens.
> - **Noch offenen Detailentscheidungen**: Finale Typografie-Lizenzierung, Feinschliff von Zeilenabständen und individuelle Case-Study-Art-Direction.

---

## 📌 Offene gestalterische Entscheidungen `[OPEN / TODO]`

- [ ] **Typografie-Lizenzierung & Fonts**: Aktuell Google Fonts (`Playfair Display`, `Inter`, `JetBrains Mono`). Prüfung, ob ein kommerzieller Editorial-Schnitt erworben wird oder dieser Webfont-Stack final verbleibt.
- [ ] **Projektspezifische Art Direction für Case Studies**: Jede Case Study erhält eine individuelle visuelle Tonalität (passend zum Projektkontext) statt eines monotonen Einheitsrasters.
- [ ] **Authentisches Porträt-Material**: Auswahl und Color-Grading des realen Fotomaterials in `assets/portraits/private/` für den Practitioner-Block.
- [ ] **Hero Partikel-Porträt**: Aktuell **PAUSIERT**. Die Entscheidung über die authentische 3D-Gesichtsgeometrie wird separat getroffen.
