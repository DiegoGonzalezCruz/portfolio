import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-cyan uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base text-pretty text-muted md:text-lg">{children}</p>
      )}
    </Reveal>
  );
}
