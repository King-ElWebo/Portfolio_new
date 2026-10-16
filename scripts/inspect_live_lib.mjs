import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("Navigating to https://www.letitbloom.at/ ...");
  await page.goto("https://www.letitbloom.at/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Check cookie banner details
  const banner = await page.$('section[aria-label*="Cookie"], [aria-label*="Datenschutz"], div:has-text("Ihre Privatsphäre")');
  console.log("Cookie banner found?", !!banner);
  if (banner) {
    const text = await banner.innerText();
    console.log("Banner text excerpt:", text.slice(0, 150));
    const buttons = await banner.$$eval("button", (btns) => btns.map((b) => b.innerText.trim()));
    console.log("Banner buttons:", buttons);
  }

  // Check headings and sections on the site
  const headings = await page.$$eval("h1, h2, h3", (els) => els.map((el) => ({
    tag: el.tagName,
    text: el.innerText.trim().replace(/\n+/g, " "),
  })));
  console.log("Headings found:", headings);

  // Check navigation links
  const navLinks = await page.$$eval("nav a, header a", (els) => els.map((el) => ({
    text: el.innerText.trim(),
    href: el.getAttribute("href"),
  })));
  console.log("Navigation links:", navLinks);

  // Check section elements or IDs
  const sections = await page.$$eval("section", (els) => els.map((el) => ({
    id: el.id,
    className: el.className,
    ariaLabel: el.getAttribute("aria-label"),
  })));
  console.log("Sections found:", sections);

  await browser.close();
}

main().catch(console.error);
