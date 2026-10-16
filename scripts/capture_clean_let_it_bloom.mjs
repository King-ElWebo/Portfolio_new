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
  const cwd = "C:/Users/wilkb/Desktop/Projekte/Blumen Geschäft/leet-it-bloom website";
  const port = 3020;
  console.log("Starting Let It Bloom dev server on port 3020...");

  const server = spawn("cmd.exe", ["/c", "npx", "next", "dev", "-p", port.toString()], {
    cwd,
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => process.stdout.write(`[LIB] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[LIB err] ${d}`));

  const url = `http://localhost:${port}/`;
  const ready = await waitForServer(url);

  if (!ready) {
    console.error("Failed to start Let It Bloom server.");
    killProcess(server.pid);
    process.exit(1);
  }

  console.log("Server ready! Launching Playwright...");
  const browser = await chromium.launch({ headless: true });

  const outDir = path.resolve("public/assets/projects/let-it-bloom");
  fs.mkdirSync(outDir, { recursive: true });

  // 1. Desktop 1440x900 - Main Website (Legitimate consent accepted)
  console.log("Capturing Desktop 1440px...");
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(url, { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(2000);

  // Click cookie consent button if present
  try {
    const acceptBtn = desktopPage.locator('button:has-text("Alle akzeptieren")');
    if (await acceptBtn.isVisible()) {
      console.log("Accepting cookies...");
      await acceptBtn.click();
      await desktopPage.waitForTimeout(1000);
    }
  } catch (e) {
    console.log("No cookie banner or already dismissed:", e.message);
  }

  // Ensure any leftover banner is removed
  await desktopPage.evaluate(() => {
    document.querySelectorAll('section[aria-label*="Cookie"], [aria-label*="Datenschutz"]').forEach((el) => el.remove());
  });
  await desktopPage.waitForTimeout(500);

  // Capture Desktop Hero (1440x900)
  const desktopHeroPath = path.join(outDir, "let-it-bloom-desktop-authentic.png");
  await desktopPage.screenshot({ path: desktopHeroPath });
  console.log("Saved:", desktopHeroPath);

  // Capture Desktop UI Section (e.g. Angebot / Gallery / Story section)
  await desktopPage.evaluate(() => window.scrollBy(0, 850));
  await desktopPage.waitForTimeout(800);
  const desktopSectionPath = path.join(outDir, "let-it-bloom-ui-section.png");
  await desktopPage.screenshot({ path: desktopSectionPath });
  console.log("Saved:", desktopSectionPath);

  await desktopCtx.close();

  // 2. Mobile 390x844 - Main Website
  console.log("Capturing Mobile 390px...");
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(url, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(2000);

  try {
    const acceptBtn = mobilePage.locator('button:has-text("Alle akzeptieren")');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await mobilePage.waitForTimeout(1000);
    }
  } catch {}

  await mobilePage.evaluate(() => {
    document.querySelectorAll('section[aria-label*="Cookie"], [aria-label*="Datenschutz"]').forEach((el) => el.remove());
  });
  await mobilePage.waitForTimeout(500);

  const mobileHeroPath = path.join(outDir, "let-it-bloom-mobile-authentic.png");
  await mobilePage.screenshot({ path: mobileHeroPath });
  console.log("Saved:", mobileHeroPath);

  await mobileCtx.close();

  // 3. Authenticated CMS Dashboard under /admin
  console.log("Capturing authenticated CMS Dashboard under /admin...");
  const adminCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const adminPage = await adminCtx.newPage();
  await adminPage.goto(`http://localhost:${port}/admin`, { waitUntil: "networkidle" });
  await adminPage.waitForTimeout(1000);

  // Check if login form is visible
  const passwordInput = adminPage.locator("#admin-password");
  if (await passwordInput.isVisible()) {
    console.log("Logging into admin with local development password...");
    await passwordInput.fill("admin");
    await adminPage.locator('button[type="submit"]').click();
    await adminPage.waitForTimeout(2500);
  }

  // Verify dashboard is loaded
  const dashboardHeading = adminPage.locator('h1:has-text("Saisonale Kacheln")');
  await dashboardHeading.waitFor({ timeout: 10000 });
  console.log("Admin Dashboard authenticated successfully!");

  await adminPage.waitForTimeout(1000);
  const adminScreenshotPath = path.join(outDir, "let-it-bloom-cms-authentic.png");
  await adminPage.screenshot({ path: adminScreenshotPath });
  console.log("Saved:", adminScreenshotPath);

  // Also capture a focused view of the CMS cards
  await adminPage.evaluate(() => window.scrollBy(0, 150));
  await adminPage.waitForTimeout(500);
  const adminDetailPath = path.join(outDir, "let-it-bloom-cms-detail.png");
  await adminPage.screenshot({ path: adminDetailPath });
  console.log("Saved:", adminDetailPath);

  await adminCtx.close();
  await browser.close();

  console.log("Cleaning up dev server...");
  killProcess(server.pid);
  console.log("Done!");
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
