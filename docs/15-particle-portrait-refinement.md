# WILK — Verfeinerung des Partikel-Porträts

Stand: 2026-10-11. Lokale Implementierung und Prüfung, kein Deployment/Commit/Push.

Das bestehende Variant-A-Porträt wurde verfeinert. Homepage-Layout, Typografie,
Navigation, Work-Archiv, Case Studies und Projektdaten wurden dabei nicht geändert.
Die bereits vorhandenen Änderungen im Arbeitsverzeichnis sind erhalten.

## Ausgangszustand und Ursachen

- Integration: `Hero` → `HeroPortraitArtifact` → `ParticlePortraitCanvas` →
  `ParticlePortraitRenderer`, GPU-Point-Cloud mit Custom-GLSL.
- Aktives Ausgangsasset: `public/assets/portrait-particles.bin`, 38.071 Punkte,
  13 Float32-Werte je Punkt, aus dem bestehenden Variant-A-Generator.
- `scripts/build_refined_variants.py` nennt Lee Perry Smith als Basismesh.
  Augen, Lippen, Wangen, Kiefer und Haarpunkte wurden früher heuristisch verändert.
  Diese Veränderungen sind keine überprüfte persönliche Rekonstruktion.
- Helle, große Punktkerne und stark angehobenes Licht nivellierten die Konturen.
  Reduced Motion verwendete einen mehr als doppelt so großen Größenfaktor.
- Mobile Draw-Ranges nahmen nur den Anfang des Datasets: Oberfläche zuerst,
  Haarpunkte später. Dadurch gingen Haare und Silhouette verloren.
- Cursor-Einstieg aus `(999,999)` und unbegrenzte Geschwindigkeiten konnten
  starke Verschiebungen auslösen; konfigurierte Einflussstärke wurde ignoriert.
- Offscreen blieb eine RAF-Schleife aktiv. Tab-Sichtbarkeit wurde nicht beachtet.
  Kontextwiederherstellung erzeugte neue Renderer, Szenen und Downloads.
- Extra WebGL-Testkontexte, nicht abbrechbare Downloads, Cache-Busting und
  `forceContextLoss()` erschwerten Strict-Mode-Replay und Ressourcenmanagement.
- Der ursprüngliche SVG-Fallback bestand aus wenigen Punkten und einer Lichtfläche.
  `touch-action: none` blockierte native Touch-Gesten auf dem Portrait.

## Geometrie und Partikel

Alle neuen XYZ-Koordinaten sind bitgleich aus dem vorhandenen Dataset übernommen.
Es wurde keine Anatomie verschoben und kein anderes generisches Gesicht eingesetzt.

Der lokale Generator [refine_portrait.py](../scripts/refine_portrait.py) benötigt
NumPy und Pillow, liest ausschließlich das bestehende öffentliche Punktasset und:

1. schätzt Oberflächennormalen über die Kovarianz benachbarter Punkte (lokale PCA);
2. bevorzugt vorhandene Feature-Gewichte und lokale Krümmung beim Entfernen
   dicht gedrängter Punkte, ohne zusätzliche Details zu erfinden;
3. ordnet die verbleibenden Punkte mit festem Seed um, damit reduzierte Draw-Ranges
   Gesicht, Haare, Hals und Randpunkte gemeinsam enthalten;
4. reduziert Randstaub, vereinheitlicht feine Größen und verwendet gerichtetes
   Haupt-/Fülllicht mit zurückhaltenden Champagnerpunkten;
5. erzeugt ein statisches PNG aus derselben generischen Punktgeometrie.

Ergebnis: 29.803 Punkte, 16 Float32-Werte einschließlich Normalen; 1.907.392 Bytes
statt 1.979.692 Bytes. Desktop zeichnet alle Punkte, Tablet maximal 22.000,
Mobile maximal 14.000. Die räumliche Auswahl ist deterministisch. Normalschätzung
und Krümmung sind Näherungen eines Punktdatensatzes, keine Scan-Messdaten.

Augenhöhlen, Nasensteg, Lippen und Kiefer werden durch Licht und feinere Punktzeichnung
besser lesbar. Die tatsächliche persönliche Gesichtsform ist dadurch nicht verbessert.

## Animation und Interaktion

- Assembly: 2,8 Sekunden sichtbare Animationszeit, kurzer ruhiger Beginn,
  gestaffelte Feature-Ankunft aus einer nahe liegenden Tiefenebene, sanftes Auslaufen.
  Kein Vortex und kein weit auseinanderliegender Explosionsstart.
