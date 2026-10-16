import { chromium } from "playwright";
import { mkdirSync, readFileSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

const OUTPUT_DIR = resolve("qa-results/lab-final-visual-refinement");
mkdirSync(OUTPUT_DIR, { recursive: true });

const ARTIFACT_DIR = "C:/Users/wilkb/.gemini/antigravity/brain/e632a2a1-7e6e-4ed0-b23d-beaa2d323771";

const TARGETS = [
  {
    slug: "lumenwerk-studio",
    desktopFile: "01_lumenwerk_desktop_fullpage.png",
    mobileFile: "01_lumenwerk_mobile_fullpage.png",
    detailSelector: ".cs-lumen-interactive-controller",
    detailFile: "01_lumenwerk_feature_detail.png",
    name: "LUMENWERK Studio",
  },
  {
    slug: "speiche-werkstattmanager",
    desktopFile: "02_speiche_desktop_fullpage.png",
    mobileFile: "02_speiche_mobile_fullpage.png",
    detailSelector: ".cs-speiche-interactive-controller",
    detailFile: "02_speiche_feature_detail.png",
    name: "SPEICHE Werkstattmanager",
  },
  {
    slug: "roestwerk-1070",
    desktopFile: "03_roestwerk_desktop_fullpage.png",
    mobileFile: "03_roestwerk_mobile_fullpage.png",
    detailSelector: ".cs-roestwerk-interactive-controller",
    detailFile: "03_roestwerk_feature_detail.png",
    name: "RÖSTWERK 1070",
  },
  {
    slug: "kern-field",
    desktopFile: "04_kern-field_desktop_fullpage.png",
    mobileFile: "04_kern-field_mobile_fullpage.png",
    detailSelector: ".cs-kern-archive-wrapper",
    detailFile: "04_kern-field_feature_detail.png",
    name: "KERN / FIELD",
  },
];

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
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      })
    );
  });

  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = 600;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, totalHeight);
    await new Promise((r) => setTimeout(r, 200));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });

  await page.waitForTimeout(800);
}

async function run() {
  console.log("Launching Playwright for Lab Final Visual Refinement capture...");
  const browser = await chromium.launch({ headless: true });

  const summary = [];

  for (const target of TARGETS) {
    const url = `http://localhost:5173/de/work/${target.slug}`;
    console.log(`\n========================================`);
    console.log(`Capturing: ${target.name}`);
    console.log(`========================================`);

    // A. Desktop
    const desktopPath = resolve(OUTPUT_DIR, target.desktopFile);
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    await preparePage(desktopPage, url);
    await desktopPage.screenshot({ path: desktopPath, fullPage: true });

    // Capture signature feature detail
    if (target.detailSelector) {
      const detailPath = resolve(OUTPUT_DIR, target.detailFile);
      await desktopPage.evaluate(() => {
        document.querySelectorAll("header.site-header, header, nav").forEach((el) => {
          if (getComputedStyle(el).position === "fixed" || getComputedStyle(el).position === "sticky") {
            el.setAttribute("data-old-visibility", el.style.visibility);
            el.style.visibility = "hidden";
          }
        });
      });
      const el = await desktopPage.$(target.detailSelector);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        await desktopPage.waitForTimeout(300);
        await el.screenshot({ path: detailPath });
        try {
          copyFileSync(detailPath, resolve(ARTIFACT_DIR, target.detailFile));
        } catch {}
      }
      await desktopPage.evaluate(() => {
        document.querySelectorAll("header, nav").forEach((el) => {
          if (el.hasAttribute("data-old-visibility")) {
            el.style.visibility = el.getAttribute("data-old-visibility");
            el.removeAttribute("data-old-visibility");
          }
        });
      });
    }

    try {
      copyFileSync(desktopPath, resolve(ARTIFACT_DIR, target.desktopFile));
    } catch {}

    const deskDims = getPngDimensions(desktopPath);
    await desktopPage.close();

    // B. Mobile
    const mobilePath = resolve(OUTPUT_DIR, target.mobileFile);
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    await preparePage(mobilePage, url);
    await mobilePage.screenshot({ path: mobilePath, fullPage: true });

    try {
      copyFileSync(mobilePath, resolve(ARTIFACT_DIR, target.mobileFile));
    } catch {}

    const mobDims = getPngDimensions(mobilePath);
    await mobilePage.close();

    summary.push({
      target: target.name,
      desktop: `${target.desktopFile} (${deskDims.width}x${deskDims.height})`,
      mobile: `${target.mobileFile} (${mobDims.width}x${mobDims.height})`,
    });
  }

  await browser.close();

  console.log("\n========================================");
  console.log("CAPTURE SUMMARY");
  console.log("========================================");
  console.table(summary);
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
