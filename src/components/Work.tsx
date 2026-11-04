import Image from "next/image";
import {
  clientWork,
  featuredWork,
  moreWork,
  type ClientWork,
  type Testimonial,
} from "@/data/work";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function Tags({ tags, label }: { tags: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({
  href,
  children,
  name,
}: {
  href: string;
  children: React.ReactNode;
  name: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-semibold text-cyan transition-colors hover:text-fg"
    >
      {children}
      <span className="sr-only"> ({name}, opens in a new tab)</span>
      <ArrowUpRightIcon className="size-4" />
    </a>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-6 font-display text-xl font-bold">{children}</h3>;
}

function TestimonialQuote({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <figure className="flex h-full flex-col justify-between gap-6 bg-linear-to-br from-primary/10 via-accent-mid/5 to-cyan/10 p-6 md:p-8">
      <blockquote cite={testimonial.sourceUrl}>
        <span aria-hidden className="block font-display text-6xl leading-none text-accent">
          “
        </span>
        <p className="font-display text-xl leading-snug font-semibold text-balance md:text-2xl">
          {testimonial.pullQuote}
        </p>
        <div className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-muted">
          {testimonial.excerpt.map((sentence) => (
            <p key={sentence}>“{sentence}”</p>
          ))}
        </div>
      </blockquote>
      <figcaption className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-white"
          >
            {initials}
          </span>
          <div>
            <a
              href={testimonial.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-cyan"
            >
              {testimonial.name}
              <span className="sr-only"> (LinkedIn profile, opens in a new tab)</span>
            </a>
            <p className="text-sm text-muted">{testimonial.title}</p>
            <p className="text-sm text-muted">{testimonial.relationship}</p>
          </div>
        </div>
        <div className="text-sm">
          <ExternalLink href={testimonial.sourceUrl} name={`${testimonial.name}'s recommendation`}>
            {testimonial.sourceLabel}
          </ExternalLink>
        </div>
      </figcaption>
    </figure>
  );
}

function ClientWorkCard({ work, flip }: { work: ClientWork; flip: boolean }) {
  // Screenshots sit uncropped in a browser-window frame: the text column sets the
  // row height, and object-cover would crop the site's logo and headline.
  const media = work.image ? (
    <div className="flex h-full items-center bg-linear-to-br from-primary/10 via-accent-mid/5 to-cyan/10 p-4 sm:p-8">
      <div className="w-full overflow-hidden rounded-xl border border-line bg-surface shadow-xl shadow-violet-950/10 dark:shadow-black/40">
        <div aria-hidden className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2.5 rounded-full bg-fg/20" />
          <span className="size-2.5 rounded-full bg-fg/20" />
          <span className="size-2.5 rounded-full bg-fg/20" />
          {work.linkLabel && (
            <span className="ml-2 truncate rounded-md bg-fg/5 px-2 py-0.5 text-xs text-muted">
              {work.linkLabel}
            </span>
          )}
        </div>
        <Image
          src={work.image.src}
          alt={work.image.alt}
          width={work.image.width}
          height={work.image.height}
          sizes="(min-width: 1152px) 512px, (min-width: 1024px) 45vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  ) : work.testimonial ? (
    <TestimonialQuote testimonial={work.testimonial} />
  ) : null;

  return (
    <Reveal>
      <article className="card overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {media && (
            // Flipped rows (e.g. a testimonial) come after the text on every screen
            // size, so the quote never appears before the project it's about.
            <div
              className={`border-line ${
                flip ? "order-2 max-lg:border-t lg:border-l" : "max-lg:border-b lg:border-r"
              }`}
            >
              {media}
            </div>
          )}
          <div className="flex flex-col p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h4 className="font-display text-2xl font-bold md:text-3xl">{work.name}</h4>
              <p className="text-sm text-muted">{work.period}</p>
            </div>
            <p className="mt-1 text-sm font-semibold tracking-wide text-accent">{work.kind}</p>
            <p className="mt-4 text-lg text-pretty">{work.summary}</p>
            <div className="mt-5 flex-1">
              <Highlights items={work.highlights} />
            </div>
            <div className="mt-6">
              <Tags tags={work.tags} label={`${work.name} tech`} />
            </div>
            {work.href && work.linkLabel && (
              <div className="mt-6">
                <ExternalLink href={work.href} name={work.name}>
                  {work.linkLabel}
                </ExternalLink>
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="Selected work" title="What I've been building">
        Client work, the platforms I lead, and a few things built along the way.
      </SectionHeading>

      <GroupHeading>Client work</GroupHeading>
      <div className="flex flex-col gap-6">
        {clientWork.map((work, i) => (
          <ClientWorkCard key={work.name} work={work} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="mt-16">
        <GroupHeading>Platforms I lead</GroupHeading>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {featuredWork.map((work, i) => (
          <Reveal key={work.name} delay={i * 0.1} className="flex">
            <article className="card relative flex w-full flex-col overflow-hidden p-6 md:p-8">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-accent-mid to-cyan"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-display text-3xl font-bold">{work.name}</h4>
                <p className="text-sm text-muted">{work.period}</p>
              </div>
              <p className="mt-1 text-sm font-semibold tracking-wide text-accent">{work.role}</p>
              <p className="mt-4 text-lg text-pretty">{work.summary}</p>
              <div className="mt-5 flex-1">
                <Highlights items={work.highlights} />
              </div>
              <div className="mt-6">
                <Tags tags={work.tags} label={`${work.name} tech`} />
              </div>
              <div className="mt-6">
                <ExternalLink href={work.href} name={work.name}>
                  {work.linkLabel}
                </ExternalLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <GroupHeading>More projects</GroupHeading>
      </div>
      <ul className="grid gap-5 md:grid-cols-3">
        {moreWork.map((work, i) => (
          <li key={work.name} className="flex">
            <Reveal delay={i * 0.08} className="flex w-full">
              <article className="card flex w-full flex-col p-6">
                <p className="text-xs font-semibold tracking-wide text-accent">{work.kind}</p>
                <h4 className="mt-2 font-display text-xl font-bold">{work.name}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {work.description}
                </p>
                <div className="mt-5">
                  <Tags tags={work.tags} label={`${work.name} tech`} />
                </div>
                {work.href && (
                  <div className="mt-5 text-sm">
                    <ExternalLink href={work.href} name={work.name}>
                      Visit
                    </ExternalLink>
                  </div>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