- Idle: langsame kohärente Oberflächenbewegung statt dreifacher Noise-Auswertung,
  sehr kleine Tiefenatmung und sanfte Lichtbewegung; Gesicht bleibt stabil.
- Pointer: lokaler Radius 0,30, konfigurierter Tiefenhub 0,028, Schutz der Feature-
  Anker, begrenzte Geschwindigkeit, zeitabhängige Dämpfung und sanfte Rückkehr.
- Touch: keine Hover-Simulation; ruhiges Idle und native Scroll-Gesten.
- Scroll: nachvollziehbare, deterministische Drift und Ausblendung mit weichem
  Tracking. Rückwärts-Scrollen stellt die Figur wieder her. Auf gestapelten
  Mobilansichten beginnt die Auflösung erst, nachdem das Portrait sichtbar wurde.
- Reduced Motion: sofort vollständige Figur, identische Punktgröße/Lichtstellung,
  keine räumliche Animation. Scroll blendet nur aus; RAF läuft ereignisgesteuert.

## Laufzeit und Prüfungen

Three.js wird nach der Hydration separat importiert. Ein unveränderlicher
InterleavedBuffer ersetzt vier zusätzliche CPU-Attributkopien. Das Punkt-Rendering
benötigt einen Draw Call, eine Geometrie und ein Shaderprogramm, ohne Texturen oder
Postprocessing. Die GPU-Attributdaten belegen rund 1,82 MiB; Framebuffer und
Browser-/Treiberkosten kommen hinzu.

DPR-Obergrenzen: Desktop 1,75, Tablet 1,5, Mobile 1,25. Mobile zeichnet höchstens
30 Bilder pro Sekunde. Außerhalb des Viewports und bei verborgenem Dokument werden
keine Renderframes geplant. Resize/DPR-Wechsel, echte Kontextwiederherstellung,
live geänderte Bewegungseinstellungen und Strict Mode sind berücksichtigt.

Prüfungen durch [capture_portrait_qa.mjs](../scripts/capture_portrait_qa.mjs), mit
bereits lokal verfügbarem Playwright, ohne Paketinstallation/Testframework:

- Desktop 1440×1000, Tablet 820×1180, Mobile 390×844 mit DPR 3.
- Assembly, vollständige Figur, Idle, Pointer, Pointer-Rückkehr,
  Scroll-Auflösung und Rückwärts-Scrollen visuell geprüft.
- Offscreen- und Document-Hidden-Pause: keine weiteren GPU-Draws.
- Reduced Motion: keine fortlaufenden GPU-Draws; Live-Umschaltung setzt fort.
- `WEBGL_lose_context`: Fallback während Verlust, funktionierende Wiederherstellung.
- Kein WebGL und fehlerhaftes Binärasset: vollständiger statischer Fallback.
- Dispose während Download und sofortiger Canvas-Wiederverwendung: funktionierend.
- Echtes React Strict Mode: Status `ready`, anschließend erfolgreich unmounted.
- Geometrien nach Dispose: 0; kein ausstehender RAF; Cursor-Geschwindigkeit ≤1,5.
- Alle neuen Positionen stammen aus dem Original; Daten endlich, Normalen normiert.
- Normale Testansichten: keine JavaScript-Fehler oder Anwendungswarnungen. Erwartete
  Warnungen bei absichtlich ausgelösten Fehlern und Screenshot-Treiberhinweise sind
  davon getrennt.
- Impeccable-Detektor für TSX und Portrait-CSS: keine Befunde.
- `npm run typecheck`: erfolgreich, Exit 0.
- `npm run build`: erfolgreich, Exit 0; weiterhin Warnung zum Three.js-Chunk
  (543,10 kB minifiziert / 135,38 kB gzip), jetzt nachgeladen.

Kurze Desktop-Stichproben im lokalen Headless-Chromium: ungefähr 16,7–18,3 ms
zwischen GPU-Draw-Aufrufen ohne Screenshot während der Messung. Screenshot-/Video-
Aufnahmen erhöhen die gemessenen Abstände. Das ist kein GPU-Timer-Benchmark und
keine belastbare Leistungszusage für echte mobile Hardware.

## Persönliche Ähnlichkeit und verbleibende Arbeit

Die beiden privaten Referenzfotos `front.jpg` und `detail.jpg` sind vorhanden und
lokal visuell geprüft. Sie enthalten unterschiedliche Perspektiven, Beleuchtungen
und Gesichtsausdrücke. Mit den vorhandenen Tools gibt es keinen validierten Weg,
daraus exakte Schädel-, Augen-, Nasen- oder Kiefertiefen zu rekonstruieren.
**Persönliche Ähnlichkeit bleibt durch die generische Quellgeometrie begrenzt.**

