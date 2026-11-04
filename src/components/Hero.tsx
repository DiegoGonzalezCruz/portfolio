import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { Starfield } from "./Starfield";

const credentials = [
  "Principal Developer at NISA",
  "Co-founder of THINKey",
  "M.Eng.Sc., PUC Chile",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-16"
    >
      <Starfield />
      {/* Light theme: soft violet/cyan glow over a faint dot grid instead of the starfield. */}
      <div aria-hidden className="absolute inset-0 -z-10 dark:hidden">
        <div className="absolute -top-32 left-[10%] size-[36rem] rounded-full bg-violet-300/40 blur-3xl" />
        <div className="absolute top-1/4 -right-24 size-[30rem] rounded-full bg-cyan-200/60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[24rem] rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(22_19_43/0.09)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-size-[22px_22px]" />
      </div>
      {/* Fade the hero background into the page background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-canvas"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:px-6">
        <div className="order-2 text-center md:order-1 md:text-left">
          <Reveal onMount>
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
              Websites & AI · {site.location.city}, {site.location.regionName}
            </p>
          </Reveal>
          <Reveal onMount delay={0.1}>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Modern websites and <span className="text-gradient">practical AI</span> for
              Connecticut businesses.
            </h1>
          </Reveal>
          <Reveal onMount delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted md:mx-0">
              I&apos;m {site.name}, a principal software engineer who builds AI products
              for educators. I bring the same engineering to your website, and to AI
              tools that take real work off your team&apos;s plate.
            </p>
          </Reveal>
          <Reveal
            onMount
            delay={0.3}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-hover"
              >
                Tell me about your project
              </a>
              <a
                href="#work"
                className="rounded-full border border-line bg-fg/5 px-6 py-3 font-semibold transition hover:border-accent/50 hover:bg-fg/10"
              >
                See my work
              </a>
            </div>
          </Reveal>
          <Reveal onMount delay={0.4}>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted md:justify-start">
              {credentials.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal onMount className="order-1 mx-auto md:order-2">
          <div className="relative size-48 sm:size-64 lg:size-80">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-linear-to-tr from-primary/50 via-accent-mid/20 to-cyan/40 blur-3xl"
            />
            <div className="relative size-full rounded-full bg-linear-to-tr from-primary via-accent-mid to-cyan p-1">
              <Image
                src="/images/DiegoDeep.jpeg"
                alt={`Portrait of ${site.name}`}
                width={320}
                height={320}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 192px"
                preload
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
