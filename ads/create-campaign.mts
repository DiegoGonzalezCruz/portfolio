/*
 * Create the AI-services Search campaign from ads/campaign.config.mts.
 *
 *   pnpm ads:campaign            validate only: Google checks every operation, nothing is created
 *   pnpm ads:campaign --apply    create it, PAUSED, plus the "Contact form lead" conversion action
 *
 * Env (in .env.ads, gitignored): GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID
 * (the new USD account), GOOGLE_ADS_LOGIN_CUSTOMER_ID (THINKey manager 669-541-0586).
 * Auth: gcloud application-default credentials with the adwords scope.
 */
import { GoogleAuth } from "google-auth-library";
import { campaign } from "./campaign.config.mts";

const API = "https://googleads.googleapis.com/v25";
const THINKEY_SPA = "5408124416"; // Chilean operating account: never target it from here
const apply = process.argv.includes("--apply");

function env(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name} (see the header of ads/create-campaign.mts)`);
  return value;
}

const developerToken = env("GOOGLE_ADS_DEVELOPER_TOKEN");
const cid = env("GOOGLE_ADS_CUSTOMER_ID").replace(/-/g, "");
const loginCid = env("GOOGLE_ADS_LOGIN_CUSTOMER_ID").replace(/-/g, "");
if (cid === THINKEY_SPA) throw new Error("Refusing to run against THINKey SpA (5408124416).");

let accessToken: string | undefined;
async function token() {
  if (!accessToken) {
    const auth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/adwords"] });
    accessToken = (await auth.getAccessToken()) ?? undefined;
    if (!accessToken) throw new Error("No access token from application-default credentials.");
  }
  return accessToken;
}

type GeoTarget = { resourceName: string; canonicalName: string; targetType?: string };
type SearchRow = {
  customer?: {
    descriptiveName?: string;
    currencyCode?: string;
    timeZone?: string;
    manager?: boolean;
    autoTaggingEnabled?: boolean;
  };
  conversionAction?: { tagSnippets?: unknown };
};
type ApiResponse = {
  results?: SearchRow[];
  geoTargetConstantSuggestions?: { geoTargetConstant?: GeoTarget }[];
  mutateOperationResponses?: { campaignResult?: { resourceName: string } }[];
};

async function post(path: string, body: unknown): Promise<ApiResponse> {
  const res = await fetch(`${API}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token()}`,
      "developer-token": developerToken,
      "login-customer-id": loginCid,
    },
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  if (!res.ok) throw new Error(`Ads API ${res.status} on ${path}:\n${raw.slice(0, 3000)}`);
  return raw ? (JSON.parse(raw) as ApiResponse) : {};
}

async function search(query: string) {
  const res = await post(`customers/${cid}/googleAds:search`, { query });
  return res.results ?? [];
}

// --- Local checks: fail before any API call if the copy breaks Ads limits ----
function checkLimits() {
  const problems: string[] = [];
  const max = (label: string, text: string, n: number) => {
    if (text.length > n) problems.push(`${label} is ${text.length}/${n}: "${text}"`);
  };
  for (const group of campaign.adGroups) {
    if (group.headlines.length < 3 || group.headlines.length > 15)
      problems.push(`${group.name}: needs 3–15 headlines`);
    if (group.descriptions.length < 2 || group.descriptions.length > 4)
      problems.push(`${group.name}: needs 2–4 descriptions`);
    group.headlines.forEach((h) => max(`${group.name} headline`, h, 30));
    group.descriptions.forEach((d) => max(`${group.name} description`, d, 90));
    if (new Set(group.headlines).size !== group.headlines.length)
      problems.push(`${group.name}: duplicate headlines`);
  }
  max("path1", campaign.path1, 15);
  max("path2", campaign.path2, 15);
  campaign.sitelinks.forEach((s) => {
    max("sitelink text", s.text, 25);
    max("sitelink line", s.line1, 35);
    max("sitelink line", s.line2, 35);
  });
  campaign.callouts.forEach((c) => max("callout", c, 25));
  campaign.snippet.values.forEach((v) => max("snippet value", v, 25));
  if (problems.length) throw new Error(`Config breaks Ads limits:\n- ${problems.join("\n- ")}`);
}

async function resolveGeo(name: string, type: string, within: string) {
  const res = await post("geoTargetConstants:suggest", {
    locale: "en",
    countryCode: "US",
    locationNames: { names: [name] },
  });
  const match = (res.geoTargetConstantSuggestions ?? [])
    .map((s) => s.geoTargetConstant)
    .find((g) => g?.targetType === type && g.canonicalName.includes(within));
  if (!match) throw new Error(`Could not resolve ${name} (${type}, in ${within})`);
  return match;
}

async function main() {
  checkLimits();

  // Guard: the right account, in USD, not a manager.
  const [account] = await search(
    "SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone, customer.manager, customer.auto_tagging_enabled FROM customer",
  );
  const c = account?.customer;
  console.log(
    `Account: ${c?.descriptiveName} (${cid}) · ${c?.currencyCode} · ${c?.timeZone} · auto-tagging ${c?.autoTaggingEnabled ? "on" : "OFF"}`,
  );
  if (c?.currencyCode !== "USD") throw new Error(`Refusing: account currency is ${c?.currencyCode}, expected USD.`);
  if (c?.manager) throw new Error("Refusing: that's a manager account; use the client account ID.");

  const existing = await search(
    `SELECT campaign.id FROM campaign WHERE campaign.name = '${campaign.name.replace(/'/g, "\\'")}' AND campaign.status != 'REMOVED'`,
  );
  if (existing.length) throw new Error(`A campaign named "${campaign.name}" already exists; nothing to do.`);

  const geos = await Promise.all(campaign.geo.map((g) => resolveGeo(g.name, g.type, g.within)));
  geos.forEach((g) => console.log(`Geo: ${g.canonicalName} -> ${g.resourceName}`));

  const r = (kind: string, id: number) => `customers/${cid}/${kind}/${id}`;
  const budgetRes = r("campaignBudgets", -1);
  const campaignRes = r("campaigns", -2);
  const ops: unknown[] = [];

  ops.push({
    campaignBudgetOperation: {
      create: {
        resourceName: budgetRes,
        name: `${campaign.name} budget`,
        amountMicros: String(campaign.dailyBudgetUsd * 1_000_000),
        deliveryMethod: "STANDARD",
        explicitlyShared: false,
      },
    },
  });
  ops.push({
    campaignOperation: {
      create: {
        resourceName: campaignRes,
        name: campaign.name,
        status: "PAUSED",
        advertisingChannelType: "SEARCH",
        campaignBudget: budgetRes,
        targetSpend: { cpcBidCeilingMicros: String(campaign.cpcCeilingUsd * 1_000_000) },
        networkSettings: {
          targetGoogleSearch: true,
          targetSearchNetwork: false,
          targetContentNetwork: false,
          targetPartnerSearchNetwork: false,
        },
        // People in (or regularly in) the area, not just "interested in" it.
        geoTargetTypeSetting: { positiveGeoTargetType: "PRESENCE", negativeGeoTargetType: "PRESENCE" },
        finalUrlSuffix: campaign.finalUrlSuffix,
        containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
      },
    },
  });
  for (const g of geos) {
    ops.push({ campaignCriterionOperation: { create: { campaign: campaignRes, location: { geoTargetConstant: g.resourceName } } } });
  }
  ops.push({ campaignCriterionOperation: { create: { campaign: campaignRes, language: { languageConstant: campaign.languageConstant } } } });
  for (const text of campaign.negatives) {
    ops.push({ campaignCriterionOperation: { create: { campaign: campaignRes, negative: true, keyword: { text, matchType: "PHRASE" } } } });
  }

  campaign.adGroups.forEach((group, i) => {
    const adGroupRes = r("adGroups", -10 - i);
    ops.push({
      adGroupOperation: {
        create: { resourceName: adGroupRes, name: group.name, campaign: campaignRes, type: "SEARCH_STANDARD", status: "ENABLED" },
      },
    });
    for (const text of group.keywords) {
      for (const matchType of campaign.matchTypes) {
        ops.push({ adGroupCriterionOperation: { create: { adGroup: adGroupRes, status: "ENABLED", keyword: { text, matchType } } } });
      }
    }
    ops.push({
      adGroupAdOperation: {
        create: {
          adGroup: adGroupRes,
          status: "ENABLED",
          ad: {
            finalUrls: [campaign.finalUrl],
            responsiveSearchAd: {
              headlines: group.headlines.map((text) => ({ text })),
              descriptions: group.descriptions.map((text) => ({ text })),
              path1: campaign.path1,
              path2: campaign.path2,
            },
          },
        },
      },
    });
  });

  let assetId = -100;
  const linkAsset = (asset: Record<string, unknown>, fieldType: string) => {
    const resourceName = r("assets", assetId--);
    ops.push({ assetOperation: { create: { resourceName, ...asset } } });
    ops.push({ campaignAssetOperation: { create: { campaign: campaignRes, asset: resourceName, fieldType } } });
  };
  for (const s of campaign.sitelinks) {
    linkAsset({ finalUrls: [s.url], sitelinkAsset: { linkText: s.text, description1: s.line1, description2: s.line2 } }, "SITELINK");
  }
  for (const text of campaign.callouts) linkAsset({ calloutAsset: { calloutText: text } }, "CALLOUT");
  linkAsset({ structuredSnippetAsset: { header: campaign.snippet.header, values: campaign.snippet.values } }, "STRUCTURED_SNIPPET");

  const keywordCount = campaign.adGroups.reduce((n, g) => n + g.keywords.length * campaign.matchTypes.length, 0);
  console.log(
    `\nPlan: 1 Search campaign (PAUSED), $${campaign.dailyBudgetUsd}/day, Maximize Clicks with $${campaign.cpcCeilingUsd} CPC cap, ` +
      `${geos.length} locations, ${campaign.negatives.length} negatives, ${campaign.adGroups.length} ad groups, ` +
      `${keywordCount} keywords, ${campaign.adGroups.length} responsive search ads, ` +
      `${campaign.sitelinks.length} sitelinks, ${campaign.callouts.length} callouts, 1 snippet · ${ops.length} operations`,
  );

  const result = await post(`customers/${cid}/googleAds:mutate`, { mutateOperations: ops, validateOnly: !apply });
  if (!apply) {
    console.log("✓ Google validated every operation. Nothing was created. Re-run with --apply to create it PAUSED.");
  } else {
    const created = (result.mutateOperationResponses ?? []).find((x) => x.campaignResult)?.campaignResult;
    console.log(`✓ Created PAUSED: ${created?.resourceName}`);
  }

  // Conversion action for genuine contact-form leads.
  const existingConversion = await search(
    `SELECT conversion_action.id FROM conversion_action WHERE conversion_action.name = '${campaign.conversionActionName}'`,
  );
  if (!existingConversion.length) {
    await post(`customers/${cid}/conversionActions:mutate`, {
      operations: [
        {
          create: {
            name: campaign.conversionActionName,
            type: "WEBPAGE",
            category: "SUBMIT_LEAD_FORM",
            status: "ENABLED",
            countingType: "ONE_PER_CLICK",
            primaryForGoal: true,
          },
        },
      ],
      validateOnly: !apply,
    });
    console.log(apply ? "✓ Created conversion action." : "✓ Conversion action validated.");
  }

  if (apply) {
    const [snippetRow] = await search(
      `SELECT conversion_action.tag_snippets FROM conversion_action WHERE conversion_action.name = '${campaign.conversionActionName}'`,
    );
    const snippets = JSON.stringify(snippetRow?.conversionAction?.tagSnippets ?? []);
    const sendTo = snippets.match(/AW-\d+\/[\w-]+/)?.[0];
    if (sendTo) {
      const [id, label] = sendTo.split("/");
      console.log(`\nSet on Vercel (production):\n  NEXT_PUBLIC_GOOGLE_ADS_ID=${id}\n  NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=${label}`);
    } else {
      console.log("Could not read the conversion tag snippet; get the send_to value from the Ads UI.");
    }
  }
}

main().catch((error) => {
  console.error(String(error?.message ?? error));
  process.exit(1);
});
