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
  const port = 3032;
  console.log("Starting Let It Bloom server on port 3032...");

  const server = spawn("cmd.exe", ["/c", "npx", "next", "dev", "-p", port.toString()], {
    cwd,
    stdio: "pipe",
  });

  const url = `http://localhost:${port}/admin`;
  const ready = await waitForServer(url);

  if (!ready) {
    console.error("Failed to start server.");
    killProcess(server.pid);
    process.exit(1);
  }

  console.log("Server ready! Launching Playwright...");
  const browser = await chromium.launch({ headless: true });
  const adminCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const adminPage = await adminCtx.newPage();
  await adminPage.goto(url, { waitUntil: "networkidle" });
  await adminPage.waitForTimeout(1000);

  // 1. Accept cookie banner if present
  try {
    const acceptBtn = adminPage.locator('button:has-text("Alle akzeptieren")');
    if (await acceptBtn.isVisible()) {
      console.log("Accepting cookies on /admin...");
      await acceptBtn.click();
      await adminPage.waitForTimeout(1000);
    }
  } catch {}

  // 2. Log in
  const passwordInput = adminPage.locator("#admin-password");
  if (await passwordInput.isVisible()) {
    console.log("Logging into admin...");
    await passwordInput.fill("admin");
    await adminPage.locator('button[type="submit"]').click();
    await adminPage.waitForTimeout(3000);
  }

  const dashboardHeading = adminPage.locator('h1:has-text("Saisonale Kacheln")');
  await dashboardHeading.waitFor({ timeout: 10000 });
  console.log("Dashboard loaded!");

  // Wait for images to load
  await adminPage.waitForFunction(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="blob"], img[src*="http"], img'));
    return imgs.length >= 3 && imgs.every((img) => img.complete && img.naturalWidth > 0);
  }, { timeout: 15000 }).catch(() => console.log("Some images took longer, continuing..."));

  await adminPage.waitForTimeout(2000);

  // 3. Clean up UI:
  // - Remove Next.js dev portal & badges
  // - Clean test text from input
  // - Ensure cookie banner is gone
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

  const outDir = path.resolve("qa-results/let-it-bloom-final-polish/candidate-captures");
  fs.mkdirSync(outDir, { recursive: true });

  const adminScreenshotPath = path.join(outDir, "candidate_cms_clean_v2.png");
  await adminPage.screenshot({ path: adminScreenshotPath });
  console.log("Saved candidate clean CMS v2:", adminScreenshotPath);

  await adminCtx.close();
  await browser.close();
  killProcess(server.pid);
}

main().catch(console.error);
