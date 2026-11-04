/*
 * Copy for the /ai landing page (the Google Ads destination). Written in
 * Diego's voice: changes should be reviewed by him. Claims stay within what
 * Nelson's recommendation, the NISA/THINKey work and the CV support.
 */

export const aiPage = {
  serviceArea: "Connecticut and the Springfield, MA area",
  hero: {
    eyebrow: "AI for Connecticut & Springfield businesses",
    title: "Practical AI that takes real work off your team's plate",
    intro:
      "I'm Diego González Cruz, a principal software engineer who builds AI products for a living. I help teams find where AI genuinely adds leverage, build it into the way they already work, and leave them able to run it on their own.",
  },
  offers: [
    {
      title: "AI enablement for your team",
      summary:
        "Weekly working sessions on the projects actually on your plate, not a canned playbook.",
      points: [
        "How large language models work under the hood, so your team knows what to trust",
        "Structuring Projects and writing prompts that hold up",
        "Judging context and data quality instead of accepting whatever the model produces",
      ],
    },
    {
      title: "Workflow automation",
      summary:
        "Recurring reporting, reviews, follow-ups and data entry, automated with checks you can rely on.",
      points: [
        "Start with the work that eats the most hours every month",
        "Dashboards and repeatable workflows your team runs on its own",
        "A plain answer when a workflow isn't reliable enough to trust yet, and what has to change first",
      ],
    },
    {
      title: "AI assistants",
      summary:
        "Assistants that answer customers on your website, WhatsApp or Instagram, and hand off to a person when needed.",
      points: [
        "Connected to the tools you already use, like email, Google Workspace and your CRM",
        "Built on the same stack as the assistant I run for my own company, THINKey",
      ],
    },
  ],
  audiences: [
    "Accounting and finance teams",
    "Insurance agencies",
    "Professional services firms",
    "Small businesses with repetitive back-office work",
  ],
  steps: [
    {
      title: "Talk",
      body: "We go through how your team works today and where the hours go.",
    },
    {
      title: "Pick",
      body: "We choose the one or two workflows where AI genuinely adds leverage, and I tell you plainly where it doesn't.",
    },
    {
      title: "Build and teach",
      body: "I build it with your team in working sessions, so they understand it rather than just use it.",
    },
    {
      title: "Hand off",
      body: "Your team runs the workflows on its own, with dashboards to see they're working.",
    },
  ],
  credentials: [
    {
      title: "Principal Developer at NISA",
      body: "Lead architect of an AI coaching workspace for educators: AI agents with long-term memory, a video-observation AI pipeline, security and SSO.",
    },
    {
      title: "Co-founder of THINKey",
      body: "Built the platform and AI assistant that run a STEAM education company in Chile.",
    },
    {
      title: "Master of Engineering Science",
      body: "Pontificia Universidad Católica de Chile, after a B.Sc. in Biochemistry.",
    },
  ],
  contact: {
    title: "Tell me where your team's hours go",
    intro:
      "A short note about your team and the work you'd like off its plate is plenty to start. I work in person around Connecticut and the Springfield area, and remotely.",
  },
} as const;
