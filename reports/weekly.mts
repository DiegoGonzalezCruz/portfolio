/*
 * Weekly report for chileandeveloper.com: Google Ads (AI-services account)
 * plus Search Console organic search. READ-ONLY on both Google APIs.
 *
 *   pnpm report:weekly            # print it
 *   pnpm report:weekly --email    # print it and email it to site.email via SES
 *
 * Runs every Monday from a macOS LaunchAgent (see reports/install-schedule.sh).
 *
 * Needs:
 * - .env.ads (same as ads/*.mts)
 * - gcloud ADC with the adwords and webmasters.readonly scopes
 * - for --email, the AWS default profile (THINKey account)
 *
 * A section that fails is reported inside the email rather than silently
 * dropped, and the process exits non-zero so the launchd log shows it.
 */
import { GoogleAuth } from "google-auth-library";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { site } from "../src/data/site.ts";

const cid = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const mcc = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");
const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
if (!cid || !mcc || !devToken) throw new Error("Missing GOOGLE_ADS_* values in .env.ads");

const SC_SITE = "sc-domain:chileandeveloper.com";
const TZ = "America/New_York";
const sendEmail = process.argv.includes("--email");

// ---- dates (YYYY-MM-DD in the account's timezone) --------------------------

const todayET = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
const shift = (ymd: string, days: number) => {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
type Range = { start: string; end: string };
const week = (end: string): [Range, Range] => [
  { start: shift(end, -6), end },
  { start: shift(end, -13), end: shift(end, -7) },
];
// Ads: the last 7 complete days. Search Console data lags ~2–3 days, so its week ends earlier.
const [adsNow, adsPrev] = week(shift(todayET, -1));
const [scNow, scPrev] = week(shift(todayET, -3));
const label = (r: Range) =>
  `${new Date(`${r.start}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}–` +
  new Date(`${r.end}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

// ---- helpers ---------------------------------------------------------------

const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/adwords", "https://www.googleapis.com/auth/webmasters.readonly"],
});
const token = await auth.getAccessToken();

type Row = Record<string, Record<string, unknown> | undefined>;
async function ads(query: string): Promise<Row[]> {
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
  if (!res.ok) throw new Error(`Google Ads ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);
  return json.results ?? [];
}

type ScRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };
async function sc(range: Range, dimensions: string[] = [], rowLimit = 10): Promise<ScRow[]> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SC_SITE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ startDate: range.start, endDate: range.end, dimensions, rowLimit }),
    },
  );
  const json = (await res.json()) as { rows?: ScRow[] };
  if (!res.ok) throw new Error(`Search Console ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);
  return json.rows ?? [];
}

const n = (v: unknown) => Number(v ?? 0);
const usd = (micros: number) => `$${(micros / 1e6).toFixed(2)}`;
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
/** "12 (last week 8)" — the comparison is what makes a small number readable. */
const vs = (now: string, prev: string) => (now === prev ? now : `${now}  (last week ${prev})`);
const trunc = (s: string, len: number) => (s.length > len ? `${s.slice(0, len - 1)}…` : s);

const out: string[] = [];
const problems: string[] = [];
const say = (line = "") => out.push(line);

// ---- Google Ads ------------------------------------------------------------

