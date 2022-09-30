import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { skillsVariants } from '../animations/variants'

export const SkillCardDescription = ({ skill, setSelectedSkill }) => {
  console.log(skill, 'skill')

  return (
    <motion.div
      variants={skillsVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-screen w-screen fixed top-0 z-50 bg-accent/70 py-10"
    >
      <motion.div
        variants={skillsVariants}
        key={skill.id}
        className=" w-full h-full mx-auto flex items-start justify-center z-40 overflow-hidden"
      >
        <div className="card md:w-3/4 h-full bg-base-100 shadow-xl p-5 flex flex-row ">
          <div
            className="absolute right-5"
            onClick={() => setSelectedSkill(null)}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ fontSize: 50, color: 'orange' }}
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-around">
            <figure className=" relative w-full h-48 border border-primary rounded-xl overflow-hidden">
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
            <div>
              <ul className=" flex gap-x-2 gap-y-1 flex-wrap items-center justify-start">
                {skill.features.map((feature, idx) => {
                  // console.log(feature.replace(/\s+/g, ''), '***')
                  return (
                    <div
                      key={feature.replace(/\s+/g, '') + idx}
                      className="badge badge-accent h-fit text-center"
                    >
                      <p className="text-xl">{feature}</p>
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="w-1/2 md:px-10 px-5 flex flex-col items-start justify-start gap-10">
            <h2>Description:</h2>
            <p className="text-xl">{skill.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
