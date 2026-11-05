/*
 * Turn a campaign in the AI-services account on or off.
 *
 *   pnpm ads:set-status <campaignId> ENABLED|PAUSED
 *
 * Env: same .env.ads as the other scripts. Switching a campaign on spends
 * money, so only run ENABLED when Diego has asked for it.
 */
import { GoogleAuth } from "google-auth-library";

const cid = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const mcc = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");
const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
if (!cid || !mcc || !devToken) throw new Error("Missing GOOGLE_ADS_* values in .env.ads");
if (cid === "5408124416") throw new Error("Refusing to touch THINKey SpA (540-812-4416)");

const [campaignId, status] = process.argv.slice(2);
if (!/^\d+$/.test(campaignId ?? "") || !["ENABLED", "PAUSED"].includes(status ?? "")) {
  console.error("Usage: pnpm ads:set-status <campaignId> ENABLED|PAUSED");
  process.exit(1);
}

const token = await new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/adwords"] }).getAccessToken();
const res = await fetch(`https://googleads.googleapis.com/v25/customers/${cid}/campaigns:mutate`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "developer-token": devToken,
    "login-customer-id": mcc,
  },
  body: JSON.stringify({
    operations: [
      { update: { resourceName: `customers/${cid}/campaigns/${campaignId}`, status }, updateMask: "status" },
    ],
  }),
});
const json = await res.json();
if (!res.ok) throw new Error(JSON.stringify(json).slice(0, 800));
console.log(`Campaign ${campaignId} → ${status}`);
