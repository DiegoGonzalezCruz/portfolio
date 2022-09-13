import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { boxAnimations } from '../animations/variants'

export const SkillCard = ({ skill, idx, onClick }) => {
  return (
    <motion.div
      key={skill.title + idx}
      variants={boxAnimations}
      className="card md:w-1/4 h-2/3 bg-base-100 shadow-xl p-2 cursor-pointer "
      onClick={onClick}
      whileInView="animate"
      initial="initial"
    >
      <figure className="relative w-full h-48 border border-primary rounded-xl overflow-hidden">
        <Image
          src={skill.image}
          layout="fill"
          objectFit={'contain'}
          priority
          alt="skills"
          className=" "
        />
      </figure>
      <div className="p-4">
        <h2 className="card-title">{skill.title}</h2>
        <p>{skill.subtitle}</p>
      </div>
      <div className=" my-5 p-5">
        <ul className=" flex gap-x-2 gap-y-1 flex-wrap">
          {skill.features.map((feature) => {
            return (
              <div
                key={feature}
                className="badge badge-accent h-10 text-center"
              >
                <p className="text-xl">{feature}</p>
              </div>
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}
