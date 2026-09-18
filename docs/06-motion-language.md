# Motion Language

> **Zweck**: Festlegung der Animationsprinzipien, Übergänge, Scroll-Mechaniken und Performance-Leitlinien.  
> **Hinweis**: Noch keine finale Motion-Bibliothek fest auswählen oder installieren.  
> **Source of Truth**: Interaktions- & Animationsrichtlinien

---

## 1. Motion Principles `[CONFIRMED]`

1. **Bedeutung & Funktion**: Motion dient nie der reinen Selbstdarstellung, sondern führt das Auge, vermittelt räumliche Orientierung und unterstützt die Erzählung.
2. **Static First**: Das Interface muss statisch ohne jede Animation vollendet wirken. Motion ist eine Veredelung, kein Ersatz für saubere Gestaltung.
3. **Keine Animation um der Library willen**: Es wird nichts animiert, nur weil ein Werkzeug oder ein Effekt technisch verfügbar ist.
4. **Respekt vor dem Nutzer**: Animationen dürfen niemals den Lesefluss oder das schnelle Navigieren blockieren.
5. **Reduced Motion ist Pflicht**: Barrierefreiheit und die Berücksichtigung von Bewegungssensibilität sind verbindliche Standards.
6. **Performance ist Pflicht**: Stabile Bildraten (typischerweise 60 FPS auf geeigneten Geräten) ohne Ruckler oder Frame-Drops.

---

## 2. Bibliotheken & Tooling-Strategie `[WORKING DIRECTION]`

*Es wird vorerst keine Animationsbibliothek installiert oder final festgelegt. Für den späteren Entwicklungsstart gelten folgende Kandidaten:*

- **CSS (Transforms & Transitions)**:  
  Erste Wahl für alle einfachen Hover-Zustände, Button-Reaktionen, Menü-Toggles und subtile UI-Übergänge.
- **GSAP / ScrollTrigger `[KANDIDAT]`**:  
  Starker Kandidat für komplexe, scroll-verknüpfte Sequenzen, Timeline-Choreografien und Pinned-Sections.
- **Lenis `[KANDIDAT]`**:  
  Möglicher Kandidat für sanftes, träges Scroll-Verhalten, sofern es das native Scrollgefühl bereichert und keine Performance-Einbußen verursacht.
- **Three.js / WebGL / Canvas `[NUR BEI BEDARF]`**:  
  Ausschließlich dann, wenn eine spezifische visuelle Idee (z. B. ein interaktives Hero-Asset im Lab) dies rechtfertigt. Kein WebGL als bloßes Gimmick.

> **Regel gegen Redundanz**:  
> Es werden **niemals mehrere konkurrierende Bibliotheken für denselben Zweck** eingeplant oder installiert (z. B. nicht gleichzeitig Framer Motion und GSAP für denselben Animationsbereich).

---

## 3. Signature-Moment: Dark ↔ Cream Transition `[CONFIRMED KONZEPT / TODO TECHNIK]`

Der Übergang zwischen **Cinematic Dark** und **Warm Editorial** ist der zentrale dramaturgische Wendepunkt der Homepage:
- **Konzept**: Beim Hineinscrollen in Act II (About / Trust) wandelt sich der visuelle Hintergrund und die Typografie nahtlos von cineastischer Dunkelheit zu warmem, hellem Editorial-Papier.
- **Technik `[TODO]`**: Evaluierung der performantesten Methode (CSS Custom Properties per Scroll-Position tweenen vs. Section-basierter Backdrop-Wechsel).
- **Anforderung**: Absolut flackerfreier Farbumschlag aller Texte, Icons und Rahmen.

---

## 4. Scroll Behaviour & Text Motion `[TODO]`

- [ ] Scroll-verknüpfte Parallax-Geschwindigkeiten bei Medien
- [ ] Text-Reveals (Mask-Up oder feiner Fade für Headlines)
- [ ] Staggering von Projektkarten bei Eintritt in den Viewport

---

## 5. Reduced Motion & Barrierefreiheit `[CONFIRMED VORGABE]`

- Vollständige Unterstützung von `@media (prefers-reduced-motion: reduce)`.
- Bei aktivem Reduced-Motion-Modus:
  - Sofortiges Einblenden von Inhalten ohne Translation/Bewegung.
  - Deaktivierung aller Parallax- und Trägheitseffekte.
  - Keine automatischen Video-Loops, die Irritationen auslösen könnten.

---

## 6. Performance-Leitlinien `[CONFIRMED]`

- Bevorzugte Animation von GPU-beschleunigten Eigenschaften (`transform`, `opacity`).
- Layout-auslösende Eigenschaften (`top`, `left`, `width`, `height`, `margin`) nach Möglichkeit vermeiden.
- Gezielter, temporärer Einsatz von `will-change` während aktiver Übergänge.
- Keine Memory Leaks durch unbereinigte Event-Listener oder Scroll-Observer.
