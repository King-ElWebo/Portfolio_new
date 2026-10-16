import { chromium } from "playwright";
import { spawn } from "node:child_process";

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

async function captureApp({ name, cwd, command, args, port, captures }) {
  console.log(`\n============================\nStarting ${name} on port ${port}...\n============================`);
  const server = spawn("cmd.exe", ["/c", command, ...args], { cwd, stdio: "pipe" });

  server.stdout.on("data", (d) => process.stdout.write(`[${name}] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[${name} err] ${d}`));

  const url = `http://localhost:${port}/`;
  const ready = await waitForServer(url);

  if (!ready) {
    console.error(`Failed to start ${name} on port ${port}`);
    killProcess(server.pid);
    return;
  }

  console.log(`${name} is ready! Capturing screenshots...`);
  const browser = await chromium.launch({ headless: true });

  for (const cap of captures) {
    console.log(`Capturing: ${cap.outPath}`);
    const context = await browser.newContext({
      viewport: cap.isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    try {
      await page.goto(`http://localhost:${port}${cap.path}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1500);

      // Clean consent or preview popups if any
      await page.evaluate(() => {
        document.querySelectorAll('aside, [aria-label*="Datenschutz"], [aria-label*="Cookie"], #cookie-banner').forEach(el => el.remove());
      });
      await page.waitForTimeout(500);

      await page.screenshot({ path: cap.outPath });
    } catch (e) {
      console.error(`Error capturing ${cap.path}: ${e.message}`);
    }
    await context.close();
  }

  await browser.close();
  console.log(`Finished ${name}! Shutting down server...`);
  killProcess(server.pid);
  await new Promise((r) => setTimeout(r, 2000));
}

async function main() {
  // 1. LUMENWERK Studio
  await captureApp({
    name: "LUMENWERK",
    cwd: "C:/Users/wilkb/Desktop/demo test 4",
    command: "pnpm",
    args: ["exec", "next", "dev", "-p", "3021"],
    port: 3021,
    captures: [
      { path: "/", isMobile: false, outPath: "public/assets/projects/lumenwerk/lumenwerk-desktop-authentic.png" },
      { path: "/", isMobile: true, outPath: "public/assets/projects/lumenwerk/lumenwerk-mobile-authentic.png" },
      { path: "/konfigurator", isMobile: false, outPath: "public/assets/projects/lumenwerk/lumenwerk-konfigurator-authentic.png" },
      { path: "/haendler", isMobile: false, outPath: "public/assets/projects/lumenwerk/lumenwerk-haendler-authentic.png" },
    ],
  });

  // 2. RÖSTWERK 1070
  await captureApp({
    name: "RÖSTWERK",
    cwd: "C:/Users/wilkb/Desktop/demo test 2",
    command: "pnpm",
    args: ["exec", "next", "dev", "-p", "3023"],
    port: 3023,
    captures: [
      { path: "/", isMobile: false, outPath: "public/assets/projects/roestwerk/roestwerk-desktop-authentic.png" },
      { path: "/", isMobile: true, outPath: "public/assets/projects/roestwerk/roestwerk-mobile-authentic.png" },
      { path: "/geschmack", isMobile: false, outPath: "public/assets/projects/roestwerk/roestwerk-flavor-authentic.png" },
      { path: "/bruehen", isMobile: false, outPath: "public/assets/projects/roestwerk/roestwerk-brew-authentic.png" },
    ],
  });

  // 3. KERN / FIELD
  await captureApp({
    name: "KERN / FIELD",
    cwd: "C:/Users/wilkb/Desktop/Demo TEst1",
    command: "pnpm",
    args: ["exec", "next", "dev", "-p", "3024"],
    port: 3024,
    captures: [
      { path: "/", isMobile: false, outPath: "public/assets/projects/kern-field/kern-field-desktop-authentic.png" },
      { path: "/", isMobile: true, outPath: "public/assets/projects/kern-field/kern-field-mobile-authentic.png" },
      { path: "/work", isMobile: false, outPath: "public/assets/projects/kern-field/kern-field-work-authentic.png" },
      { path: "/studio", isMobile: false, outPath: "public/assets/projects/kern-field/kern-field-studio-authentic.png" },
    ],
  });

  // 4. Let It Bloom
  await captureApp({
    name: "Let It Bloom",
    cwd: "C:/Users/wilkb/Desktop/Projekte/Blumen Geschäft/leet-it-bloom website",
    command: "npx",
    args: ["next", "dev", "-p", "3020"],
    port: 3020,
    captures: [
      { path: "/", isMobile: false, outPath: "public/assets/projects/let-it-bloom/let-it-bloom-desktop-authentic.png" },
      { path: "/", isMobile: true, outPath: "public/assets/projects/let-it-bloom/let-it-bloom-mobile-authentic.png" },
      { path: "/admin", isMobile: false, outPath: "public/assets/projects/let-it-bloom/let-it-bloom-admin-authentic.png" },
    ],
  });

  console.log("\nALL APPS CAPTURED SUCCESSFULLY!");
}

main().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
