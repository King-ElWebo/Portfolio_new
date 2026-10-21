# Persönliches Foto-Partikelporträt

Stand: 2026-10-21. Nutzerfreigabe: DEC-033. Lokale Umsetzung; kein Commit,
Push, Deployment, externer Bildupload oder kostenpflichtiger Scan.

## Form und Herkunft

Das vorhandene `assets/portraits/private/front.jpg` liefert die fotografische
Silhouette, Position der Gesichtszüge und Tonwerte. Es ist die erste vorhandene
Vorlage mit unverdecktem Gesicht. Das Profilfoto am Telefon bleibt unverändert.

`scripts/build_photo_portrait.py` liest das private Foto lokal mit den bereits
vorhandenen NumPy-/Pillow-Werkzeugen. Es segmentiert den warmen Kopf und dunklen
Oberkörper gegenüber der kühlen Wand anhand tatsächlicher Bildfarben. Eine
zusammenhängende Rastermaske erhält die fotografische Silhouette, die Schultern
laufen sanft aus. Es gibt keine ellipsoidale Kopfform, keine neuen Gesichtszüge,
keine veränderten Gesichtsproportionen und keine KI-Rekonstruktion.

Ein deterministisch versetztes Raster verteilt die Punkte über das Foto.
Fotografische Helligkeit steuert Dichte, Deckkraft und feine Größenvariation.
Die abschließende gemischte Reihenfolge erhält ein zusammenhängendes Gesicht
auch bei reduzierten Draw-Ranges. Der bestehende Bildwinkel und die begrenzte
Auflösung der Vorlage bleiben sichtbar; ein besseres unverdecktes Foto kann
die Detailtreue später verbessern. Die Freistellung ist auf dieses konkrete
Foto abgestimmt und muss bei einem Austausch neu geprüft werden.

Alle ruhenden Z-Koordinaten sind exakt null. Dies ist ein persönliches
2D-Fotopunktbild, kein Scan und kein frei drehbares 3D-Modell.

## Darstellung und Bewegung

- Bestehender Three.js-Renderer, Shader und React-Integration; keine neue Library.
- Orthografische Kamera erhält die fotografischen Proportionen ohne Perspektivverzerrung.
- 2,4 Sekunden Aufbau aus kleinen benachbarten Verschiebungen, gestaffelte Sichtbarkeit.
- Sehr geringe Bewegung innerhalb der Bildebene; keine Kopfrotation oder Gesichtsverformung.
- Mausreaktion im Radius 0,28 mit glattem Abfall und begrenzter Verdrängung von 0,045 Welteinheiten.
- Reversible Streuung und Ausblendung beim nativen Scrollen.
- Touch bleibt scrollbar, ohne simulierten Hover. Reduced Motion zeigt sofort die vollständige Figur.
- Der statische PNG-Fallback wird aus denselben Punkten erzeugt und funktioniert auch ohne JavaScript/WebGL.

## Daten und Laufzeit

Aktiv: `public/assets/portrait-photo.bin`, `portrait-photo-meta.json` und
`portrait-photo-static.png`. Das Originalfoto und die Freistellungsdiagnose
werden nicht in `public/` kopiert. Die früheren generischen Punktassets bleiben
unverändert erhalten und werden nicht mehr vom Hero geladen.

10.939 Punkte, 12 Float32-Werte je Punkt, 525.072 Bytes (etwa 0,50 MiB
Attributdaten) statt 1.907.392 Bytes des vorher aktiven generischen Datasets.
Ein Draw Call, eine Geometrie und ein Shaderprogramm. Tablet zeichnet maximal
8.500, Mobile maximal 6.500 Punkte. DPR-Grenzen bleiben 1,75 / 1,5 / 1,25;
Mobile bleibt auf maximal 30 FPS begrenzt.

Vorhandene Mechanismen für Offscreen-/Tab-Pause, abgebrochene Downloads,
Context-Restoration, Strict Mode und Ressourcenfreigabe bleiben erhalten.
Es gibt keine Foto-Textur und keinen Segmentierungsdienst im Browser.

## Reproduktion und Prüfung

Generator mit dem vorhandenen Python-Runtime ausführen:

```text
python scripts/build_photo_portrait.py
```

Danach `npm run typecheck`, `npm run build` und die bestehende Browserprüfung:

