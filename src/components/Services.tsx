import Link from "next/link";
import { services } from "@/data/services";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="Services" title="How I can help">
        Two things I do well: websites that work for your business, and AI that&apos;s
        wired into how your business actually runs.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.1} className="flex">
            <article className="card flex w-full flex-col p-6 md:p-8">
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">
                {service.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-balance md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-3 text-pretty text-muted">{service.summary}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed md:text-base">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {service.link && (
                <Link
                  href={service.link.href}
                  className="mt-6 inline-flex items-center gap-1.5 self-start font-semibold text-cyan transition-colors hover:text-fg"
                >
                  {service.link.label}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
