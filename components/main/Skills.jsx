import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { wrapperVariants } from '../animations/variants'
import { SkillCard } from '../cards/SkillCard'
import { SkillCardDescription } from '../cards/SkillCardDescription'
import { skillsArray } from '../skills'

export const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  // console.log(selectedSkill, 'selectedSkill')

  const renderSkills = () => {
    return (
      skillsArray &&
      skillsArray.map((skill, idx) => {
        // console.log(skill.id)
        return (
          <SkillCard
            skill={skill}
            idx={idx}
            key={skill.id}
            variants={wrapperVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setSelectedSkill(skill)}
          />
        )
      })
    )
  }

  return (
    <>
      <AnimatePresence initial={false}>
        <div className="debug2 flex flex-wrap justify-center gap-4 bg-secondary w-screen h-fit px-4 py-10">
          {renderSkills()}
        </div>
        {selectedSkill && (
          <SkillCardDescription
            key={selectedSkill.id}
            skill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
          />
        )}
      </AnimatePresence>
    </>
  )
}
