import { skills } from "../skills"
import Image from 'next/image'

export const Skills = () => {

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {
        skills.map((skill, idx) => {
          return (
            <div key={skill.title + idx} className="card w-96 bg-base-100 shadow-xl p-5 m-5" >
              <figure className='relative w-full h-48'>
                <Image
                  src={skill.image}
                  layout='fill'
                  objectFit={'contain'}
                  priority
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{skill.title}</h2>
                <p>{skill.subtitle}</p>
                <ul>
                  {
                    skill.features.map(feature => {
                      return (
                        <div key={feature} className="badge badge-accent">{feature}</div>
                      )
                    })
                  }
                </ul>
                <progress className="progress progress-primary w-56" value={skill.skill} max="100"></progress>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
