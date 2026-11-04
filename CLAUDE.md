# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Portfolio and services site for Diego González Cruz: "Websites & AI for Connecticut businesses", live at www.chileandeveloper.com. It's a single-page Next.js 16 App Router site (React 19, TypeScript, Tailwind CSS 4) with a contact form that sends email through AWS SES. Copy is English only.

**Public-copy rules:**
- **NISA:** title and product only. Never name clients or partners, the spin-out, or "CTO".
- **THINKey:** describe capabilities, not customers or numbers.

The project memory has the reasoning.

## Commands

Package manager is **pnpm** (pinned via `packageManager` in package.json).

```bash
pnpm dev         # next dev (Turbopack)
pnpm build       # next build — also type-checks
pnpm start       # serve the production build
pnpm lint        # eslint (flat config in eslint.config.mjs; `next lint` no longer exists in Next 16)
pnpm typecheck   # tsc --noEmit
```

There is no test suite. ESLint is intentionally held at v9: the React/a11y/import plugins bundled by `eslint-config-next` don't support ESLint 10 yet.

## Architecture

- `src/app/layout.tsx` — root layout: fonts via `next/font/google` (Montserrat Alternates → `font-display`, Inter → `font-sans`), metadata, `NavBar` + `Footer`.
- `src/app/page.tsx` composes the sections: `Hero`, `Services` (`#services`), `Work` (`#work`), `Recommendations` (`#recommendations`, not in the nav), `About` (`#about`) and `Contact` (`#contact`).
  - It also emits the JSON-LD (`Person` + `ProfessionalService`, area served Connecticut).
  - The nav anchors in `src/data/site.ts` depend on these ids. `mobile: false` hides a nav link below `sm` so the nav fits at 390px.
- `src/app/sitemap.ts` and `robots.ts` build their URLs from `site.url`. `metadataBase` and the canonical URL in `layout.tsx` also come from it.
- `src/data/` holds all site copy. Edit content here, not in components.
  - `site.ts`: name, location, email, URL, nav
  - `services.ts`: service cards, plus the contact form's "What do you need?" options
  - `work.ts`: three groups:
    - `clientWork`: Elite Landscape with its screenshot, and the AI enablement engagement with Nelson Vieira's recommendation excerpt
    - `featuredWork`: NISA, THINKey
    - `moreWork`
  - Client screenshots go in `public/images/work/` and render uncropped inside a browser-window frame.
  - `recommendations.ts`: excerpts of Diego's received LinkedIn recommendations, rendered by the `Recommendations` section after Work.
    - LinkedIn has no API for these, so the file is a manual copy (pulled 2026-11-04). When a new one arrives, add it by hand.
    - Keep excerpts short and leave out personal or family details.
  - `about.ts`: bio, experience timeline, stack
- Components are Server Components by default. Client components (`"use client"`) are kept to leaves: `Reveal` (motion scroll/mount animations, respects reduced motion), `Starfield` (wraps `@flodlc/nebula`, loaded with `ssr: false`), `ThemeToggle`, `ContactForm`, `CoffeeAnimation`.
- Next 16 allows only one `next dev` per project directory. If one is already running, a second `pnpm dev` exits and prints the existing server's port.
- **Contact flow:** `ContactForm` uses `useActionState` with the `sendContact` Server Action in `src/app/actions.ts`. The action checks a honeypot field (`website`), validates server-side and echoes `values` back on error so the form keeps its input, then sends via `@aws-sdk/client-sesv2` (region `us-east-1`):
  1. a notification to `site.email` (diego@thinkey.us) with `ReplyTo` set to the visitor and the chosen service in the subject
  2. an auto-reply to the visitor (its failure is logged but does not fail the form)

  All mail is sent **from** `site.email`, so that domain must be a verified SES identity.
  - The visitor's name is echoed into the auto-reply, which is why it's restricted to a single line with no URLs.
  - The optional `service` radio is checked against `serviceOptions`. Unknown values are dropped.
- **Styling:** Tailwind 4 configured in CSS. There is no `tailwind.config.js`. Everything lives in `src/app/globals.css`: semantic colour tokens (`canvas`, `surface`, `line`, `fg`, `muted`, `accent`, `accent-mid`, `cyan`, `primary`, `primary-hover`, `danger`), fonts, and the custom `card` / `text-gradient` utilities.
  - Use these tokens rather than raw palette colours so both themes work. For example, use `bg-fg/5` for subtle tints, not `bg-white/5`.
- **Light/dark theme:** `<html data-theme="light|dark">` drives the theme.
  - `@theme` holds the dark values. `:root[data-theme="light"]` redefines the same variables. Keep it `@theme`, not `@theme inline`, or the overrides stop applying.
  - The `dark:` variant is a custom variant keyed to `data-theme`, not to the media query.
  - The inline script in `src/lib/theme-script.ts` is injected in `<head>` by the layout, which is why `<html>` has `suppressHydrationWarning`. It sets the theme before first paint from `localStorage.theme`, falling back to `prefers-color-scheme`.
  - `toggleTheme()` in `src/lib/theme.ts` saves a choice only when it differs from the system setting. Keep it in sync with the script.
  - Client components that need the theme in JS use `useResolvedTheme()`, which returns `null` during SSR. `Starfield` uses it to mount the nebula canvas only in dark mode; the light hero uses a CSS gradient/dot-grid layer instead.
- The `@layer lottie-react;` line at the top of `globals.css` must stay before `@import "tailwindcss"`. Without it, lottie-react v3's injected defaults outrank Tailwind utilities and the animation ignores its size classes.
- `next/image` in Next 16: use `preload` (not the deprecated `priority`). The default `qualities` is `[75]` only.

## Environment

**No AWS access keys exist.** SES credentials come from Vercel OIDC federation.
- Production sets `AWS_ROLE_ARN`. `actions.ts` passes it to `awsCredentialsProvider` from `@vercel/oidc-aws-credentials-provider`, which assumes the send-only role `portafolio-contact-form-ses`.
- The role trusts only `owner:thinkey:project:portafolio:environment:production`, so preview deployments can't send.
- Locally, with no `AWS_ROLE_ARN`, the SDK uses the default credential chain, which is your AWS CLI `default` profile in the THINKey account.

**AWS side (`infra/`):** the SES identity, OIDC provider, role and policy are managed with OpenTofu. See `infra/README.md`.
- The provider's `allowed_account_ids` refuses any account but THINKey's. The account ID lives in the gitignored `infra/terraform.tfvars`, because the repo is public.
- Never use the `nisa-cc` AWS profile for this project.

Testing the contact form with valid input sends real email. Empty or invalid input, or a filled honeypot, returns before any SES call.
