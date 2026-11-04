/*
 * Excerpts copied by hand from Diego's received LinkedIn recommendations
 * (pulled 2026-11-04). LinkedIn has no API for these, so this is a one-time
 * copy; update it manually when new ones arrive. Keep excerpts short and link
 * to the full text. Nelson Vieira's lives with his project in work.ts.
 * Diego chose which to show (2026-11-04): Nelson, Stephen, Deby, Magdalena.
 * Margot Juvenal's (2020) is left out on purpose.
 */

export const linkedinRecommendationsUrl =
  "https://www.linkedin.com/in/diegothinkey/details/recommendations/";

export type Recommendation = {
  name: string;
  /** How LinkedIn describes the relationship, plus the org at the time. */
  relationship: string;
  date: string;
  excerpt: string[];
};

export const recommendations: Recommendation[] = [
  {
    name: "Stephen Malloy",
    relationship: "Interactive Director at GO · managed Diego directly",
    date: "November 2024",
    excerpt: [
      "I highly recommend Diego as a skilled and motivated developer. He is highly skilled in modern frameworks like React and Tailwind, consistently delivering high-quality and scalable solutions.",
      "Beyond his technical skills, Diego is highly collaborative and works exceptionally well with others.",
    ],
  },
  {
    name: "Deby Chung",
    relationship: "Codesmasher, a tech consultancy · worked with Diego on a client project",
    date: "September 2020",
    excerpt: [
      "I had the privilege to work with Diego, as he participated as an expert consultant in our client's project. Diego provided very insightful advice on EdTech in Chile.",
    ],
  },
  {
    name: "Magdalena Prieler",
    relationship: "THINKey · worked with Diego on the same team",
    date: "October 2017",
    excerpt: [
      "I got to know him as an exceptional entrepreneur who is able to create solutions which others don't even dare to think of.",
      "With his ability to inspire and motivate he leads his team to great success and revolutionizes how natural sciences are taught to kids.",
    ],
  },
];
