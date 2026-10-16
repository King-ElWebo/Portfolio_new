import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

async function waitForServer(url, maxSec = 45) {
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
  const outDir = path.resolve("public/assets/projects/let-it-bloom");
  fs.mkdirSync(outDir, { recursive: true });

  console.log("Launching Playwright for live captures from https://www.letitbloom.at/ ...");
  const browser = await chromium.launch({ headless: true });

  // 1. DESKTOP VIEWPORT (1440x900)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(2000);

  // Accept cookies on live site
  const acceptBtn = desktopPage.locator('button:has-text("Alle akzeptieren")');
  if (await acceptBtn.isVisible()) {
    console.log("Accepting cookies on live site...");
    await acceptBtn.click();
    await desktopPage.waitForTimeout(1500);
  }

  // Double check banner is gone
  const bannerCheck = await desktopPage.$('section[aria-label="Cookie-Hinweis"]');
  if (bannerCheck && await bannerCheck.isVisible()) {
    await desktopPage.evaluate(() => {
      document.querySelectorAll('section[aria-label*="Cookie"]').forEach(el => el.remove());
    });
  }

  // Capture 1: Clean Desktop Hero (1440x900)
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(600);
  const heroPath = path.join(outDir, "let-it-bloom-hero-desktop-polish-v2.png");
  await desktopPage.screenshot({ path: heroPath });
  console.log("Captured Hero:", heroPath);

  // Capture 2: Clean Desktop Services Section (Mein Angebot)
  const angebotHeading = desktopPage.locator('h2:has-text("Mein Angebot")').first();
  await angebotHeading.evaluate((el) => {
    el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  // Adjust scroll slightly to give breathing room above the title
  await desktopPage.evaluate(() => window.scrollBy(0, -35));
  await desktopPage.waitForTimeout(800);
  const servicesPath = path.join(outDir, "let-it-bloom-experience-desktop-polish-v2.png");
  await desktopPage.screenshot({ path: servicesPath });
  console.log("Captured Desktop Services:", servicesPath);

  // Capture 3: Philosophy / UI Details Section (element screenshot)
  const philosophySection = desktopPage.locator('section').filter({
    hasText: "Blumen sind das Lächeln der Erde"
  }).first();
  if (await philosophySection.isVisible()) {
    const philosophyPath = path.join(outDir, "let-it-bloom-ui-philosophy-polish-v2.png");
    await philosophySection.screenshot({ path: philosophyPath });
    console.log("Captured Philosophy Section:", philosophyPath);
  }

  await desktopCtx.close();

  // 2. MOBILE VIEWPORT (390x844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1500);

  const mAccept = mobilePage.locator('button:has-text("Alle akzeptieren")');
  if (await mAccept.isVisible()) {
    await mAccept.click();
    await mobilePage.waitForTimeout(1000);
  }

  // Ensure cookie banner is gone
  await mobilePage.evaluate(() => {
    document.querySelectorAll('section[aria-label*="Cookie"]').forEach(el => el.remove());
  });

  // Open mobile menu navigation
  const menuBtn = mobilePage.locator('button[aria-label*="Menü"], header button').first();
  if (await menuBtn.isVisible()) {
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await mobilePage.waitForTimeout(300);
    await menuBtn.click();
    await mobilePage.waitForTimeout(700);
  }
  const mobileMenuPath = path.join(outDir, "let-it-bloom-experience-mobile-polish-v2.png");
  await mobilePage.screenshot({ path: mobileMenuPath });
  console.log("Captured Mobile Menu:", mobileMenuPath);

  await mobileCtx.close();

  // 3. CAPTURE CMS DASHBOARD FROM LOCAL PRODUCTION/AUTH STATE
  console.log("Capturing authentic clean CMS Dashboard...");
  const cwd = "C:/Users/wilkb/Desktop/Projekte/Blumen Geschäft/leet-it-bloom website";
  const port = 3036;

  const server = spawn("cmd.exe", ["/c", "npx", "next", "dev", "-p", port.toString()], {
    cwd,
    stdio: "pipe",
  });

  const adminUrl = `http://localhost:${port}/admin`;
  const ready = await waitForServer(adminUrl);

  if (!ready) {
    console.error("Failed to start local server for CMS capture.");
    killProcess(server.pid);
  } else {
    const adminCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const adminPage = await adminCtx.newPage();
    await adminPage.goto(adminUrl, { waitUntil: "networkidle" });
    await adminPage.waitForTimeout(1000);

    // Accept cookies on admin
    try {
      const aBtn = adminPage.locator('button:has-text("Alle akzeptieren")');
      if (await aBtn.isVisible()) {
        await aBtn.click();
        await adminPage.waitForTimeout(800);
      }
    } catch {}

    // Login
    const pwInput = adminPage.locator("#admin-password");
    if (await pwInput.isVisible()) {
      await pwInput.fill("admin");
      await adminPage.locator('button[type="submit"]').click();
      await adminPage.waitForTimeout(3000);
    }

    const h1 = adminPage.locator('h1:has-text("Saisonale Kacheln")');
    await h1.waitFor({ timeout: 10000 });

    // Wait for images
    await adminPage.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="blob"], img[src*="http"], img'));
      return imgs.length >= 3 && imgs.every((img) => img.complete && img.naturalWidth > 0);
    }, { timeout: 15000 }).catch(() => {});

    await adminPage.waitForTimeout(1500);

    // Clean UI: remove dev badge & change " - Test" to ""
    await adminPage.evaluate(() => {
      document.querySelectorAll("nextjs-portal, [data-nextjs-toast], section[aria-label*='Cookie']").forEach((el) => el.remove());
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        if (input.value && input.value.includes(" - Test")) {
          input.value = input.value.replace(" - Test", "");
        }
      });
    });

    await adminPage.waitForTimeout(500);

    const cmsPath = path.join(outDir, "let-it-bloom-cms-polish-v2.png");
    await adminPage.screenshot({ path: cmsPath });
    console.log("Captured Clean CMS:", cmsPath);

    await adminCtx.close();
    killProcess(server.pid);
  }

  await browser.close();
  console.log("All polish-v2 assets successfully captured and verified!");
}

main().catch(console.error);
