import type { Testimonial } from "@/data/work";
import { ArrowUpRightIcon } from "./icons";

export function TestimonialQuote({
  testimonial,
  className = "",
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <figure
      className={`flex h-full flex-col justify-between gap-6 bg-linear-to-br from-primary/10 via-accent-mid/5 to-cyan/10 p-6 md:p-8 ${className}`}
    >
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
          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-cyan transition-colors hover:text-fg"
          >
            {testimonial.sourceLabel}
            <span className="sr-only"> ({testimonial.name}&apos;s recommendation, opens in a new tab)</span>
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
