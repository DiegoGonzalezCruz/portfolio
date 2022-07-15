import Image from 'next/image'
import { skillsArray } from '../skills'

export const Skills = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-secondary w-screen min-h-[100vh] px-4 py-10 debug2 ">
      {skillsArray.map((skill, idx) => {
        return (
          <div
            key={skill.title + idx}
            className="card md:w-1/4 h-2/3 bg-base-100 shadow-xl p-2  "
          >
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
              <ul className=" flex gap-x-2 gap-y-1 flex-wrap">
                {skill.features.map((feature) => {
                  return (
                    <div
                      key={feature}
                      className="badge badge-accent h-fit text-center"
                    >
                      {feature}
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
