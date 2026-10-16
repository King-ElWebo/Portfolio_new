import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";

const outputDir = "qa-results/case-studies-master";
mkdirSync(outputDir, { recursive: true });

const SLUGS = [
  "checkpot-hietzing",
  "let-it-bloom",
  "fkw-g",
  "lumenwerk-studio",
  "speiche-werkstattmanager",
  "roestwerk-1070",
  "kern-field",
];

async function waitForServer(url, maxSec = 30) {
  for (let i = 0; i < maxSec; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

function killProcess(pid) {
  try {
    spawn("taskkill", ["/pid", pid.toString(), "/f", "/t"]);
  } catch {}
}

async function runQa() {
  console.log("Starting portfolio dev server on port 5173...");
  const server = spawn("cmd.exe", ["/c", "npm", "run", "dev", "--", "--port", "5173"], {
    cwd: "C:/Users/wilkb/Desktop/Portfolio",
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => process.stdout.write(`[PORTFOLIO] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[PORTFOLIO err] ${d}`));

  const ready = await waitForServer("http://localhost:5173/de/work");
  if (!ready) {
    console.error("Portfolio dev server failed to start.");
    killProcess(server.pid);
    process.exit(1);
  }

  console.log("Portfolio dev server ready! Launching Playwright QA...");
  const browser = await chromium.launch({ headless: true });

  // 1. Capture Work Archive (DE & EN)
  console.log("Capturing Work Archive...");
  const pageArchiveDe = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await pageArchiveDe.goto("http://localhost:5173/de/work", { waitUntil: "networkidle" });
  await pageArchiveDe.waitForTimeout(1500);
  await pageArchiveDe.screenshot({ path: `${outputDir}/00_archive_de_1440px.png`, fullPage: true });

  const pageArchiveEn = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await pageArchiveEn.goto("http://localhost:5173/en/work", { waitUntil: "networkidle" });
  await pageArchiveEn.waitForTimeout(1500);
  await pageArchiveEn.screenshot({ path: `${outputDir}/00_archive_en_1440px.png`, fullPage: true });

  // 2. Loop through all 7 Case Studies
  for (let i = 0; i < SLUGS.length; i++) {
    const slug = SLUGS[i];
    const prefix = `${String(i + 1).padStart(2, "0")}_${slug}`;
    console.log(`\nQA for [${slug}]...`);

    // A. Desktop DE (1440px)
    const pageDe = await browser.newPage({ viewport: { width: 1440, height: 950 } });
    await pageDe.goto(`http://localhost:5173/de/work/${slug}`, { waitUntil: "networkidle" });
    await pageDe.waitForTimeout(1000);

    // Scroll to trigger lazy images
    await pageDe.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    await pageDe.screenshot({ path: `${outputDir}/${prefix}_01_desktop_hero_de.png` });
    await pageDe.screenshot({ path: `${outputDir}/${prefix}_02_desktop_fullpage_de.png`, fullPage: true });

    // B. Desktop EN (1440px)
    const pageEn = await browser.newPage({ viewport: { width: 1440, height: 950 } });
    await pageEn.goto(`http://localhost:5173/en/work/${slug}`, { waitUntil: "networkidle" });
    await pageEn.waitForTimeout(1000);

    await pageEn.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    await pageEn.screenshot({ path: `${outputDir}/${prefix}_03_desktop_fullpage_en.png`, fullPage: true });

    // C. Mobile DE (390px)
    const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await pageMobile.goto(`http://localhost:5173/de/work/${slug}`, { waitUntil: "networkidle" });
    await pageMobile.waitForTimeout(1000);

    await pageMobile.screenshot({ path: `${outputDir}/${prefix}_04_mobile_hero_de.png` });

    await pageMobile.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    await pageMobile.screenshot({ path: `${outputDir}/${prefix}_05_mobile_fullpage_de.png`, fullPage: true });

    await pageDe.close();
    await pageEn.close();
    await pageMobile.close();
  }

  // 3. Verify Circular Navigation
  console.log("\nVerifying Next-Project Navigation loop...");
  const navPage = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await navPage.goto("http://localhost:5173/de/work/checkpot-hietzing", { waitUntil: "networkidle" });
  await navPage.waitForTimeout(800);

  // Click next project link in footer
  const nextLink = await navPage.$(".cs-next-title-link");
  if (nextLink) {
    await Promise.all([
      navPage.waitForURL("**/de/work/let-it-bloom", { timeout: 10000 }),
      nextLink.click(),
    ]);
    console.log("Navigated successfully to: " + navPage.url());
  }

  await browser.close();
  console.log("\nALL 7 CASE STUDIES QA COMPLETED SUCCESSFULLY!");

  killProcess(server.pid);
  process.exit(0);
}

runQa().catch((err) => {
  console.error("QA failed:", err);
  process.exit(1);
});