Für ein erkennbares persönliches Portrait wird ein lokal geprüfter persönlicher
Scan oder ein aus konsistenten Mehrwinkelaufnahmen rekonstruiertes Mesh benötigt.
Front-, Dreiviertel- und Profilansichten bei neutralem Ausdruck sollten die
Geometrie validieren. Haare benötigen besondere Prüfung, weil eine reine
Oberflächenrekonstruktion feine Strähnen schlecht abbildet. Ein GLB/PLY mit
brauchbaren Normalen würde die bestehende Punktpipeline speisen; der Renderer
kann erhalten bleiben. Ein 2D-Tiefenproxy wäre als Näherung zu deklarieren.

Es wird kein bestimmtes Scanprodukt oder externer Dienst festgelegt. Rohfotos und
private Scans bleiben außerhalb von `public/` und Git; eine Veröffentlichung
persönlicher abgeleiteter Assets benötigt eine eigene Freigabe. Die bestehende
Lizenz-/Attributionsfrage des generischen Basismeshs bleibt offen.

## Lokale visuelle Belege

Aufnahmen unter `qa-results/portrait/` sind absichtlich Git-ignoriert.

| Zustand | Aufnahme |
|---|---|
| Vorher, Desktop | [before-desktop.png](../qa-results/portrait/before-desktop.png) |
| Vorher, Nahansicht | [before-face.png](../qa-results/portrait/before-face.png) |
| Vorher, Mobile | [before-mobile-face.png](../qa-results/portrait/before-mobile-face.png) |
| Ruhiger Beginn | [after-initial.png](../qa-results/portrait/after-initial.png) |
| Assembly | [after-assembly.png](../qa-results/portrait/after-assembly.png) |
| Fertige Figur | [after-desktop.png](../qa-results/portrait/after-desktop.png) |
| Nahansicht | [after-face.png](../qa-results/portrait/after-face.png) |
| Idle | [after-idle.png](../qa-results/portrait/after-idle.png) |
| Pointer | [after-pointer.png](../qa-results/portrait/after-pointer.png) |
| Pointer-Rückkehr | [after-pointer-return.png](../qa-results/portrait/after-pointer-return.png) |
| Scroll-Auflösung | [after-scroll.png](../qa-results/portrait/after-scroll.png) |
| Scroll-Rückkehr | [after-scroll-return.png](../qa-results/portrait/after-scroll-return.png) |
| Mobile | [after-mobile-visible.png](../qa-results/portrait/after-mobile-visible.png) |
| Tablet | [after-tablet.png](../qa-results/portrait/after-tablet.png) |
| Reduced Motion | [after-reduced.png](../qa-results/portrait/after-reduced.png) |
| Fallback | [after-fallback.png](../qa-results/portrait/after-fallback.png) |
| Kontext wiederhergestellt | [after-context-restored.png](../qa-results/portrait/after-context-restored.png) |
| Mess-/Prüfdaten | [qa-report.json](../qa-results/portrait/qa-report.json) |
| Bewegung, 18 Sekunden | [portrait-motion.webm](../qa-results/portrait/portrait-motion.webm) |

Git-Prüfung: Die vorbestehenden bearbeiteten Dateien sind bytegleich erhalten;
im Entscheidungslog wurde ausschließlich DEC-022 ergänzt. Der allgemeine
`git diff --check` meldet eine bereits vorhandene Leerzeile am Ende von
`app/app.css`; diese Datei blieb bewusst unangetastet.

## Geänderte / neue Dateien dieser Aufgabe

- `app/components/portrait/ParticlePortraitCanvas.tsx`
- `app/components/portrait/ParticlePortraitRenderer.ts`
- `app/components/portrait/portraitShaders.ts`
- `app/components/portrait/types.ts`
- `app/components/portrait/portrait.css` (neu, lokal scoped; `app/app.css` unverändert)
- `public/assets/portrait-sculpture.bin` (neu)
- `public/assets/portrait-sculpture-meta.json` (neu, Herkunft/Hash dokumentiert)
- `public/assets/portrait-sculpture-static.png` (neu, generische Punkte als Fallback)
- `scripts/refine_portrait.py` (neu)
- `scripts/capture_portrait_qa.mjs` (neu)
- `docs/13-decision-log.md` (nur DEC-022 ergänzt; vorherige Änderungen erhalten)
- `docs/15-particle-portrait-refinement.md` (neu)

Die ursprünglichen Binärvarianten und `scripts/head_scan.glb` sind unverändert.
