import { chromium } from "playwright";
import { spawn } from "node:child_process";

async function run() {
  console.log("Starting SPEICHE dev server...");
  const server = spawn("cmd.exe", ["/c", "pnpm", "exec", "next", "dev", "-p", "3022"], {
    cwd: "C:/Users/wilkb/Desktop/demo test 3",
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => console.log(`[SPEICHE stdout] ${d}`));
  server.stderr.on("data", (d) => console.error(`[SPEICHE stderr] ${d}`));

  // Wait for server to become ready
  let ready = false;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch("http://localhost:3022/");
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!ready) {
    console.error("Server failed to become ready in time.");
    server.kill();
    process.exit(1);
  }

  console.log("Server ready! Launching Playwright...");
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Dashboard
  const contextDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto("http://localhost:3022/", { waitUntil: "networkidle" });
  await pageDesktop.waitForTimeout(1500);
  await pageDesktop.screenshot({ path: "public/assets/projects/speiche/speiche-desktop-authentic.png" });

  // 2. Desktop Orders Board
  await pageDesktop.goto("http://localhost:3022/auftraege", { waitUntil: "networkidle" });
  await pageDesktop.waitForTimeout(1500);
  await pageDesktop.screenshot({ path: "public/assets/projects/speiche/speiche-orders-authentic.png" });

  // 3. Desktop Inventory
  await pageDesktop.goto("http://localhost:3022/lager", { waitUntil: "networkidle" });
  await pageDesktop.waitForTimeout(1500);
  await pageDesktop.screenshot({ path: "public/assets/projects/speiche/speiche-inventory-authentic.png" });

  // 4. Mobile View
  const contextMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto("http://localhost:3022/", { waitUntil: "networkidle" });
  await pageMobile.waitForTimeout(1500);
  await pageMobile.screenshot({ path: "public/assets/projects/speiche/speiche-mobile-authentic.png" });

  await browser.close();
  console.log("Screenshots captured successfully!");

  // Terminate server process tree
  spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"]);
}

run().catch((err) => {
  console.error("Error during capture:", err);
  process.exit(1);
});
