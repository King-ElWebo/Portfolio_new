import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.resolve("qa-results/let-it-bloom-final-polish/candidate-captures");
  fs.mkdirSync(outDir, { recursive: true });

  // Desktop context
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopCtx.newPage();
  await page.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Accept cookies
  const acceptBtn = page.locator('button:has-text("Alle akzeptieren")');
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
    await page.waitForTimeout(1500);
  }

  // 1. Clean Hero at 1440x900
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, "candidate_hero_desktop.png") });

  // 2. Services section: find the heading "Mein Angebot" and scroll into view cleanly
  const angebotHeading = page.locator('h2:has-text("Mein Angebot")').first();
  if (await angebotHeading.isVisible()) {
    await angebotHeading.evaluate((el) => {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    // Scroll up slightly by 40px for breathing room if needed
    await page.evaluate(() => window.scrollBy(0, -30));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, "candidate_services_desktop.png") });
  }

  // 3. Philosophy section: cleanly positioned
  const philosophyHeading = page.locator('h2:has-text("Blumen sind das Lächeln der Erde")').first();
  if (await philosophyHeading.isVisible()) {
    await philosophyHeading.evaluate((el) => {
      el.scrollIntoView({ behavior: "instant", block: "center" });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, "candidate_philosophy_desktop.png") });
  }

  // 4. Gallery section
  const galerieEl = page.locator('#galerie');
  if (await galerieEl.isVisible()) {
    await galerieEl.evaluate((el) => {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await page.evaluate(() => window.scrollBy(0, -20));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, "candidate_gallery_desktop.png") });
  }

  await desktopCtx.close();

  // Mobile context
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mobileCtx.newPage();
  await mPage.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await mPage.waitForTimeout(1500);
  const mAccept = mPage.locator('button:has-text("Alle akzeptieren")');
  if (await mAccept.isVisible()) {
    await mAccept.click();
    await mPage.waitForTimeout(1000);
  }

  // Mobile Services
  const mAngebot = mPage.locator('h2:has-text("Mein Angebot")').first();
  if (await mAngebot.isVisible()) {
    await mAngebot.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));
    await mPage.evaluate(() => window.scrollBy(0, -20));
    await mPage.waitForTimeout(500);
    await mPage.screenshot({ path: path.join(outDir, "candidate_services_mobile.png") });
  }

  // Mobile Navigation (tap hamburger menu button)
  const menuButton = mPage.locator('button[aria-label*="Menü"], header button').first();
  if (await menuButton.isVisible()) {
    await mPage.evaluate(() => window.scrollTo(0, 0));
    await mPage.waitForTimeout(300);
    await menuButton.click();
    await mPage.waitForTimeout(600);
    await mPage.screenshot({ path: path.join(outDir, "candidate_mobile_menu.png") });
  }

  // Mobile Contact
  const mKontakt = mPage.locator('#kontakt');
  if (await mKontakt.isVisible()) {
    await mKontakt.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));
    await mPage.evaluate(() => window.scrollBy(0, -20));
    await mPage.waitForTimeout(500);
    await mPage.screenshot({ path: path.join(outDir, "candidate_contact_mobile.png") });
  }

  await mobileCtx.close();
  await browser.close();
  console.log("Candidate captures completed successfully.");
}

main().catch(console.error);
