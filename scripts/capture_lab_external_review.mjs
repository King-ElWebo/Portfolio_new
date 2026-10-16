import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const OUTPUT_DIR = resolve("qa-results/lab-external-review");
mkdirSync(OUTPUT_DIR, { recursive: true });

const TARGETS = [
  {
    slug: "lumenwerk-studio",
    desktopFile: "01_lumenwerk_desktop_fullpage.png",
    mobileFile: "01_lumenwerk_mobile_fullpage.png",
    name: "LUMENWERK Studio",
  },
  {
    slug: "speiche-werkstattmanager",
    desktopFile: "02_speiche_desktop_fullpage.png",
    mobileFile: "02_speiche_mobile_fullpage.png",
    name: "SPEICHE Werkstattmanager",
  },
  {
    slug: "roestwerk-1070",
    desktopFile: "03_roestwerk_desktop_fullpage.png",
    mobileFile: "03_roestwerk_mobile_fullpage.png",
    name: "RÖSTWERK 1070",
  },
  {
    slug: "kern-field",
    desktopFile: "04_kern-field_desktop_fullpage.png",
    mobileFile: "04_kern-field_mobile_fullpage.png",
    name: "KERN / FIELD",
  },
];

// Helper to extract PNG width and height from header bytes
function getPngDimensions(filePath) {
  const buf = readFileSync(filePath);
  // PNG signature is 8 bytes, IHDR chunk starts at offset 8, length at 8, type at 12, width at 16, height at 20
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

async function prepareAndScreenshot(page, url, outputPath) {
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  // 1. Wait for document fonts
  await page.evaluate(() => document.fonts.ready);

  // 2. Wait for all existing images to complete
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

  // 3. Scroll through entire page to trigger any intersection / lazy elements
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = 600;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, totalHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  // 4. Stable layout delay
  await page.waitForTimeout(1000);

  // 5. Lossless fullpage PNG capture
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Saved: ${outputPath}`);
}

async function run() {
  console.log("Launching Playwright with reduced-motion context...");
  const browser = await chromium.launch({ headless: true });

  const results = [];

  for (const target of TARGETS) {
    const url = `http://localhost:5173/de/work/${target.slug}`;
    console.log(`\n========================================`);
    console.log(`Capturing: ${target.name}`);
    console.log(`========================================`);

    // A. Desktop: 1440 x 900
    const desktopPath = resolve(OUTPUT_DIR, target.desktopFile);
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    await prepareAndScreenshot(desktopPage, url, desktopPath);
    await desktopPage.close();
    const desktopDims = getPngDimensions(desktopPath);

    // B. Mobile: 390 x 844
    const mobilePath = resolve(OUTPUT_DIR, target.mobileFile);
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await prepareAndScreenshot(mobilePage, url, mobilePath);
    await mobilePage.close();
    const mobileDims = getPngDimensions(mobilePath);

    results.push({
      name: target.name,
      slug: target.slug,
      desktopFile: target.desktopFile,
      desktopDims,
      mobileFile: target.mobileFile,
      mobileDims,
    });
  }

  await browser.close();

  console.log("\n========================================");
  console.log("CAPTURE SUMMARY TABLE");
  console.log("========================================");
  console.log(JSON.stringify(results, null, 2));
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
