import { readFileSync } from "node:fs";
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

async function run() {
  console.log("Testing Preview on http://localhost:3005/...");
  const res = await fetch("http://localhost:3005/", {
    headers: { Cookie: `checkpot_site_preview=${previewToken}` },
  });
  const html = await res.text();
  console.log("Status:", res.status, "HTML length:", html.length);
  console.log("Title:", html.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log("Contains 'bald für Sie da':", html.includes("bald für Sie da"));
  console.log("Contains Outfits or Mode:", html.includes("Outfit") || html.includes("Mode"));

  console.log("\nTesting Admin on http://localhost:3005/admin...");
  const adminRes = await fetch("http://localhost:3005/admin", {
    headers: { Cookie: `admin_session=${adminToken}` },
    redirect: "manual",
  });
  console.log("Admin Status:", adminRes.status);
  const adminHtml = await adminRes.text();
  console.log("Admin HTML length:", adminHtml.length);
}

run().catch(console.error);
