/*
 * Public copy rules (see project memory): NISA = role + product only, never
 * clients/partners, the spin-out, or "CTO". THINKey = capabilities, not
 * customers or numbers.
 */

export type FeaturedWork = {
  name: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  href: string;
  linkLabel: string;
};

export type Testimonial = {
  /** Short excerpt of the recommendation; the full text stays on LinkedIn. */
  excerpt: string[];
  pullQuote: string;
  name: string;
  title: string;
  /** As LinkedIn states it, e.g. "Client · July 2026". */
  relationship: string;
  profileUrl: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type ClientWork = {
  name: string;
  kind: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  href?: string;
  linkLabel?: string;
  image?: { src: string; alt: string; width: number; height: number };
  testimonial?: Testimonial;
};

export const clientWork: ClientWork[] = [
  {
    name: "Elite Landscape",
    kind: "Website · Landscaping company in Avon, CT",
    period: "2026",
    summary:
      "Website and admin dashboard for a Connecticut landscaping, hardscaping and snow-removal company.",
    highlights: [
      "Service pages for every line of business, a project gallery and client testimonials, built for local search",
      "Free-quote form that lands straight in the team's inbox",
      "Admin dashboard where the team publishes projects, uploads photos and manages testimonials themselves",
      "Link page for their social profiles with a one-tap Google review link",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Better Auth", "UploadThing", "Resend"],
    href: "https://www.elite-landscape.com",
    linkLabel: "elite-landscape.com",
    image: {
      src: "/images/work/elite-landscape.jpg",
      alt: "Elite Landscape homepage: “Transform Your Outdoor Space” over a close-up of a lawn",
      width: 1456,
      height: 839,
    },
  },
  {
    name: "AI enablement for a finance team",
    kind: "AI training & workflow automation",
    period: "2026",
    summary:
      "Several months of weekly working sessions with a CPA-led finance team, working through their real projects rather than a canned playbook.",
    highlights: [
      "How large language models work under the hood, how to structure Projects, and how to write prompts that hold up",
      "Judging context and data quality instead of trusting whatever the model produces",
      "Automated recurring reporting and review processes that used to take hours of manual work every month",
      "Dashboards and repeatable workflows the team now runs on its own",
    ],
    tags: ["LLM fundamentals", "Prompting", "Workflow automation", "Dashboards"],
    testimonial: {
      pullQuote:
        "If you're looking for someone who will make your team genuinely capable with AI rather than just impressed by it, I'd recommend Diego without hesitation.",
      excerpt: [
        "Rather than handing over a canned playbook, he sat down with us each week and worked through the actual projects on our plate — figuring out where AI genuinely added leverage and where it didn't.",
        "With Diego's guidance we automated recurring reporting and review processes that previously consumed hours of manual work every month, and built dashboards and repeatable workflows that our team now runs on its own.",
      ],
      name: "Nelson Vieira",
      title: "CPA · Strategic Financial Leadership",
      relationship: "Client · July 2026",
      profileUrl: "https://www.linkedin.com/in/nelsonvieiracpa/",
      sourceLabel: "Read the full recommendation on LinkedIn",
      sourceUrl: "https://www.linkedin.com/in/diegothinkey/details/recommendations/",
    },
  },
];

export type Work = {
  name: string;
  kind: string;
  description: string;
  tags: string[];
  href?: string;
};

export const featuredWork: FeaturedWork[] = [
  {
    name: "NISA",
    role: "Principal Developer",
    period: "2025 – Present",
    summary:
      "An instructional coaching workspace for teachers and coaches, with an AI coach built in.",
    highlights: [
      "Lead architect for the platform and its AI layer: agents with long-term memory, available on the web and over SMS",
      "Designed a video-observation pipeline that turns long classroom recordings into rubric-based AI feedback",
      "Enterprise single sign-on (OIDC), security hardening and production observability",
      "Built the team's AI-assisted development workflow: specialized agents that take a ticket from spec to tested pull request",
    ],
    tags: ["Next.js", "TypeScript", "Mastra", "PostgreSQL", "Prisma", "Inngest", "AWS", "Vercel"],
    href: "https://nisa.coach",
    linkLabel: "nisa.coach",
  },
  {
    name: "THINKey",
    role: "Co-founder",
    period: "2019 – Present",
    summary:
      "A STEAM education company for kids in Chile (science fairs, camps and school programs) running on a platform I built.",
    highlights: [
      "Operations platform: quotes and proposals, lead follow-up, scheduling and role-based access for staff, instructors and schools",
      "AI assistant that answers families and schools on WhatsApp, Instagram and web chat, with a shared inbox for human handoff",
      "School accounts so teachers can run THINKey programs in their own classrooms",
      "Prototype that aligns lessons to Chile's national curriculum using embeddings",
    ],
    tags: ["Next.js", "Payload CMS", "MongoDB", "Mastra", "Chatwoot", "pgvector", "Vercel"],
    href: "https://www.thinkeyschool.com",
    linkLabel: "thinkeyschool.com",
  },
];

export const moreWork: Work[] = [
  {
    name: "HoopHall Awards voting",
    kind: "Live-TV voting platform · GO LLC, Hartford",
    description:
      "Led development of the voting platform for a televised awards show, with a CI/CD pipeline that kept real-time voting at 100% uptime through live broadcasts.",
    tags: ["React", "Node.js", "GitHub Actions"],
  },
  {
    name: "GradeSnap",
    kind: "AI grading for Google Classroom",
    description:
      "Creates rubrics and grades student submissions with Google Gemini, integrated with Google Classroom to streamline teachers' grading.",
    tags: ["Next.js", "Supabase", "Payload CMS", "Gemini"],
    href: "https://grade-snap-seven.vercel.app",
  },
  {
    name: "SEO Tools",
    kind: "AI SEO automation for an agency",
    description:
      "Generates image alt text with local LLMs (Ollama, LLaVA), converts images to next-gen formats and turns pages into PDFs.",
    tags: ["Next.js", "PostgreSQL", "Ollama", "LangChain"],
    href: "https://seotools.chileandeveloper.com",
  },
];
