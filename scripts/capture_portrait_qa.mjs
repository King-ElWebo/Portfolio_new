// Focused browser QA using the already available Playwright runtime.
// PORTFOLIO_URL=http://localhost:5173 node scripts/capture_portrait_qa.mjs
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const base = process.env.PORTFOLIO_URL || "http://localhost:5173";
const out = "qa-results/portrait";
const captureScreenshots = !process.argv.includes("--verify-only");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { console: [], checks: {}, frames: {} };
const watch = (page) => {
  page.on("pageerror", (error) => report.console.push({ type: "error", text: error.message }));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()) && !message.text().includes("GPU stall due to ReadPixels")) {
      report.console.push({ type: message.type(), text: message.text() });
    }
  });
};
const ready = (page) => page.locator('.hero-portrait-wrap[data-portrait-status="ready"]').waitFor();
const capture = async (page, name, fullPage = false) => {
  if (!captureScreenshots) return;
  await page.screenshot({ path: `${out}/${name}.png`, fullPage });
};

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1, ...(captureScreenshots ? {
      recordVideo: { dir: `${out}/video`, size: { width: 1440, height: 1000 } }
    } : {}) });
  const page = await context.newPage();
  watch(page);
  // Track actual GPU draws without exposing a debug API in production.
  await page.addInitScript(() => {
    window.portraitDraws = [];
    const original = WebGL2RenderingContext.prototype.drawArrays;
    WebGL2RenderingContext.prototype.drawArrays = function (mode, first, count) {
      if (mode === this.POINTS) window.portraitDraws.push({ at: performance.now(), count });
      return original.call(this, mode, first, count);
    };
  });
  await page.goto(`${base}/de`, { waitUntil: "domcontentloaded" });
  await ready(page);
  await capture(page, "after-initial");
  await page.waitForTimeout(750);
  await capture(page, "after-assembly");
  await page.waitForTimeout(2600);
  await capture(page, "after-desktop");
  if (captureScreenshots) await page.locator(".hero-portrait-wrap").screenshot({ path: `${out}/after-face.png` });
  await page.waitForTimeout(1800);
  await capture(page, "after-idle");
  const rect = await page.locator(".hero-portrait-wrap").boundingBox();
  await page.mouse.move(rect.x + rect.width * .50, rect.y + rect.height * .46, { steps: 8 });
  await page.waitForTimeout(350);
  await capture(page, "after-pointer");
  await page.mouse.move(rect.x + rect.width * .7, rect.y + rect.height * .60, { steps: 15 });
  await page.mouse.move(30, 150);
  await page.waitForTimeout(700);
  await capture(page, "after-pointer-return");
  await page.evaluate(() => window.scrollTo(0, 310));
  await page.waitForTimeout(450);
  await capture(page, "after-scroll");
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(200);
  const offscreenDraws = await page.evaluate(() => window.portraitDraws.length);
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => window.portraitDraws.length), offscreenDraws);
  report.checks.offscreenPause = true;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await capture(page, "after-scroll-return");
  const drawTimes = await page.evaluate(() => window.portraitDraws.slice(-90));
  report.frames.desktop = { points: drawTimes.at(-1).count,
    averageIntervalMs: (drawTimes.at(-1).at - drawTimes[0].at) / (drawTimes.length - 1) };
  const sampleStart = await page.evaluate(() => window.portraitDraws.length);
  await page.waitForTimeout(1000);
  const uninterrupted = await page.evaluate((start) => window.portraitDraws.slice(start), sampleStart);
  report.frames.desktop.uninterruptedIntervalMs = (uninterrupted.at(-1).at - uninterrupted[0].at) / (uninterrupted.length - 1);
  // Visibility API should stop all GPU drawing even while the canvas intersects.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const hiddenDraws = await page.evaluate(() => window.portraitDraws.length);
  await page.waitForTimeout(200);
  assert.equal(await page.evaluate(() => window.portraitDraws.length), hiddenDraws);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  report.checks.documentHiddenPause = true;

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(200);
  await capture(page, "after-reduced");
  const reducedDraws = await page.evaluate(() => window.portraitDraws.length);
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => window.portraitDraws.length), reducedDraws);
  report.checks.reducedMotionStopsRaf = true;
  // Exercise the real browser context loss/restore extension.
  await page.evaluate(() => {
    const gl = document.querySelector(".hero-portrait-canvas").getContext("webgl2");
    window.portraitContextExtension = gl.getExtension("WEBGL_lose_context");
    window.portraitContextExtension.loseContext();
  });
  await page.locator('[data-portrait-status="context-lost"]').waitFor();
  await capture(page, "after-context-loss");
  await page.evaluate(() => window.portraitContextExtension.restoreContext());
  await ready(page);
  await capture(page, "after-context-restored");
  report.checks.contextRestored = true;
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForTimeout(300);
  const resumingDraws = await page.evaluate(() => window.portraitDraws.length);
  await page.waitForTimeout(200);
  assert.ok(await page.evaluate(() => window.portraitDraws.length) > resumingDraws);
  report.checks.motionPreferenceLive = true;

  // No hover effect must consume a touch scroll or obscure important content.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  watch(mobile);
  await mobile.goto(`${base}/de`, { waitUntil: "networkidle" });
  await ready(mobile);
  await mobile.waitForTimeout(3100);
  await capture(mobile, "after-mobile");
  if (captureScreenshots) await mobile.locator(".hero-portrait-wrap").screenshot({ path: `${out}/after-mobile-face.png` });
  report.frames.mobile = await mobile.locator(".hero-portrait-canvas").evaluate((canvas) => ({
    cssWidth: canvas.clientWidth, cssHeight: canvas.clientHeight,
    bufferWidth: canvas.width, bufferHeight: canvas.height,
    touchAction: getComputedStyle(canvas.parentElement).touchAction,
  }));
  assert.equal(report.frames.mobile.touchAction, "auto");
  assert.ok(report.frames.mobile.bufferWidth <= report.frames.mobile.cssWidth * 1.25);
  report.checks.mobileDprAndTouch = true;
  await mobile.evaluate(() => window.scrollTo(0, 250));
  await mobile.waitForTimeout(450);
  await capture(mobile, "after-mobile-visible");

  const tablet = await browser.newPage({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2 });
  watch(tablet);
  await tablet.goto(`${base}/en`, { waitUntil: "networkidle" });
  await ready(tablet);
  await tablet.waitForTimeout(3000);
  await capture(tablet, "after-tablet");
  if (captureScreenshots) await tablet.locator(".hero-portrait-wrap").screenshot({ path: `${out}/after-tablet-face.png` });

  const fallback = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await fallback.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "webgl2" || type === "webgl" ? null : getContext.call(this, type, ...args);
    };
  });
  await fallback.goto(`${base}/de`, { waitUntil: "networkidle" });
  await fallback.locator('[data-portrait-status="unavailable"]').waitFor();
  assert.ok(await fallback.locator(".hero-portrait-static").evaluate((img) => img.complete && img.naturalWidth > 0));
  await capture(fallback, "after-fallback");
  report.checks.noWebglFallback = true;

  // Malformed assets should produce the same coherent fallback, never a blank hero.
  const corrupt = await browser.newPage();
  await corrupt.route("**/assets/portrait-sculpture.bin", (route) => route.fulfill({ body: Buffer.from([0, 1, 2]) }));
  await corrupt.goto(`${base}/en`, { waitUntil: "networkidle" });
  await corrupt.locator('[data-portrait-status="unavailable"]').waitFor();
  report.checks.invalidAssetFallback = true;

  // Isolated renderer lifecycle: dispose during load, same-canvas remount,
  // bounded pointer velocity and resource release. No new test framework.
  report.checks.lifecycle = await page.evaluate(async () => {
    const { ParticlePortraitRenderer } = await import("/app/components/portrait/ParticlePortraitRenderer.ts");
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;left:0;top:0;width:480px;height:600px";
    document.body.append(canvas);
    const first = new ParticlePortraitRenderer(canvas);
    first.destroy();
    const second = new ParticlePortraitRenderer(canvas);
    second.setVisible(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    second.setPointer(240, 280);
    await new Promise((resolve) => setTimeout(resolve, 100));
    second.setPointer(470, 550);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const result = { geometries: second.renderer.info.memory.geometries,
      velocity: second.pointerVelocity.length(), programs: second.renderer.info.programs.length };
    second.destroy();
    result.releasedGeometries = second.renderer.info.memory.geometries;
    result.pendingFrame = second.animationFrameId;
    canvas.remove();
    return result;
  });
  assert.equal(report.checks.lifecycle.geometries, 1);
  assert.equal(report.checks.lifecycle.programs, 1);
  assert.ok(report.checks.lifecycle.velocity <= 1.5 + 1e-8);
  assert.equal(report.checks.lifecycle.releasedGeometries, 0);
  assert.equal(report.checks.lifecycle.pendingFrame, null);

  // Exercise React's actual effect replay, rather than only simulating disposal.
  const strict = await browser.newPage({viewport: {width:1440,height:1000}});
  watch(strict);
  await strict.goto(`${base}/en/work`, {waitUntil:"networkidle"});
  const reactPaths = await strict.evaluate(() => performance.getEntriesByType("resource")
    .map((entry) => entry.name).filter((name) => /\/react(?:-dom_client)?\.js\?/.test(name)));
  report.checks.strictMode = await strict.evaluate(async (paths) => {
    const reactUrl = paths.find((path) => /\/react\.js\?/.test(path));
    const domUrl = paths.find((path) => /\/react-dom_client\.js\?/.test(path));
    if (!reactUrl || !domUrl) throw new Error("React development modules not found");
    const reactModule = await import(reactUrl);
    const React = reactModule.default ?? reactModule;
    const domModule = await import(domUrl);
    const {createRoot} = domModule.default ?? domModule;
    const {ParticlePortraitCanvas} = await import("/app/components/portrait/ParticlePortraitCanvas.tsx");
    const host = document.createElement("div");
    host.style.cssText = "position:fixed;inset:80px auto auto 0;width:480px;height:600px";
    document.body.append(host);
    const root = createRoot(host);
    root.render(React.createElement(React.StrictMode, null, React.createElement(ParticlePortraitCanvas)));
    await new Promise((resolve) => setTimeout(resolve, 700));
    const status = host.querySelector("[data-portrait-status]")?.dataset.portraitStatus;
    root.unmount();
    host.remove();
    return {status, unmounted:true};
  }, reactPaths);
  assert.equal(report.checks.strictMode.status, "ready");

  assert.deepEqual(report.console, []);
  if (page.video()) report.video = await page.video().path();
  await context.close();
  console.log(JSON.stringify(report, null, 2));
} finally {
  writeFileSync(`${out}/qa-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
