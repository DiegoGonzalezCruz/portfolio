import React from "react";
import { PortafolioCard } from "../cards/PortafolioCard";

const portafolioInfo = [
  {
    image: "/images/websites/seo-tools.png",
    title: "SEO Tools",
    description:
      "SEO Tools is an advanced web application I developed for an agency to streamline image recognition through LLMs (Ollama , Llava), alt text generation, and next-gen image format conversion. It also creates PDFs from URLs, featuring GitHub authentication, a PostgreSQL database, and is built with Next.js.",
    href: "https://seotools.chileandeveloper.com/",
  },
  {
    image: "/images/websites/careassistance.png",
    title: "Care Assistance",
    description:
      "Care Assistance is a landing site for a startup, built with JAMstack principles and seamless animations using Framer Motion. Based on a Figma design, it connects to WordPress as a headless CMS, enabling their marketing team to manage content effortlessly. Hosted on AWS Lightsail (WP) and Vercel (Next.js).",
    href: "https://careassistance.vercel.app",
  },
  {
    image: "/images/websites/thinkeyschool.png",
    title: "THINKey School",
    description:
      "THINKey School is an educational platform that combines online courses, e-commerce, CRM, and user dashboards. Built with React and Firebase for a robust and scalable experience.",
    href: "https://thinkeyschool.com",
  },
];

export const Portafolio = () => {
  return (
    <div className="w-full h-full  " id="projects">
      <div className="w-full flex flex-col text-center my-10">
        <h2>My latest Projects</h2>
      </div>

      <div className="   w-full md:w-5/6 mx-auto flex flex-col md:flex-wrap gap-10 my-10 overflow-hidden">
        {portafolioInfo &&
          portafolioInfo.map((item) => {
            return (
              <PortafolioCard
                key={item.description}
                image={item.image}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            );
          })}
      </div>
    </div>
  );
};
