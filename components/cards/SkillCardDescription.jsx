import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { wrapperVariants } from '../animations/variants'

export const SkillCardDescription = ({ skill, setSelectedSkill }) => {
  console.log(skill, 'skill')

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-screen w-screen debug1 bg-white">
        <motion.div
          variants={wrapperVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={skill.id}
          className="w-full h-full mx-auto flex items-start justify-center z-40 fixed top-1/4 debug1   "
        >
          <div className="card md:w-3/4 h-2/3 bg-base-100 shadow-xl p-5 flex flex-row debug2">
            <div
              className="absolute right-5"
              onClick={() => setSelectedSkill(null)}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ fontSize: 50, color: 'orange' }}
              />
            </div>
            <div className="w-1/2">
              <figure className="relative w-full h-48 border border-primary rounded-xl">
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
                <ul className=" flex gap-x-2 gap-y-1 flex-wrap">
                  {skill.features.map((feature) => {
                    return (
                      <div
                        key={feature}
                        className="badge badge-accent h-fit text-center"
                      >
                        <p className="text-xl">{feature}</p>
                      </div>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="w-1/2 px-10 flex flex-col gap-10">
              <h2>Description:</h2>
              <p>{skill.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
