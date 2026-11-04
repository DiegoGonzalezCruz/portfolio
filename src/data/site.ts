export const site = {
  name: "Diego González Cruz",
  shortName: "DGC",
  role: "Principal Developer",
  tagline: "Websites & AI for Connecticut businesses",
  location: { city: "Avon", region: "CT", regionName: "Connecticut", country: "US" },
  email: "diego@thinkey.us",
  url: "https://www.chileandeveloper.com",
  links: {
    linkedin: "https://www.linkedin.com/in/diegothinkey/",
    github: "https://github.com/DiegoGonzalezCruz",
  },
} as const;

/**
 * Root-relative so they work from /ai and /privacy too (on "/" they just scroll).
 * `mobile: false` hides the link below the `sm` breakpoint so the nav fits at 390px.
 */
export const navItems = [
  { label: "AI", href: "/ai", mobile: true },
  { label: "Services", href: "/#services", mobile: false },
  { label: "Work", href: "/#work", mobile: true },
  { label: "About", href: "/#about", mobile: false },
  { label: "Contact", href: "/#contact", mobile: true },
] as const;
