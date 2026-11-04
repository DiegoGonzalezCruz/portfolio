import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-24 md:px-6">
      <SectionHeading eyebrow="Contact" title="Let's talk about your project">
        Tell me a bit about your business and what you need. I&apos;m based in{" "}
        {site.location.city}, {site.location.region} and work with businesses across{" "}
        {site.location.regionName}, in person or remotely. Prefer email? Write to{" "}
        <a href={`mailto:${site.email}`} className="text-cyan underline-offset-4 hover:underline">
          {site.email}
        </a>
        .
      </SectionHeading>
      <Reveal className="card p-6 md:p-10">
        <ContactForm />
      </Reveal>
    </section>
  );
}
