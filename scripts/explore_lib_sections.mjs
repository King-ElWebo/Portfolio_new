import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("Navigating to https://www.letitbloom.at/ ...");
  await page.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Accept cookies cleanly
  const acceptBtn = page.locator('button:has-text("Alle akzeptieren")');
  if (await acceptBtn.isVisible()) {
    console.log("Clicking 'Alle akzeptieren'...");
    await acceptBtn.click();
    await page.waitForTimeout(1500);
  }

  // Ensure banner is truly gone
  const banner = await page.$('section[aria-label="Cookie-Hinweis"]');
  console.log("Banner still visible?", banner ? await banner.isVisible() : false);

  const outDir = path.resolve("qa-results/let-it-bloom-final-polish/temp-sections");
  fs.mkdirSync(outDir, { recursive: true });

  // 1. Hero 1440x900
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "01_hero_1440.png") });
  console.log("Saved 01_hero_1440.png");

  // 2. Philosophy section (Blumen sind das Lächeln der Erde)
  const philosophyEl = await page.locator('text="Blumen sind das Lächeln der Erde"').first();
  if (await philosophyEl.isVisible()) {
    await philosophyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "02_philosophy_1440.png") });
    console.log("Saved 02_philosophy_1440.png");
  }

  // 3. Services / Mein Angebot (#leistungen)
  const leistungenEl = page.locator('#leistungen');
  if (await leistungenEl.isVisible()) {
    await leistungenEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "03_leistungen_1440.png") });
    console.log("Saved 03_leistungen_1440.png");
  }

  // 4. Gallery (#galerie)
  const galerieEl = page.locator('#galerie');
  if (await galerieEl.isVisible()) {
    await galerieEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "04_galerie_1440.png") });
    console.log("Saved 04_galerie_1440.png");
  }

  // 5. Über mich (#ueber-mich)
  const ueberMichEl = page.locator('#ueber-mich');
  if (await ueberMichEl.isVisible()) {
    await ueberMichEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "05_ueber_mich_1440.png") });
    console.log("Saved 05_ueber_mich_1440.png");
  }

  // 6. Contact (#kontakt)
  const kontaktEl = page.locator('#kontakt');
  if (await kontaktEl.isVisible()) {
    await kontaktEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, "06_kontakt_1440.png") });
    console.log("Saved 06_kontakt_1440.png");
  }

  await context.close();

  // Mobile views
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1500);
  const mAcceptBtn = mobilePage.locator('button:has-text("Alle akzeptieren")');
  if (await mAcceptBtn.isVisible()) {
    await mAcceptBtn.click();
    await mobilePage.waitForTimeout(1000);
  }

  await mobilePage.screenshot({ path: path.join(outDir, "mobile_01_hero.png") });

  // Mobile services
  const mLeistungen = mobilePage.locator('#leistungen');
  if (await mLeistungen.isVisible()) {
    await mLeistungen.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: path.join(outDir, "mobile_02_leistungen.png") });
  }

  // Mobile contact
  const mKontakt = mobilePage.locator('#kontakt');
  if (await mKontakt.isVisible()) {
    await mKontakt.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: path.join(outDir, "mobile_03_kontakt.png") });
  }

  await mobileCtx.close();
  await browser.close();
  console.log("Exploration capture complete!");
}

main().catch(console.error);
