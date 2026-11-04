import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Recommendations } from "@/components/Recommendations";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { services } from "@/data/services";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      url: site.url,
      sameAs: [site.links.linkedin, site.links.github],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Pontificia Universidad Católica de Chile",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} | ${site.tagline}`,
      url: site.url,
      email: site.email,
      founder: { "@id": `${site.url}/#person` },
      areaServed: { "@type": "State", name: site.location.regionName },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.eyebrow, description: service.summary },
        })),
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Services />
      <Work />
      <Recommendations />
      <About />
      <Contact />
    </main>
  );
}
