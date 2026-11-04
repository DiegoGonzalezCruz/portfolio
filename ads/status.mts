/*
 * READ-ONLY Google Ads report for the AI-services account: campaigns, status,
 * budget, today's and last-7-days spend, ad review state, conversion setup.
 *
 *   pnpm ads:status
 *
 * Env: same .env.ads as create-campaign.mts. Never mutates anything.
 */
import { GoogleAuth } from "google-auth-library";

const cid = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const mcc = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");
const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
if (!cid || !mcc || !devToken) throw new Error("Missing GOOGLE_ADS_* values in .env.ads");

type Row = Record<string, Record<string, unknown> | undefined>;

const token = await new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/adwords"] }).getAccessToken();

async function q(query: string): Promise<Row[]> {
  const res = await fetch(`https://googleads.googleapis.com/v25/customers/${cid}/googleAds:search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "developer-token": devToken!,
      "login-customer-id": mcc!,
    },
    body: JSON.stringify({ query }),
  });
  const json = (await res.json()) as { results?: Row[] };
  if (!res.ok) throw new Error(JSON.stringify(json).slice(0, 800));
  return json.results ?? [];
}

const usd = (micros: unknown) => `$${(Number(micros ?? 0) / 1e6).toFixed(2)}`;

const [account] = await q(
  "SELECT customer.descriptive_name, customer.currency_code, customer.time_zone, customer.auto_tagging_enabled FROM customer",
);
const a = account.customer ?? {};
console.log(`Account ${cid} "${a.descriptiveName}" · ${a.currencyCode} · ${a.timeZone} · auto-tagging ${a.autoTaggingEnabled ? "on" : "OFF"}\n`);

console.log("Campaigns:");
for (const r of await q(
  "SELECT campaign.id, campaign.name, campaign.status, campaign.primary_status, campaign_budget.amount_micros FROM campaign WHERE campaign.status != 'REMOVED'",
)) {
  const c = r.campaign ?? {};
  console.log(`  ${c.id} "${c.name}" ${c.status} (${c.primaryStatus}) · budget ${usd(r.campaignBudget?.amountMicros)}/day`);
}

for (const [label, during] of [["Today", "TODAY"], ["Last 7 days", "LAST_7_DAYS"]] as const) {
  const rows = await q(
    `SELECT campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign WHERE segments.date DURING ${during}`,
  );
  console.log(`\n${label}:`);
  if (!rows.length) console.log("  no activity");
  for (const r of rows) {
    const m = r.metrics ?? {};
    console.log(`  "${r.campaign?.name}" · ${m.impressions ?? 0} impr · ${m.clicks ?? 0} clicks · ${usd(m.costMicros)} · ${m.conversions ?? 0} conv`);
  }
}

console.log("\nAds:");
for (const r of await q(
  "SELECT campaign.name, ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.policy_summary.review_status, ad_group_ad.policy_summary.approval_status FROM ad_group_ad WHERE ad_group_ad.status != 'REMOVED'",
)) {
  const ad = r.adGroupAd as { ad?: { id?: string }; status?: string; policySummary?: { reviewStatus?: string; approvalStatus?: string } };
  console.log(`  ${ad.ad?.id} in "${r.campaign?.name}" ${ad.status} · review ${ad.policySummary?.reviewStatus} · ${ad.policySummary?.approvalStatus}`);
}

console.log("\nConversion actions:");
for (const r of await q("SELECT conversion_action.name, conversion_action.status, conversion_action.category FROM conversion_action")) {
  const c = r.conversionAction ?? {};
  console.log(`  "${c.name}" ${c.status} (${c.category})`);
}
