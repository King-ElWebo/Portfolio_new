# Motion Language & Interaction Architecture

> **Zweck**: Festlegung der Animationsprinzipien, Übergänge, Scroll-Mechaniken, Shader-Interaktionen und Performance-Leitlinien.  
> **Source of Truth**: Interaktions-, Animations- & Motion-Richtlinien  
> **Status**: IN PROGRESS (Hero 3D-Canvas implementiert & pausiert; CSS-Transitions aktiv; Scroll-Libraries als Kandidaten offen)

---

## 1. Motion Principles `[CONFIRMED]`

1. **Bedeutung & Funktion**: Motion dient nie der reinen Selbstdarstellung, sondern führt das Auge, vermittelt Orientierung und unterstützt die redaktionelle Erzählung.
2. **Static First**: Das Interface muss statisch ohne jede Animation vollendet wirken. Motion veredelt das Design, kaschiert aber niemals Schwächen.
3. **Keine Animation um der Library willen**: Es wird nichts animiert, nur weil ein Werkzeug technisch verfügbar ist.
4. **Respekt vor dem Nutzer**: Animationen dürfen niemals den Lesefluss, Formulareingaben oder das schnelle Navigieren blockieren.
5. **Reduced Motion ist Pflicht**: Barrierefreiheit und die Berücksichtigung von Bewegungssensibilität (`@media (prefers-reduced-motion: reduce)`) sind unverhandelbar.
6. **Performance ist Pflicht**: Stabile 60 FPS ohne Ruckler oder Frame-Drops; GPU-beschleunigte Eigenschaften (`transform`, `opacity`).

---

## 2. Hero 3D Computational Point-Cloud Portrait `[STATUS: PAUSED]`

Im Hero wurde ein interaktives 3D-Partikel-Porträt als Signatur-Element auf Basis von WebGL implementiert.

### 2.1 Technische Realisierung (Vorhandener Code in `app/components/portrait/`):
- **Engine**: Three.js (`^0.186.1`) mit `BufferGeometry` und Custom GLSL Vertex- und Fragment-Shadern.
- **Partikel-Daten**: Vorberechnetes Binär-Dataset (`public/assets/portrait-particles.bin`).
- **Beleuchtung**: Echte Chiaroscuro-Studiobeleuchtung mittels 3D-Oberflächennormalen im Shader.
- **Interaktionen**:
  - 2.2s gestaffelte Assembly-Kurve beim initialen Laden.
  - Lebendiger Idle-Microdrift.
  - Sanfte Tiefen- und Wellenperturbation auf Mauszeiger-Bewegung (PointerMove).
  - Nativer Scroll-Tracking-Dissolve: Partikel zerstäuben beim Hineinscrollen in "Selected Work".
  - Performance-Optimierung: `IntersectionObserver` pausiert das Rendering außerhalb des Viewports; `ResizeObserver` steuert DPI/Canvas-Skalierung; dynamische Partikelreduktion auf Mobilgeräten.
  - Barrierefreiheit: Automatischer Fallback bei fehlendem WebGL sowie Deaktivierung dynamischer Drifts bei aktiver Reduced-Motion-Einstellung.

### 2.2 Aktueller Status: PAUSIERT `[PAUSED]`
> **Status**: `PAUSED — awaiting decision on personalized facial geometry`  
> - **Grund**: Das aktuelle Basismesh (Variante A) ist ein generisches 3D-Scan-Modell und ähnelt dem echten Practitioner noch nicht hinreichend.  
> - **Anweisung**: Die weitere Entwicklung am Porträt ist **ausdrücklich pausiert**. Es werden keine Änderungen am Shader- oder Rendering-Code vorgenommen, bis der Nutzer eine Entscheidung über die persönliche Gesichtsgeometrie (z. B. Photogrammetrie/Scan) trifft.  
> - **Lizenzierungsprüfung**: Vor einem öffentlichen Launch muss die Herkunft des aktuellen Basismeshs (Lee Perry Smith Dataset / Infinite-Realities CC-BY) auf Lizenz- und Namensnennungspflichten verifiziert werden.

---

## 3. Signature-Moment: Dark ↔ Cream Transition `[IN IMPLEMENTIERUNG]`

Der Farbumschwung zwischen **Act I (Cinematic Dark)**, **Act II (Warm Editorial Cream)** und **Act III (Cinematic Dark)** ist der zentrale dramaturgische Wendepunkt der Homepage:
- **Aktueller Stand**: Statische Layout-Container in CSS (`.cream-section-wrap`, `.dark-act3-wrap`) mit harten Sektions-Hintergründen.
- **Ziel / Geplante Veredelung**: Ein kontinuierlicher, scroll-gesteuerter Farbübergang (z. B. weicher Gradient-Bridge oder sanfte Hintergrund-Interpolation), der flackerfrei über den Viewport gleitet.

---

## 4. Bibliotheken & Tooling-Strategie für Site-Wide Motion

*Für die seitenweite Motion-Choreografie gilt:*
- **CSS (Transforms & Transitions) `[IMPLEMENTIERT]`**:  
  Aktuell im Einsatz für Menü-Toggles, Buttons, Hover-Zustände und feine Opacity-Transitions.
- **GSAP & ScrollTrigger `[OFFENER KANDIDAT]`**:  
  Starker Kandidat für komplexe, scroll-verknüpfte Sequenzen (z. B. Sticky Project Stacking, Stagger-Reveals), sofern konzeptionell beschlossen. Aktuell **noch nicht installiert**.
- **Lenis `[OFFENER KANDIDAT]`**:  
  Möglicher Kandidat für geschmeidiges Scrollen, bleibt vorerst offen und unverbaut.

> **Regel gegen Redundanz**:  
> Es werden **niemals zwei konkurrierende Bibliotheken für denselben Zweck** eingesetzt. Die Entscheidung für GSAP/Lenis wird erst getroffen, wenn konkrete Scroll-Anforderungen dies rechtfertigen.
