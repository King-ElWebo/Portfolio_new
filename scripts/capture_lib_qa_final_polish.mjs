import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const port = 5173;
  const baseUrl = `http://localhost:${port}`;
  const outDir = path.resolve("qa-results/let-it-bloom-final-polish");
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Connecting to portfolio server on ${baseUrl}...`);
  const browser = await chromium.launch({ headless: true });

  // 1. GERMAN DESKTOP (1440px)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopCtx.newPage();

  console.log("Loading German case study...");
  await page.goto(`${baseUrl}/de/work/let-it-bloom`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Wait for all images in the case study to be loaded
  await page.waitForFunction(() => {
    const imgs = Array.from(document.querySelectorAll('.let-it-bloom-case-study img'));
    return imgs.length > 0 && imgs.every((img) => img.complete && img.naturalWidth > 0);
  }, { timeout: 15000 }).catch(() => console.log("Some images took longer, proceeding..."));

  // 1. Hero 1440px
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const heroPath = path.join(outDir, "01_let_it_bloom_de_1440px_hero.png");
  await page.screenshot({ path: heroPath });
  console.log("Saved:", heroPath);

  // 2. Fullpage 1440px
  const fullpagePath = path.join(outDir, "02_let_it_bloom_de_1440px_fullpage.png");
  await page.screenshot({ path: fullpagePath, fullPage: true });
  console.log("Saved:", fullpagePath);

  // 3. Digital Experience Section
  const expSection = page.locator('.cs-lib-experience-section');
  if (await expSection.isVisible()) {
    const expPath = path.join(outDir, "04_let_it_bloom_de_digital_experience.png");
    await expSection.screenshot({ path: expPath });
    console.log("Saved:", expPath);
  }

  // 4. CMS Section
  const cmsSection = page.locator('.cs-admin-section');
  if (await cmsSection.isVisible()) {
    const cmsPath = path.join(outDir, "05_let_it_bloom_de_cms_section.png");
    await cmsSection.screenshot({ path: cmsPath });
    console.log("Saved:", cmsPath);
  }

  // 5. Closing Section
  const closingSection = page.locator('.cs-closing-section');
  if (await closingSection.isVisible()) {
    const closingPath = path.join(outDir, "06_let_it_bloom_de_closing_section.png");
    await closingSection.screenshot({ path: closingPath });
    console.log("Saved:", closingPath);
  }

  // 2. GERMAN MOBILE (390px)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mobileCtx.newPage();
  console.log("Loading German mobile case study...");
  await mPage.goto(`${baseUrl}/de/work/let-it-bloom`, { waitUntil: "networkidle" });
  await mPage.waitForTimeout(1500);

  const mFullpagePath = path.join(outDir, "03_let_it_bloom_de_390px_fullpage.png");
  await mPage.screenshot({ path: mFullpagePath, fullPage: true });
  console.log("Saved:", mFullpagePath);

  // 3. ENGLISH DESKTOP & MOBILE (for bilingual consistency verification)
  console.log("Loading English case study...");
  const enPage = await desktopCtx.newPage();
  await enPage.goto(`${baseUrl}/en/work/let-it-bloom`, { waitUntil: "networkidle" });
  await enPage.waitForTimeout(1500);

  const enFullpagePath = path.join(outDir, "07_let_it_bloom_en_1440px_fullpage.png");
  await enPage.screenshot({ path: enFullpagePath, fullPage: true });
  console.log("Saved:", enFullpagePath);

  const enMPage = await mobileCtx.newPage();
  await enMPage.goto(`${baseUrl}/en/work/let-it-bloom`, { waitUntil: "networkidle" });
  await enMPage.waitForTimeout(1500);

  const enMFullpagePath = path.join(outDir, "08_let_it_bloom_en_390px_fullpage.png");
  await enMPage.screenshot({ path: enMFullpagePath, fullPage: true });
  console.log("Saved:", enMFullpagePath);

  await desktopCtx.close();
  await mobileCtx.close();
  await browser.close();
  console.log("All visual QA captures completed successfully!");
}

main().catch(console.error);
