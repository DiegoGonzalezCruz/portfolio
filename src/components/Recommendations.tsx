import { linkedinRecommendationsUrl, recommendations } from "@/data/recommendations";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function Recommendations() {
  return (
    <section id="recommendations" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="Recommendations" title="What people I've worked with say">
        From a manager, a consulting partner and the team I led at THINKey.
      </SectionHeading>

      <ul className="grid gap-6 lg:grid-cols-3">
        {recommendations.map((rec, i) => (
          <li key={rec.name} className="flex">
            <Reveal delay={(i % 3) * 0.08} className="flex w-full">
              <figure className="card flex w-full flex-col justify-between gap-6 p-6 md:p-8">
                <blockquote cite={linkedinRecommendationsUrl}>
                  <span aria-hidden className="block font-display text-5xl leading-none text-accent">
                    “
                  </span>
                  <div className="flex flex-col gap-3 leading-relaxed text-pretty">
                    {rec.excerpt.map((sentence) => (
                      <p key={sentence}>{sentence}</p>
                    ))}
                  </div>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/15 font-display font-bold text-accent"
                  >
                    {initials(rec.name)}
                  </span>
                  <div>
                    <p className="font-semibold">{rec.name}</p>
                    <p className="text-sm text-muted">
                      {rec.relationship} · {rec.date}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm">
        <a
          href={linkedinRecommendationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-cyan transition-colors hover:text-fg"
        >
          Read the full recommendations on LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
          <ArrowUpRightIcon className="size-4" />
        </a>
      </p>
    </section>
  );
}
