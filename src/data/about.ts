export const bio = [
  "I'm a Chilean software engineer based in Avon, Connecticut. My background is in science: a B.Sc. in Biochemistry and a Master of Engineering Science from Pontificia Universidad Católica de Chile.",
  "I co-founded THINKey, a STEAM education company for kids, and today I lead the architecture of an AI coaching platform for educators. I also help businesses put the web and AI to work.",
];

export type Role = {
  period: string;
  title: string;
  org: string;
  description: string;
};

export const experience: Role[] = [
  {
    period: "2026 – Present",
    title: "Websites & AI consultant",
    org: "Independent · Avon, CT",
    description:
      "Client websites and hands-on AI enablement: a website and admin dashboard for a Connecticut landscaping company, and AI training plus automated reporting for a finance team.",
  },
  {
    period: "2025 – Present",
    title: "Principal Developer",
    org: "NISA",
    description:
      "Lead architect of an AI coaching workspace for educators: AI agents, security, SSO and the team's AI-assisted workflow.",
  },
  {
    period: "2019 – Present",
    title: "Co-founder",
    org: "THINKey",
    description:
      "Built and run the platform behind a STEAM education company in Chile, from e-commerce and online courses to operations and AI.",
  },
  {
    period: "2024",
    title: "AI-Enabled Software Developer (contract)",
    org: "Sideby.ai",
    description:
      "Event-driven real-time chat and AI features, working directly with the CEO and CTO.",
  },
  {
    period: "2023 – 2024",
    title: "Web Developer",
    org: "GO LLC · Hartford, CT",
    description:
      "Live-TV voting platform, LLM-generated alt text across WordPress sites, and Node.js services.",
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "AI",
    items: ["Mastra", "LLM agents & tools", "RAG / pgvector", "OpenAI", "Claude", "Gemini", "LangChain", "Ollama"],
  },
  {
    group: "Web",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payload CMS", "WordPress"],
  },
  {
    group: "Backend & data",
    items: ["Node.js", "PostgreSQL", "Prisma", "MongoDB", "Supabase", "Inngest"],
  },
  {
    group: "Cloud & quality",
    items: ["AWS", "Vercel", "Railway", "GitHub Actions", "Playwright", "WCAG", "OIDC / SSO"],
  },
];
