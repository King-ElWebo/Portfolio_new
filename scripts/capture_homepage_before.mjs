import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.PORTFOLIO_URL || "http://localhost:5173";
const out = "qa-results/homepage-redesign/before";
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
  await page.waitForTimeout(1000);

  // Capture viewport screenshot
  await page.screenshot({ path: `${out}/${vp.name}-viewport.png`, fullPage: false });
  // Capture full page screenshot
  await page.screenshot({ path: `${out}/${vp.name}-full.png`, fullPage: true });

  await context.close();
  console.log(`Captured before: ${vp.name}`);
}

// Also capture key individual components on 1920px desktop
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
await page.goto(`${base}/de`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// Capture Header
const header = page.locator("header.global-header");
if (await header.count() > 0) {
  await header.screenshot({ path: `${out}/component-header-1920.png` });
}

// Capture Hero
const hero = page.locator("#hero");
if (await hero.count() > 0) {
  await hero.screenshot({ path: `${out}/component-hero-1920.png` });
}

// Capture Selected Work
const work = page.locator("#work");
if (await work.count() > 0) {
  await work.screenshot({ path: `${out}/component-selectedwork-1920.png` });
}

// Capture Contact
const contact = page.locator("#contact");
if (await contact.count() > 0) {
  await contact.screenshot({ path: `${out}/component-contact-1920.png` });
}

await context.close();
await browser.close();
console.log("Before capture complete!");