```text
node scripts/capture_portrait_qa.mjs
```

`PORTRAIT_QA_OUT` erlaubt ein separates Ausgabeverzeichnis. Die lokalen
Vergleichsaufnahmen liegen unter `qa-results/portrait-photo/`, die finalen
Aufnahmen und Messwerte unter `qa-results/portrait-photo/final/`; alles Git-ignoriert.

Die Prüfung erfasst Aufbau, Idle, Pointer, Rückkehr, Scroll-Auflösung und
Rückwärts-Scrollen auf Desktop, Tablet und Mobile sowie Reduced Motion,
Offscreen-/Tab-Pause, WebGL-Verlust/-Wiederherstellung, fehlerhafte Assets,
Fallback, abgebrochene Initialisierung und React Strict Mode.

Prüfergebnisse der finalen Fassung:

- Typecheck und Produktions-Build: erfolgreich, Exit 0.
- Bestehende Navigationstests einschließlich Sprachwechsel: erfolgreich, Exit 0.
- Alle genannten Browserprüfungen: erfolgreich, keine Anwendungsfehler/-warnungen.
- Nach Dispose: keine Geometrie, kein geplanter RAF; Pointer-Geschwindigkeit begrenzt.
- Deterministische Neuerzeugung ist bytegleich; Daten endlich, Deckkraft im Bereich 0–1, Basis-Z durchgehend null.
- Headless-Chromium, Desktop: etwa 16,7 ms zwischen GPU-Draw-Aufrufen während der Messung ohne Screenshots. Das ist keine Zusage für reale Mobilhardware und kein GPU-Timer-Benchmark.
- Impeccable-Detektor für Porträt-TSX/CSS: keine Befunde.
- Bekannte Build-Warnung bleibt: nachgeladener Three.js-Chunk rund 542 kB minifiziert / 135 kB gzip. Keine zusätzliche Rendering-Abhängigkeit.

| Zustand | Lokaler Beleg |
| --- | --- |
| Vorher, generische Geometrie | [Desktop](../qa-results/portrait-photo/before-1440.png) |
| Ruhiger Beginn | [Initial](../qa-results/portrait-photo/final/after-initial.png) |
| Aufbau | [Assembly](../qa-results/portrait-photo/final/after-assembly.png) |
| Fertiges Porträt | [Desktop](../qa-results/portrait-photo/final/after-desktop.png), [Nahansicht](../qa-results/portrait-photo/final/after-face.png) |
| Idle | [Idle](../qa-results/portrait-photo/final/after-idle.png) |
| Mausreaktion | [Pointer](../qa-results/portrait-photo/final/after-pointer.png), [Rückkehr](../qa-results/portrait-photo/final/after-pointer-return.png) |
| Scroll-Auflösung | [Scroll](../qa-results/portrait-photo/final/after-scroll.png), [Rückkehr](../qa-results/portrait-photo/final/after-scroll-return.png) |
| Mobile und Tablet | [Mobile](../qa-results/portrait-photo/final/after-mobile-visible.png), [Tablet](../qa-results/portrait-photo/final/after-tablet.png) |
| Statische Alternative | [Fallback](../qa-results/portrait-photo/final/after-fallback.png) |
| Messwerte und Checks | [QA-Bericht](../qa-results/portrait-photo/final/qa-report.json) |

## Geänderte Dateien dieser Umsetzung

- `app/components/portrait/ParticlePortraitCanvas.tsx`
- `app/components/portrait/ParticlePortraitRenderer.ts`
- `app/components/portrait/portraitShaders.ts`
- `app/components/portrait/types.ts`
- `scripts/build_photo_portrait.py` (neu)
- `scripts/capture_portrait_qa.mjs` (neuer Assetpfad und optionaler QA-Ausgabeordner)
- `public/assets/portrait-photo.bin`, `portrait-photo-meta.json`, `portrait-photo-static.png` (neu)
- `docs/01-content-inventory.md`, `03-inspiration.md`, `06-motion-language.md`, `13-decision-log.md`, `15-particle-portrait-refinement.md`, `16-photo-particle-portrait.md`

Alle bereits vorhandenen uncommitteten Änderungen bleiben erhalten. Homepage-
Layout, Profilfoto, Navbar, Kontakt, Footer, Work-Archiv und Case Studies wurden
für diese Umsetzung nicht verändert.
