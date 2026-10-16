import { chromium } from "playwright";
import assert from "node:assert/strict";

const base = process.env.PORTFOLIO_URL || "http://localhost:5173";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log("Starting navigation regression tests...");

// 1. Visit homepage
await page.goto(`${base}/de`, { waitUntil: "networkidle" });
console.log("1. Loaded homepage /de successfully.");

// 2. Click 'Arbeiten'
const workLink = page.locator("header.global-header a:has-text('Arbeiten')").first();
await workLink.click();
await page.waitForURL("**/de/work");
console.log("2. Navigated to /de/work successfully.");

// 3. From /de/work, click 'Über mich'
const aboutLink = page.locator("header.global-header a:has-text('Über mich')").first();
await aboutLink.click();
await page.waitForURL("**/de#about");
console.log("3. Navigated from /de/work back to /de#about successfully.");

// 4. Click 'Checkpot Hietzing' lead project
const checkpotLink = page.locator("a[href*='checkpot-hietzing']").first();
await checkpotLink.click();
await page.waitForURL("**/de/work/checkpot-hietzing");
console.log("4. Navigated to Client Case Study Checkpot Hietzing successfully.");

// 5. From case study, click WILK brand link to return to home
const brandLink = page.locator("header.global-header a.brand-link").first();
await brandLink.click();
await page.waitForURL("**/de");
console.log("5. Returned to homepage via brand link successfully.");

// 6. Click LUMENWERK Studio in The Lab
const lumenwerkLink = page.locator("a[href*='lumenwerk-studio']").first();
await lumenwerkLink.click();
await page.waitForURL("**/de/work/lumenwerk-studio");
console.log("6. Navigated to Lab Case Study LUMENWERK successfully.");

// 7. From Lab case study, click 'Kontakt'
const contactLink = page.locator("header.global-header a:has-text('Kontakt')").first();
await contactLink.click();
await page.waitForURL("**/de/contact");
console.log("7. Navigated to /de/contact successfully.");

// 8. Test language switcher
const langSwitch = page.getByRole("banner").getByRole("link", { name: "Switch to English" });
await langSwitch.click();
await page.waitForURL("**/en/contact");
console.log("8. Language switched to /en/contact successfully.");

await browser.close();
console.log("All navigation regression tests passed with 100% success!");
