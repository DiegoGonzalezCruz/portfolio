export type Service = {
  id: "websites" | "ai";
  eyebrow: string;
  title: string;
  summary: string;
  items: string[];
  link?: { href: string; label: string };
};

export const services: Service[] = [
  {
    id: "websites",
    eyebrow: "Websites",
    title: "Websites that load fast and turn visitors into customers",
    summary:
      "New sites and redesigns for local businesses, built with the same engineering I use on production software.",
    items: [
      "Design and build around what your customers need to find",
      "Content you can update yourself, without calling a developer",
      "Local SEO foundations: structured data, fast pages, clean markup",
      "Accessible (WCAG) and mobile-first",
      "Contact forms and email that actually reach your inbox",
      "Domain, hosting and analytics set up properly",
    ],
  },
  {
    id: "ai",
    eyebrow: "AI for your business",
    title: "Practical AI that does real work, not demos",
    summary:
      "I build AI products for a living. I'll help you find where AI pays off for your business, and build it.",
    items: [
      "AI assistants that answer customers on your website, WhatsApp or Instagram, and hand off to a person when needed",
      "Automating repetitive work: quotes, lead follow-up, documents and data entry",
      "Connecting AI to the tools you already use, like email, Google Workspace and your CRM",
      "Honest AI strategy: where it helps your business, and where it doesn't",
      "AI-assisted development workflows for software teams",
    ],
    link: { href: "/ai", label: "How I help teams with AI" },
  },
];

export const serviceOptions = [
  { value: "website", label: "A website" },
  { value: "ai", label: "AI / automation" },
  { value: "both", label: "Both" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type ServiceOption = (typeof serviceOptions)[number]["value"];