let subjectAds = "";
try {
  say(`GOOGLE ADS · ${label(adsNow)}`);
  say("─".repeat(60));

  for (const r of await ads(
    "SELECT campaign.name, campaign.status, campaign.primary_status, campaign_budget.amount_micros FROM campaign WHERE campaign.status != 'REMOVED'",
  )) {
    const c = r.campaign ?? {};
    say(`${c.name}: ${c.status} (${c.primaryStatus}) · ${usd(n(r.campaignBudget?.amountMicros))}/day`);
  }
  say();

  const totals = async (r: Range) => {
    const rows = await ads(
      `SELECT metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign WHERE campaign.status != 'REMOVED' AND segments.date BETWEEN '${r.start}' AND '${r.end}'`,
    );
    return rows.reduce(
      (t, row) => ({
        impr: t.impr + n(row.metrics?.impressions),
        clicks: t.clicks + n(row.metrics?.clicks),
        cost: t.cost + n(row.metrics?.costMicros),
        conv: t.conv + n(row.metrics?.conversions),
      }),
      { impr: 0, clicks: 0, cost: 0, conv: 0 },
    );
  };
  const [now, prev] = await Promise.all([totals(adsNow), totals(adsPrev)]);
  const ctr = (t: typeof now) => (t.impr ? pct(t.clicks / t.impr) : "–");
  const cpc = (t: typeof now) => (t.clicks ? usd(t.cost / t.clicks) : "–");
  const cpl = (t: typeof now) => (t.conv ? usd(t.cost / t.conv) : "–");

  say(`Impressions   ${vs(String(now.impr), String(prev.impr))}`);
  say(`Clicks        ${vs(String(now.clicks), String(prev.clicks))}`);
  say(`CTR           ${vs(ctr(now), ctr(prev))}`);
  say(`Spend         ${vs(usd(now.cost), usd(prev.cost))}`);
  say(`Avg. CPC      ${vs(cpc(now), cpc(prev))}`);
  say(`Leads         ${vs(String(Math.round(now.conv)), String(Math.round(prev.conv)))}   (contact-form sends from ad clicks)`);
  say(`Cost / lead   ${vs(cpl(now), cpl(prev))}`);
  subjectAds = `${now.clicks} ad clicks · ${usd(now.cost)} · ${Math.round(now.conv)} lead${Math.round(now.conv) === 1 ? "" : "s"}`;

  const notApproved = (
    await ads(
      "SELECT ad_group_ad.ad.id, ad_group.name, ad_group_ad.policy_summary.approval_status FROM ad_group_ad WHERE campaign.status != 'REMOVED' AND ad_group_ad.status = 'ENABLED'",
    )
  ).filter((r) => r.adGroupAd?.policySummary && (r.adGroupAd.policySummary as Record<string, unknown>).approvalStatus !== "APPROVED");
  if (notApproved.length) {
    say();
    for (const r of notApproved) {
      const status = (r.adGroupAd?.policySummary as Record<string, unknown>).approvalStatus;
      say(`⚠ Ad in "${r.adGroup?.name}" is ${status}`);
    }
  }

  const terms = await ads(
    `SELECT search_term_view.search_term, search_term_view.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE campaign.status != 'REMOVED' AND segments.date BETWEEN '${adsNow.start}' AND '${adsNow.end}' ORDER BY metrics.clicks DESC, metrics.impressions DESC LIMIT 15`,
  );
  say();
  say("What people searched (candidates for negative keywords):");
  if (!terms.length) say("  none yet");
  for (const r of terms) {
    const m = r.metrics ?? {};
    say(
      `  ${trunc(String(r.searchTermView?.searchTerm), 38).padEnd(38)} ${String(n(m.clicks)).padStart(3)} clk ${String(n(m.impressions)).padStart(4)} impr ${usd(n(m.costMicros)).padStart(7)}${n(m.conversions) ? `  ${n(m.conversions)} lead` : ""}`,
    );
  }
} catch (err) {
  problems.push(`Google Ads: ${(err as Error).message}`);
  say(`⚠ Couldn't load Google Ads: ${(err as Error).message}`);
}

// ---- Search Console ----------------------------------------------------------

say();
say(`GOOGLE SEARCH (organic) · ${label(scNow)}`);
say("─".repeat(60));
try {
  const [[now], [prev]] = await Promise.all([sc(scNow), sc(scPrev)]);
  const z = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const a = now ?? z;
  const b = prev ?? z;
  say(`Clicks        ${vs(String(a.clicks), String(b.clicks))}`);
  say(`Impressions   ${vs(String(a.impressions), String(b.impressions))}`);
  say(`Avg. position ${vs(a.position ? a.position.toFixed(1) : "–", b.position ? b.position.toFixed(1) : "–")}`);

  const [queries, pages] = await Promise.all([sc(scNow, ["query"], 10), sc(scNow, ["page"], 5)]);
  say();
  say("Top searches:");
  if (!queries.length) say("  none yet");
  for (const r of queries) {
    say(`  ${trunc(r.keys?.[0] ?? "", 38).padEnd(38)} ${String(r.clicks).padStart(3)} clk ${String(r.impressions).padStart(4)} impr  pos ${r.position.toFixed(1)}`);
  }
  say();
  say("Pages:");
  if (!pages.length) say("  none yet");
  for (const r of pages) {
    const path = (r.keys?.[0] ?? "").replace(/^https?:\/\/(www\.)?chileandeveloper\.com/, "") || "/";
    say(`  ${trunc(path, 38).padEnd(38)} ${String(r.clicks).padStart(3)} clk ${String(r.impressions).padStart(4)} impr`);
  }
} catch (err) {
  problems.push(`Search Console: ${(err as Error).message}`);
  say(`⚠ Couldn't load Search Console: ${(err as Error).message}`);
}

say();
say("Run `pnpm ads:status` for live detail; edit ads/campaign.config.mts to add negatives.");

const text = out.join("\n");
console.log(text);

// ---- email -------------------------------------------------------------------

if (sendEmail) {
  const subject = `chileandeveloper.com weekly · ${label(adsNow)}${subjectAds ? ` · ${subjectAds}` : ""}${problems.length ? " · ⚠ incomplete" : ""}`;
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  await new SESv2Client({ region: "us-east-1" }).send(
    new SendEmailCommand({
      FromEmailAddress: `Weekly report <${site.email}>`,
      Destination: { ToAddresses: [site.email] },
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: text, Charset: "UTF-8" },
            // <pre> on purpose: the columns are aligned with padStart/padEnd.
            Html: {
              Data: `<pre style="font:13px/1.45 ui-monospace,Menlo,monospace">${escaped}</pre>`,
              Charset: "UTF-8",
            },
          },
        },
      },
    }),
  );
  console.log(`\n✉ Sent to ${site.email}`);
}

if (problems.length) process.exitCode = 1;
