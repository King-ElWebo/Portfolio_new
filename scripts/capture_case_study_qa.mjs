import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outputDir = "qa-results/case-study-checkpot";
mkdirSync(outputDir, { recursive: true });

async function runQa() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440px - German (/de/work/checkpot-hietzing)
  console.log("Capturing 1440px German...");
  const pageDe = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await pageDe.goto("http://localhost:5173/de/work/checkpot-hietzing", { waitUntil: "networkidle" });
  await pageDe.waitForTimeout(1000);

  // Scroll down to ensure all images and fonts are loaded
  await pageDe.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  // Hero crop
  await pageDe.screenshot({ path: `${outputDir}/01_desktop_1440px_hero.png` });

  // Full page
  await pageDe.screenshot({ path: `${outputDir}/02_desktop_1440px_fullpage.png`, fullPage: true });

  // Chapter 2: Transformation crop
  const transformElem = await pageDe.$(".cs-transformation-section");
  if (transformElem) {
    await transformElem.screenshot({ path: `${outputDir}/03_desktop_transformation_cream.png` });
  }

  // Chapter 3: Visual Gallery crop
  const galleryElem = await pageDe.$(".cs-gallery-section");
  if (galleryElem) {
    await galleryElem.screenshot({ path: `${outputDir}/04_desktop_showcase_gallery.png` });
  }

  // Chapter 4: CMS Admin crop
  const adminElem = await pageDe.$(".cs-admin-section");
  if (adminElem) {
    await adminElem.screenshot({ path: `${outputDir}/05_desktop_cms_section.png` });
  }

  // Chapter 5: Closing crop
  const closingElem = await pageDe.$(".cs-closing-section");
  if (closingElem) {
    await closingElem.screenshot({ path: `${outputDir}/06_desktop_closing_section.png` });
  }

  // 2. Desktop 1440px - English (/en/work/checkpot-hietzing)
  console.log("Capturing 1440px English...");
  const pageEn = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await pageEn.goto("http://localhost:5173/en/work/checkpot-hietzing", { waitUntil: "networkidle" });
  await pageEn.waitForTimeout(1000);

  await pageEn.screenshot({ path: `${outputDir}/07_desktop_1440px_english_hero.png` });
  await pageEn.screenshot({ path: `${outputDir}/08_desktop_1440px_english_fullpage.png`, fullPage: true });

  // 3. Mobile 390px - German
  console.log("Capturing 390px Mobile...");
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto("http://localhost:5173/de/work/checkpot-hietzing", { waitUntil: "networkidle" });
  await pageMobile.waitForTimeout(1000);

  await pageMobile.screenshot({ path: `${outputDir}/09_mobile_390px_hero.png` });
  await pageMobile.screenshot({ path: `${outputDir}/10_mobile_390px_fullpage.png`, fullPage: true });

  // 4. Navigation from Work Archive
  console.log("Testing navigation from Work Archive...");
  const pageNav = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await pageNav.goto("http://localhost:5173/de/work", { waitUntil: "networkidle" });
  await pageNav.waitForTimeout(800);
  await pageNav.screenshot({ path: `${outputDir}/11_nav_work_archive_before_click.png` });

  const checkpotCard = await pageNav.$('a[href="/de/work/checkpot-hietzing"]');
  if (checkpotCard) {
    await checkpotCard.click();
    await pageNav.waitForURL("**/de/work/checkpot-hietzing");
    await pageNav.waitForTimeout(800);
    await pageNav.screenshot({ path: `${outputDir}/12_nav_arrived_at_case_study.png` });
  }

  await browser.close();
  console.log("Refined Case Study QA suite completed successfully!");
}

runQa().catch(console.error);
