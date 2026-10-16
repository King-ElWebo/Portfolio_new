import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

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

async function main() {
  const qaDir = path.resolve("qa-results/let-it-bloom-refinement");
  fs.mkdirSync(qaDir, { recursive: true });

  const port = 5173;
  let serverPid = null;
  const isRunning = await waitForServer(`http://localhost:${port}/`, 2);

  if (!isRunning) {
    console.log("Starting portfolio dev server on port 5173...");
    const server = spawn("cmd.exe", ["/c", "npm", "run", "dev"], {
      cwd: process.cwd(),
      stdio: "pipe",
    });
    serverPid = server.pid;
    server.stdout.on("data", (d) => process.stdout.write(`[DEV] ${d}`));
    server.stderr.on("data", (d) => process.stderr.write(`[DEV err] ${d}`));

    const ready = await waitForServer(`http://localhost:${port}/`, 30);
    if (!ready) {
      console.error("Failed to start portfolio dev server.");
      if (serverPid) killProcess(serverPid);
      process.exit(1);
    }
  }

  console.log("Portfolio ready! Launching Playwright...");
  const browser = await chromium.launch({ headless: true });

  const targets = [
    { locale: "de", path: "/de/work/let-it-bloom" },
    { locale: "en", path: "/en/work/let-it-bloom" },
  ];

  for (const target of targets) {
    console.log(`\nTesting ${target.path}...`);

    // 1. Desktop 1440px
    const desktopCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopCtx.newPage();
    const desktopErrors = [];
    desktopPage.on("console", (msg) => {
      if (msg.type() === "error") desktopErrors.push(msg.text());
    });

    await desktopPage.goto(`http://localhost:${port}${target.path}`, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    // Hero capture
    const heroPath = path.join(qaDir, `let_it_bloom_${target.locale}_1440px_hero.png`);
    await desktopPage.screenshot({ path: heroPath });
    console.log(`Saved: ${heroPath}`);

    // Full page capture
    const fullPath = path.join(qaDir, `let_it_bloom_${target.locale}_1440px_fullpage.png`);
    await desktopPage.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved: ${fullPath}`);

    // Verify Wolfgang Gruber text is present
    const content = await desktopPage.content();
    const hasWolfgang = content.includes("Wolfgang Gruber");
    const hasSabine = content.toLowerCase().includes("sabine") || content.toLowerCase().includes("rödler") || content.toLowerCase().includes("rädler");

    console.log(`[${target.locale}] Wolfgang Gruber present: ${hasWolfgang}`);
    console.log(`[${target.locale}] Sabine Rödler/Rädler present: ${hasSabine} (Should be FALSE)`);

    // Check for broken images
    const images = await desktopPage.$$eval("img", (imgs) =>
      imgs.map((img) => ({ src: img.src, naturalWidth: img.naturalWidth }))
    );
    const brokenImages = images.filter((img) => img.naturalWidth === 0);
    console.log(`[${target.locale}] Total images: ${images.length}, Broken: ${brokenImages.length}`);
    if (brokenImages.length > 0) {
      console.warn("Broken images:", brokenImages);
    }

    await desktopCtx.close();

    // 2. Tablet 768px
    const tabletCtx = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 2,
    });
    const tabletPage = await tabletCtx.newPage();
    await tabletPage.goto(`http://localhost:${port}${target.path}`, { waitUntil: "networkidle" });
    await tabletPage.waitForTimeout(800);
    const tabletPath = path.join(qaDir, `let_it_bloom_${target.locale}_768px_fullpage.png`);
    await tabletPage.screenshot({ path: tabletPath, fullPage: true });
    console.log(`Saved: ${tabletPath}`);
    await tabletCtx.close();

    // 3. Mobile 390px
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
    });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto(`http://localhost:${port}${target.path}`, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(800);

    const mobileHeroPath = path.join(qaDir, `let_it_bloom_${target.locale}_390px_hero.png`);
    await mobilePage.screenshot({ path: mobileHeroPath });
    console.log(`Saved: ${mobileHeroPath}`);

    const mobileFullPath = path.join(qaDir, `let_it_bloom_${target.locale}_390px_fullpage.png`);
    await mobilePage.screenshot({ path: mobileFullPath, fullPage: true });
    console.log(`Saved: ${mobileFullPath}`);
    await mobileCtx.close();
  }

  // 4. Test Navigation to Next Project
  console.log("\nTesting Next Project Navigation...");
  const navCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const navPage = await navCtx.newPage();
  await navPage.goto(`http://localhost:${port}/de/work/let-it-bloom`, { waitUntil: "networkidle" });
  await navPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await navPage.waitForTimeout(600);

  const nextLink = navPage.locator('a[href*="/de/work/fkw-g"]');
  console.log("Next link found:", await nextLink.count());
  await nextLink.first().click();
  await navPage.waitForURL("**/de/work/fkw-g", { timeout: 10000 });
  console.log("Navigated successfully to FKW-G:", navPage.url());

  await navCtx.close();
  await browser.close();

  if (serverPid) {
    console.log("Stopping dev server...");
    killProcess(serverPid);
  }

  console.log("\nQA COMPLETED SUCCESSFULLY!");
}

main().catch((e) => {
  console.error("QA error:", e);
  process.exit(1);
});
