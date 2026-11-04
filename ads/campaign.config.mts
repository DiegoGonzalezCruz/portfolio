/*
 * Google Ads Search campaign for AI services, declared as reviewable config.
 * `node ads/create-campaign.mts` validates it against the API (nothing is
 * created); `--apply` creates it PAUSED. Diego enables it in the Ads UI.
 *
 * Copy rules: every claim must be backed by the site (/ai, Nelson's
 * recommendation, the CV). No prices, guarantees or "free" offers.
 * Limits: headline ≤30 chars (3–15), description ≤90 (2–4), path ≤15,
 * sitelink text ≤25 / description lines ≤35, callout ≤25, snippet value ≤25.
 */

export type MatchType = "PHRASE" | "EXACT";

export type AdGroupSpec = {
  name: string;
  keywords: string[];
  headlines: string[];
  descriptions: string[];
};

export const campaign = {
  name: "AI services · CT + Springfield · Search",
  dailyBudgetUsd: 10,
  // Maximize Clicks with a ceiling: at $10/day an uncapped $25 click would eat
  // most of a day's budget. Top-of-page estimates for these terms run ~$9–31.
  cpcCeilingUsd: 12,
  matchTypes: ["PHRASE", "EXACT"] as MatchType[],
  geo: [
    { name: "Connecticut", type: "State", within: "United States" },
    { name: "Hampden County", type: "County", within: "Massachusetts" }, // Springfield area
  ],
  languageConstant: "languageConstants/1000", // English
  finalUrl: "https://www.chileandeveloper.com/ai",
  finalUrlSuffix: "utm_source=google&utm_medium=cpc&utm_campaign=ai_ct_springfield",
  path1: "ai",
  path2: "connecticut",

  conversionActionName: "Contact form lead (website)",

  // Campaign-level negatives (phrase match). Keyword Planner showed AI terms
  // drifting toward jobs, courses, tools and the AICPA.
  negatives: [
    "jobs", "job", "career", "careers", "salary", "hiring", "intern", "internship",
    "course", "courses", "certification", "certificate", "degree", "bootcamp",
    "free", "tutorial", "how to", "pdf", "examples", "reddit", "youtube", "wikipedia",
    "stock", "stocks", "etf", "image generator", "video generator", "art generator",
    "login", "app", "apk", "download", "aicpa", "cpa exam", "for students",
    "homework", "essay", "ai detector", "accounting software", "ai software",
  ],

  adGroups: [
    {
      name: "AI consulting & automation",
      keywords: [
        "ai consultant",
        "ai consulting",
        "ai consulting services",
        "ai consultant for small business",
        "ai automation services",
        "ai automation consultant",
        "ai automation for business",
        "workflow automation consultant",
        "business process automation consultant",
        "ai implementation consultant",
        "ai integration services",
      ],
      headlines: [
        "AI Consultant in Connecticut",
        "Practical AI for Your Business",
        "AI Automation for Your Team",
        "Workflow Automation with AI",
        "Principal Software Engineer",
        "I Build AI Products",
        "Serving CT & Springfield, MA",
        "Real Projects, No Playbooks",
        "Automate Recurring Reports",
        "Honest About Where AI Fits",
        "AI Assistants for Customers",
        "Based in Avon, Connecticut",
        "Tell Me Where the Hours Go",
        "Hands-On AI Enablement",
        "Start With a Short Note",
      ],
      descriptions: [
        "Weekly working sessions on your real projects. Find where AI adds leverage, then build it.",
        "Automate recurring reporting and reviews, with dashboards your team runs on its own.",
        "A principal software engineer who builds AI products. Serving CT and Springfield, MA.",
        "Plain answers on where AI helps your business and where it doesn't.",
      ],
    },
    {
      name: "AI for accounting & finance",
      keywords: [
        "ai for accountants",
        "ai for accounting firms",
        "ai for cpa firms",
        "ai in accounting",
        "ai for finance teams",
        "ai for bookkeeping",
        "accounting automation consultant",
        "automate financial reporting",
        "ai for financial reporting",
      ],
      headlines: [
        "AI for Accounting Teams",
        "AI for CPA & Finance Teams",
        "Automate Monthly Reporting",
        "Automate Reviews & Reports",
        "Practical AI for Finance",
        "Recommended by a CPA",
        "Dashboards Your Team Runs",
        "Workflows You Can Trust",
        "Serving CT & Springfield, MA",
        "Principal Software Engineer",
        "Hands-On AI Training",
        "Real Projects, No Playbooks",
        "Know When Not to Trust AI",
        "Based in Avon, Connecticut",
        "Start With a Short Note",
      ],
      descriptions: [
        "Automate recurring reporting and review work that eats hours every month.",
        "Weekly sessions on your real work: prompts that hold up, data you can trust.",
        "Recommended by a CPA client whose team now runs its own dashboards and workflows.",
        "A principal software engineer who builds AI products. Serving CT and Springfield, MA.",
      ],
    },
    {
      name: "AI training for teams",
      keywords: [
        "ai training for employees",
        "ai training for business",
        "ai training for teams",
        "chatgpt training for business",
        "chatgpt training for employees",
        "corporate ai training",
        "generative ai training for business",
        "ai workshop for business",
      ],
      headlines: [
        "AI Training for Your Team",
        "Hands-On AI Enablement",
        "Weekly Sessions on Real Work",
        "Learn How LLMs Really Work",
        "Prompts That Hold Up",
        "Teams Capable With AI",
        "Not Just Impressed by AI",
        "Serving CT & Springfield, MA",
        "Principal Software Engineer",
        "Workflows Your Team Owns",
        "Based in Avon, Connecticut",
        "Start With a Short Note",
        "Practical AI for Your Team",
        "Honest About Where AI Fits",
        "I Build AI Products",
      ],
      descriptions: [
        "Weekly working sessions on your team's real projects, not a canned playbook.",
        "How LLMs work, prompts that hold up, and judging context and data quality.",
        "Leave with workflows and dashboards your team runs on its own.",
        "A principal software engineer who builds AI products. Serving CT and Springfield, MA.",
      ],
    },
  ] satisfies AdGroupSpec[],

  sitelinks: [
    { text: "Client results", line1: "Automated reporting for a CPA", line2: "Read the recommendation", url: "https://www.chileandeveloper.com/ai#results" },
    { text: "What I do", line1: "Enablement and automation", line2: "Plus AI assistants", url: "https://www.chileandeveloper.com/ai#offers" },
    { text: "Past work", line1: "NISA, THINKey, client sites", line2: "Platforms I lead and build", url: "https://www.chileandeveloper.com/#work" },
    { text: "Get in touch", line1: "Tell me where the hours go", line2: "A short note is enough", url: "https://www.chileandeveloper.com/ai#contact" },
  ],
  callouts: [
    "Based in Avon, CT",
    "Weekly working sessions",
    "Serving Springfield, MA",
    "Real projects, not demos",
    "Principal-level engineer",
  ],
  snippet: {
    header: "Services",
    values: ["AI enablement", "Workflow automation", "AI assistants", "Team training"],
  },
};
