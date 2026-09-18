# Motion Language

> **Zweck**: Festlegung der Animationsprinzipien, Übergänge, Scroll-Mechaniken und Performance-Vorgaben.  
> **Hinweis**: Noch keine finale Motion erfinden; Abschnitte und Rahmenbedingungen vorbereiten.  
> **Source of Truth**: Interaktions- & Animationsrichtlinien

---

## 1. Motion Principles

1. **Inhalt & Story First**: Motion dient nie der reinen Selbstinszenierung, sondern führt das Auge und unterstützt die Erzählung.
2. **Physik & Trägheit**: Bewegungen wirken natürlich, flüssig und wertig; keine ruckartigen oder hektischen Effekte.
3. **Asymmetrie**: Einblendungen dürfen inszeniert und getaktet sein; Ausblendungen erfolgen schnell und unaufdringlich.
4. **Respekt vor dem Nutzer**: Animationen blockieren zu keinem Zeitpunkt das Navigieren, Lesen oder Interagieren.

---

## 2. Page Transitions
- [ ] **TODO**: Konzept für nahtlose Seitenwechsel (z. B. zwischen Home und Case Studies).
- [ ] **TODO**: Dauer und Easing von View Transitions definieren.
- [ ] **TODO**: Erhalt der Scroll-Position und Caching-Verhalten festlegen.

---

## 3. Scroll Behaviour
- [ ] **TODO**: Integration von Lenis Smooth Scrolling evaluieren (sanfte Trägheit ohne Verlust des nativen Scrollgefühls).
- [ ] **TODO**: ScrollTrigger-Setup für abschnittsbezogenes Einblenden und Pinnen von Inhalten.
- [ ] **TODO**: Horizontale oder Sticky-Bereiche für ausgewählte Projekte oder Case-Study-Gallerien.

---

## 4. Text Motion
- [ ] **TODO**: Headline-Reveals (z. B. feines Mask-Reveal per Zeile oder eleganter Fade-Up).
- [ ] **TODO**: Stagger-Intervalle für Textzeilen und Absätze.
- [ ] **TODO**: Zahlen- und Zähler-Animationen für Metriken und Jahre.

---

## 5. Image & Media Motion
- [ ] **TODO**: Parallax-Effekte bei großformatigen Projektbildern (subtiler Geschwindigkeitsunterschied).
- [ ] **TODO**: Curtain- oder Scale-Down-Reveals beim Erreichen des Viewports.
- [ ] **TODO**: Video-Autoplay- und Loop-Verhalten (stets stummgeschaltet, Pause bei Nicht-Sichtbarkeit).

---

## 6. Hover & Pointer Interaction
- [ ] **TODO**: Magnetische Buttons oder dezente Translation in Richtung des Cursors.
- [ ] **TODO**: Cursor-Feedback bei klickbaren Medien (z. B. dezentes "View"-Badge beim Hover über Projektbilder).
- [ ] **TODO**: Sanfte Farbumschwünge und Unterstreichungs-Animationen bei Textlinks.

---

## 7. Dark ↔ Cream Transitions
*Einer der wichtigsten dramaturgischen Übergänge der Website: Der Wechsel zwischen Cinematic Dark und Warm Editorial.*

- [ ] **TODO**: Auslöser definieren (Scroll-Position vs. Abschnittsgrenzen).
- [ ] **TODO**: Technische Umsetzung (CSS-Variablen per GSAP ScrollTrigger tweenen vs. Section-basierter Backdrop-Wechsel).
- [ ] **TODO**: Übergang von Textfarben, Rahmen und Logo-Elementen während des Farbumschwungs ohne Flackern.

---

## 8. Reduced Motion & Accessibility
- [ ] **TODO**: Vollständige Berücksichtigung der Media Query `@media (prefers-reduced-motion: reduce)`.
- [ ] **TODO**: Fallback-Verhalten: Sofortiges Einblenden ohne Translation und ohne Scroll-Verzögerung.
- [ ] **TODO**: Deaktivierung von automatischen Loops oder Parallax für Nutzer mit Bewegungssensibilität.

---

## 9. Performance Rules
- [ ] **TODO**: Ausschließlich GPU-beschleunigte CSS-Eigenschaften animieren (`transform`, `opacity`).
- [ ] **TODO**: Vermeidung von Layout Thrashing und Reflows (`top`, `left`, `width`, `height` niemals animieren).
- [ ] **TODO**: Gezielter Einsatz von `will-change`, ohne Speicherlecks zu erzeugen.
- [ ] **TODO**: Zielmarke: Stabile 60–120 FPS auf modernen Desktop- und Mobilgeräten.
