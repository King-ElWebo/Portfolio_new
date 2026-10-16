import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";
import { createHmac } from "node:crypto";

const env = readFileSync("C:/Users/wilkb/Desktop/Projekte/checkpot/website/.env.local", "utf8");
const secretMatch = env.match(/^AUTH_SECRET=(.*)$/m);
const secret = secretMatch ? secretMatch[1].trim().replace(/^["']|["']$/g, "") : "secret";

function makeToken(payload) {
  const headerB64 = Buffer.from(JSON.stringify({ alg: "HS256" })).toString("base64url");
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret).update(headerB64 + "." + payloadB64).digest("base64url");
  return `${headerB64}.${payloadB64}.${sig}`;
}

const now = Math.floor(Date.now() / 1000);
const previewToken = makeToken({
  role: "admin",
  scope: "site_preview",
  sub: "admin-preview",
  iss: "customer-site-platform",
  aud: "customer-site-preview",
  iat: now,
  exp: now + 7200,
});

const adminToken = makeToken({
  role: "admin",
  sub: "admin",
  iss: "customer-site-platform",
  aud: "customer-site-admin",
  iat: now,
  exp: now + 7200,
});

const targetDir = "public/assets/projects/checkpot";
mkdirSync(targetDir, { recursive: true });

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Capture Desktop Finished Website (1440px)
  console.log("Capturing authentic desktop website...");
  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: {
      cookies: [
        {
          name: "checkpot_site_preview",
          value: previewToken,
          domain: "localhost",
          path: "/",
        },
        {
          name: "checkpot_consent",
          value: encodeURIComponent(JSON.stringify({ version: 2, necessary: true, analytics: false, externalMedia: true })),
          domain: "localhost",
          path: "/",
        }
      ],
      origins: []
    }
  });

  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto("http://localhost:3005/", { waitUntil: "networkidle" });
  await pageDesktop.waitForTimeout(2000);

  // Remove preview banner & consent aside for pristine portfolio presentation
  await pageDesktop.evaluate(() => {
    document.querySelectorAll('aside, [aria-label*="Datenschutz"], [data-preview-banner], header + div').forEach(el => el.remove());
    document.querySelectorAll('*').forEach(el => {
      if (el.tagName === 'ASIDE' || el.textContent?.includes('Ihre Privatsphäre') || el.textContent?.includes('Vorschau-Modus')) {
        const closestAside = el.closest('aside') || el;
        closestAside.remove();
      }
    });
  });

  await pageDesktop.waitForTimeout(500);
  await pageDesktop.screenshot({ path: `${targetDir}/checkpot-redesign-desktop-authentic.png`, fullPage: false });
  await pageDesktop.screenshot({ path: `${targetDir}/checkpot-redesign-desktop-fullpage.png`, fullPage: true });

  // 2. Capture Mobile Finished Website (390px)
  console.log("Capturing authentic mobile website...");
  const contextMobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: {
      cookies: [
        {
          name: "checkpot_site_preview",
          value: previewToken,
          domain: "localhost",
          path: "/",
        }
      ],
      origins: []
    }
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto("http://localhost:3005/", { waitUntil: "networkidle" });
  await pageMobile.waitForTimeout(2000);
  await pageMobile.evaluate(() => {
    document.querySelectorAll('aside, [aria-label*="Datenschutz"], [data-preview-banner], header + div').forEach(el => el.remove());
    document.querySelectorAll('*').forEach(el => {
      if (el.tagName === 'ASIDE' || el.textContent?.includes('Ihre Privatsphäre') || el.textContent?.includes('Vorschau-Modus')) {
        const closestAside = el.closest('aside') || el;
        closestAside.remove();
      }
    });
  });
  await pageMobile.waitForTimeout(500);
  await pageMobile.screenshot({ path: `${targetDir}/checkpot-redesign-mobile-authentic.png`, fullPage: false });

  // 3. Capture Authentic Admin Dashboard
  console.log("Capturing authentic admin dashboard...");
  const contextAdmin = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: {
      cookies: [
        {
          name: "admin_session",
          value: adminToken,
          domain: "localhost",
          path: "/",
        }
      ],
      origins: []
    }
  });

  const pageAdmin = await contextAdmin.newPage();
  await pageAdmin.goto("http://localhost:3005/admin", { waitUntil: "networkidle" });
  await pageAdmin.waitForTimeout(2000);
  await pageAdmin.screenshot({ path: `${targetDir}/checkpot-admin-dashboard-authentic.png` });

  // Also check admin outfits or store
  try {
    await pageAdmin.goto("http://localhost:3005/admin/outfits", { waitUntil: "networkidle" });
    await pageAdmin.waitForTimeout(1500);
    await pageAdmin.screenshot({ path: `${targetDir}/checkpot-admin-outfits-authentic.png` });
  } catch (e) {
    console.log("Admin outfits error:", e.message);
  }

  try {
    await pageAdmin.goto("http://localhost:3005/admin/store", { waitUntil: "networkidle" });
    await pageAdmin.waitForTimeout(1500);
    await pageAdmin.screenshot({ path: `${targetDir}/checkpot-admin-store-authentic.png` });
  } catch (e) {
    console.log("Admin store error:", e.message);
  }

  await browser.close();
  console.log("Authentic screenshots captured successfully!");
}

capture().catch(console.error);
