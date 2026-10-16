import { chromium } from "playwright";
import { mkdirSync, readFileSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

const OUTPUT_DIR = resolve("qa-results/lab-final-visual-refinement");
mkdirSync(OUTPUT_DIR, { recursive: true });

const ARTIFACT_DIR = "C:/Users/wilkb/.gemini/antigravity/brain/e632a2a1-7e6e-4ed0-b23d-beaa2d323771";

function getPngDimensions(filePath) {
  const buf = readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

async function preparePage(page, url) {
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.onload = () => res();
          img.onerror = () => res();
        });
      })
    );
  });
  await page.waitForTimeout(1000);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Fullpage & Feature Detail
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  const deUrl = "http://localhost:5173/de/work/kern-field";

  await preparePage(desktopPage, deUrl);

  const desktopOut = resolve(OUTPUT_DIR, "04_kern-field_desktop_fullpage.png");
  await desktopPage.screenshot({
    path: desktopOut,
    fullPage: true,
  });
  const dDims = getPngDimensions(desktopOut);
  console.log(`[DESKTOP FULLPAGE] 04_kern-field_desktop_fullpage.png: ${dDims.width}x${dDims.height}`);
  copyFileSync(desktopOut, resolve(ARTIFACT_DIR, "04_kern-field_desktop_fullpage.png"));

  // Feature Detail
  const detailElement = desktopPage.locator(".cs-kern-archive-wrapper");
  await detailElement.scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(600);

  // Hide fixed header during element screenshot
  await desktopPage.evaluate(() => {
    const headers = document.querySelectorAll("header, .global-header, .site-header, [class*='header']");
    headers.forEach((h) => {
      h.style.display = "none";
    });
  });

  const detailOut = resolve(OUTPUT_DIR, "04_kern-field_feature_detail.png");
  await detailElement.screenshot({
    path: detailOut,
  });
  const dtDims = getPngDimensions(detailOut);
  console.log(`[FEATURE DETAIL] 04_kern-field_feature_detail.png: ${dtDims.width}x${dtDims.height}`);
  copyFileSync(detailOut, resolve(ARTIFACT_DIR, "04_kern-field_feature_detail.png"));

  await desktopContext.close();

  // 2. Mobile Fullpage
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await preparePage(mobilePage, deUrl);

  const mobileOut = resolve(OUTPUT_DIR, "04_kern-field_mobile_fullpage.png");
  await mobilePage.screenshot({
    path: mobileOut,
    fullPage: true,
  });
  const mDims = getPngDimensions(mobileOut);
  console.log(`[MOBILE FULLPAGE] 04_kern-field_mobile_fullpage.png: ${mDims.width}x${mDims.height}`);
  copyFileSync(mobileOut, resolve(ARTIFACT_DIR, "04_kern-field_mobile_fullpage.png"));

  await mobileContext.close();
  await browser.close();
  console.log("KERN / FIELD dark theme screenshots captured and copied successfully.");
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
