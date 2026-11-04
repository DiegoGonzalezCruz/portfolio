import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { aiPage } from "@/data/ai";
import { site } from "@/data/site";
import { clientWork } from "@/data/work";

const title = "AI consulting & automation for Connecticut businesses | Diego González Cruz";
const description =
  "Hands-on AI enablement, workflow automation and AI assistants for teams in Connecticut and the Springfield, MA area, from a principal software engineer who builds AI products.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai" },
  openGraph: { title, description, url: "/ai", type: "website", locale: "en_US" },
};

// The finance-team engagement is the proof point for this page.
const engagement = clientWork.find((work) => work.testimonial);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI consulting, enablement and automation",
  serviceType: "AI consulting",
  url: `${site.url}/ai`,
  description,
  provider: { "@id": `${site.url}/#person` },
  areaServed: [
    { "@type": "State", name: "Connecticut" },
    { "@type": "City", name: "Springfield, Massachusetts" },
  ],
};

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className="mt-0.5 size-5 shrink-0 text-cyan">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AiPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-[5%] size-[34rem] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-10 -right-24 size-[28rem] rounded-full bg-cyan/15 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <Reveal onMount>
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
              {aiPage.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal onMount delay={0.1}>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {aiPage.hero.title}
            </h1>
          </Reveal>
          <Reveal onMount delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted">
              {aiPage.hero.intro}
            </p>
          </Reveal>
          <Reveal onMount delay={0.3} className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-hover"
            >
              Tell me about your team
            </a>
            <a
              href="#results"
              className="rounded-full border border-line bg-fg/5 px-6 py-3 font-semibold transition hover:border-accent/50 hover:bg-fg/10"
            >
              See a client&apos;s results
            </a>
          </Reveal>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading eyebrow="What I do" title="Three ways to put AI to work" />
        <div className="grid gap-6 lg:grid-cols-3">
          {aiPage.offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 0.08} className="flex">
              <article className="card flex w-full flex-col p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-balance">{offer.title}</h2>
                <p className="mt-3 text-pretty text-muted">{offer.summary}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {offer.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed">
                      <Check />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Proof */}
      {engagement?.testimonial && (
        <section id="results" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <SectionHeading eyebrow="Client results" title={engagement.name}>
            {engagement.summary}
          </SectionHeading>
          <Reveal>
            <div className="card grid overflow-hidden lg:grid-cols-2">
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="font-display text-xl font-bold">What we did</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {engagement.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <TestimonialQuote
                testimonial={engagement.testimonial}
                className="border-line max-lg:border-t lg:border-l"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Who it's for + how it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
              Who it&apos;s for
            </p>
            <h2 className="font-display text-3xl font-bold text-balance">
              Teams with real work that repeats every week
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {aiPage.audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-line bg-fg/5 px-4 py-2 text-sm"
                >
                  {audience}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">Serving {aiPage.serviceArea}.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
              How it works
            </p>
            <ol className="grid gap-4 sm:grid-cols-2">
              {aiPage.steps.map((step, i) => (
                <li key={step.title} className="card p-5">
                  <p className="font-display text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Credentials */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading eyebrow="Who you'd work with" title="An engineer who builds AI products for a living" />
        <ul className="grid gap-6 md:grid-cols-3">
          {aiPage.credentials.map((credential, i) => (
            <li key={credential.title} className="flex">
              <Reveal delay={i * 0.08} className="flex w-full">
                <div className="card w-full p-6">
                  <h3 className="font-display text-lg font-bold">{credential.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{credential.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Contact
        title={aiPage.contact.title}
        intro={aiPage.contact.intro}
        defaultService="ai"
      />
    </main>
  );
}
