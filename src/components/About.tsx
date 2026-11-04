import { bio, experience, stack } from "@/data/about";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="About" title="From biochemistry to building AI products" />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-pretty text-muted">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <SocialLinks className="mt-6" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {stack.map(({ group, items }) => (
              <div key={group}>
                <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">
                  {group}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="sr-only">Experience</h3>
          <ol className="relative flex flex-col gap-8 border-l border-line pl-6">
            {experience.map((role) => (
              <li key={`${role.org}-${role.title}`} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-accent ring-4 ring-canvas"
                />
                <p className="text-sm text-muted">{role.period}</p>
                <p className="mt-1 font-display text-lg font-bold">
                  {role.title} <span className="text-accent">· {role.org}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{role.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
