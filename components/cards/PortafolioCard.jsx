import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import React from "react";
import { boxAnimations, portafolioAnimations } from "../animations/variants";

export const PortafolioCard = ({ image, title, description, href }) => {
  return (
    <div className="card px-5  border-primary border-2 md:w-3/4 mx-auto flex flex-col gap-10">
      <div className="  card ">
        <div className=" ">
          <a href={href} target={"__blank"}>
            <Image
              src={image}
              width={1000}
              height={1000}
              alt="skills"
              className="w-full "
            />
          </a>
        </div>
        <div className=" p-10 flex flex-col gap-5 ">
          <h3>{title}</h3>
          <p className="text-base">{description}</p>
          <a href={href} target={"__blank"}>
            <button className="btn btn-accent">Check it out</button>
          </a>
        </div>
      </div>
    </div>
  );
};
