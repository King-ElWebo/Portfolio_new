import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.PORTFOLIO_URL || "http://localhost:5173";
const out = "qa-results/homepage-redesign/after";
mkdirSync(out, { recursive: true });

const viewports = [
  { name: "desktop-1366", width: 1366, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-2560", width: 2560, height: 1440 },
  { name: "desktop-3440", width: 3440, height: 1440 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-360", width: 360, height: 800 },
];

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  await page.goto(`${base}/de`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Capture viewport screenshot
  await page.screenshot({ path: `${out}/${vp.name}-viewport.png`, fullPage: false });
  // Capture full page screenshot
  await page.screenshot({ path: `${out}/${vp.name}-full.png`, fullPage: true });

  await context.close();
  console.log(`Captured after: ${vp.name}`);
}

// Dedicated component captures at 1920px desktop
const context1920 = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page1920 = await context1920.newPage();
await page1920.goto(`${base}/de`, { waitUntil: "networkidle" });
await page1920.waitForTimeout(1200);

// Capture Desktop Navigation
const header = page1920.locator("header.global-header");
if (await header.count() > 0) {
  await header.screenshot({ path: `${out}/component-header-1920.png` });
}

// Capture Hero
const hero = page1920.locator("#hero");
if (await hero.count() > 0) {
  await hero.screenshot({ path: `${out}/component-hero-1920.png` });
}

// Capture Featured Work
const work = page1920.locator("#work");
if (await work.count() > 0) {
  await work.screenshot({ path: `${out}/component-selectedwork-1920.png` });
}

// Capture Capabilities
const capabilities = page1920.locator("#capabilities");
if (await capabilities.count() > 0) {
  await capabilities.screenshot({ path: `${out}/component-capabilities-1920.png` });
}

// Capture About/Practitioner
const about = page1920.locator("#about");
if (await about.count() > 0) {
  await about.screenshot({ path: `${out}/component-about-1920.png` });
}

// Capture Lab
const lab = page1920.locator("#lab");
if (await lab.count() > 0) {
  await lab.screenshot({ path: `${out}/component-lab-1920.png` });
}

// Capture Contact ending
const contact = page1920.locator("#contact");
if (await contact.count() > 0) {
  await contact.screenshot({ path: `${out}/component-contact-1920.png` });
}

await context1920.close();

// Mobile Navigation Drawer Capture
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(`${base}/de`, { waitUntil: "networkidle" });
await mobilePage.waitForTimeout(800);

// Click hamburger button to open mobile menu
const toggle = mobilePage.locator(".mobile-nav-toggle");
if (await toggle.count() > 0) {
  await toggle.click();
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({ path: `${out}/component-mobile-nav-open-390.png` });
}

await mobileContext.close();

// English version test capture (Hero & Navigation)
const enContext = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const enPage = await enContext.newPage();
await enPage.goto(`${base}/en`, { waitUntil: "networkidle" });
await enPage.waitForTimeout(1000);
await enPage.screenshot({ path: `${out}/desktop-1920-english-viewport.png`, fullPage: false });
await enPage.screenshot({ path: `${out}/desktop-1920-english-full.png`, fullPage: true });
await enContext.close();

await browser.close();
console.log("After capture complete!");
