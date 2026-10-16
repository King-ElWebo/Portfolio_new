import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Friedrich-Karl-Weniger Gesellschaft (FKW-G)</title>
  <link rel="stylesheet" href="file:///${resolve("C:/Users/wilkb/.gemini/antigravity/brain/e632a2a1-7e6e-4ed0-b23d-beaa2d323771/scratch/fkw-g/assets/css/bootstrap.min.css").replace(/\\\\/g, "/")}">
  <link rel="stylesheet" href="file:///${resolve("C:/Users/wilkb/.gemini/antigravity/brain/e632a2a1-7e6e-4ed0-b23d-beaa2d323771/scratch/fkw-g/style.css").replace(/\\\\/g, "/")}">
  <style>
    body { font-family: var(--fkw-font-sans); background: var(--fkw-canvas); color: var(--fkw-text); margin: 0; padding: 0; }
    .hero-banner { background: linear-gradient(135deg, rgba(181, 51, 51, 0.95), rgba(122, 30, 30, 0.9)), url('file:///${resolve("public/assets/projects/fkw-g/AdobeStock_374846559.jpg").replace(/\\\\/g, "/")}') center/cover; color: #fff; padding: 80px 0 100px; }
    .hero-title { font-family: var(--fkw-font-serif); font-size: 2.75rem; font-weight: 700; line-height: 1.25; margin-bottom: 24px; }
    .hero-lead { font-size: 1.25rem; line-height: 1.6; max-width: 680px; opacity: 0.95; margin-bottom: 36px; }
    .btn-fkw-primary { background: #FFFFFF; color: #B53333; font-weight: 600; padding: 14px 28px; border-radius: 6px; text-decoration: none; display: inline-block; box-shadow: var(--fkw-shadow); }
    .btn-fkw-secondary { background: transparent; border: 2px solid rgba(255,255,255,0.8); color: #FFF; font-weight: 600; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-left: 16px; }
    .nav-bar { background: #FFFFFF; border-bottom: 1px solid var(--fkw-border); padding: 16px 0; }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; }
    .logo-img { height: 52px; width: auto; }
    .nav-links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
    .nav-links a { color: var(--fkw-text); text-decoration: none; font-weight: 500; font-size: 0.95rem; }
    .section-card { background: #FFFFFF; border: 1px solid var(--fkw-border); border-radius: 12px; padding: 40px; margin-top: -40px; box-shadow: var(--fkw-shadow); }
    .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
    .feature-box { background: var(--fkw-surface-subtle); padding: 28px; border-radius: 8px; border-left: 4px solid var(--fkw-crimson); }
    .feature-title { font-family: var(--fkw-font-serif); font-size: 1.2rem; margin-bottom: 12px; color: var(--fkw-text); }
    .feature-desc { font-size: 0.95rem; line-height: 1.6; color: var(--fkw-text-muted); margin: 0; }
    .donate-strip { background: var(--fkw-sage-subtle); border: 1px solid rgba(61, 102, 84, 0.2); border-radius: 12px; padding: 36px; margin-top: 48px; display: flex; align-items: center; justify-content: space-between; }
    .donate-strip h3 { font-family: var(--fkw-font-serif); color: var(--fkw-sage); margin: 0 0 8px 0; }
    .donate-btn { background: var(--fkw-crimson); color: #fff; padding: 14px 32px; border-radius: 6px; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <header class="nav-bar">
    <div class="container nav-inner">
      <div class="brand">
        <img src="file:///${resolve("public/assets/projects/fkw-g/fkw-logo.png").replace(/\\\\/g, "/")}" alt="FKW-G Logo" class="logo-img">
      </div>
      <ul class="nav-links">
        <li><a href="#ueber-uns">Über uns</a></li>
        <li><a href="#was-wir-tun">Was wir tun</a></li>
        <li><a href="#vision">Unsere Vision</a></li>
        <li><a href="#downloads">Downloads & Statuten</a></li>
        <li><a href="#spenden" style="color: var(--fkw-crimson); font-weight: 600;">Spenden</a></li>
      </ul>
    </div>
  </header>

  <main>
    <section class="hero-banner">
      <div class="container">
        <div style="max-width: 760px;">
          <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 16px;">Friedrich-Karl-Weniger Gesellschaft</span>
          <h1 class="hero-title">Pflege daheim – Fürsorgliche Begleitung und Orientierung</h1>
          <p class="hero-lead">Wir unterstützen Menschen mit körperlichen Behinderungen und deren Angehörige durch gezielte Information, barrierefreie Zugänge und gemeinschaftliche Solidarität.</p>
          <div>
            <a href="#spenden" class="btn-fkw-primary">Jetzt Spenden & Unterstützen</a>
            <a href="#was-wir-tun" class="btn-fkw-secondary">Mehr über unsere Hilfe</a>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="section-card">
        <h2 style="font-family: var(--fkw-font-serif); font-size: 1.8rem; margin-bottom: 16px;">Barrierefreie Orientierung im Pflegealltag</h2>
        <p style="color: var(--fkw-text-muted); font-size: 1.05rem; line-height: 1.6; max-width: 800px;">
          Unser Ziel ist es, Betroffenen bürokratische Hürden zu nehmen und verlässliche Hilfe direkt zugänglich zu machen. Die Plattform wurde nach WCAG 2.1 Richtlinien mit hohem Schriftkontrast, klarer Tastaturbedienbarkeit und reduzierter Komplexität gestaltet.
        </p>

        <div class="feature-grid">
          <div class="feature-box">
            <h3 class="feature-title">Direkte Unterstützung</h3>
            <p class="feature-desc">Unbürokratische Vermittlung von Hilfsangeboten, Beratung zu Pflegegeldstufen und rechtlichen Grundlagen.</p>
          </div>
          <div class="feature-box">
            <h3 class="feature-title">Geprüfte Dokumente</h3>
            <p class="feature-desc">Offizielle Satzungen, Förderrichtlinien und barrierefreie Antragsformulare als PDF zum Download.</p>
          </div>
          <div class="feature-box">
            <h3 class="feature-title">Transparente Spenden</h3>
            <p class="feature-desc">Direkte Förderung konkreter Einzelfallhilfen mit lückenlosem Nachweis der Mittelverwendung.</p>
          </div>
        </div>

        <div class="donate-strip">
          <div>
            <h3>Ihre Hilfe kommt direkt an</h3>
            <p style="margin: 0; color: var(--fkw-text-muted);">Unterstützen Sie unsere Arbeit für ein selbstbestimmtes Leben in vertrauter Umgebung.</p>
          </div>
          <a href="#spenden" class="donate-btn">Spenden via PayPal oder Überweisung</a>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`;

async function run() {
  const tempHtmlPath = resolve("public/assets/projects/fkw-g/preview.html");
  writeFileSync(tempHtmlPath, html, "utf8");

  const browser = await chromium.launch({ headless: true });

  // Desktop
  const contextDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto(`file:///${tempHtmlPath.replace(/\\\\/g, "/")}`);
  await pageDesktop.waitForTimeout(1000);
  await pageDesktop.screenshot({ path: "public/assets/projects/fkw-g/fkw-desktop-authentic.png" });

  // Mobile
  const contextMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto(`file:///${tempHtmlPath.replace(/\\\\/g, "/")}`);
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: "public/assets/projects/fkw-g/fkw-mobile-authentic.png" });

  await browser.close();
  console.log("FKW-G authentic screenshots rendered successfully!");
}

run().catch(console.error);
