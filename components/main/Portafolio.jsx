import React from 'react'
import { PortafolioCard } from '../cards/PortafolioCard'

const portafolioInfo = [
  {
    image: '/images/websites/careassistance.png',
    title: 'Care Assistance',
    description:
      'Customer is a startup that needed a landing website with strong animations using scroll (Framer Motion). They provided a Figma design and it was built as a JAMSTACK app. It is connected to Wordpress as a Headless CMS, for their marketing team to upload content. It uses AWS Lightsail (WP) and Vercel (NextJS).',
    href: 'https://careassistance.vercel.app'
  },
  {
    image: '/images/websites/thinkeyschool.png',
    title: 'THINKey School',
    description:
      'Educational Platform with online content, e-commerce, CRM and user dashboards. Made with React and Firebase.',
    href: 'https://thinkeyschool.com'
  }
]

export const Portafolio = () => {
  return (
    <div className="w-screen h-full my-24" id="projects">
      <div className="w-full flex flex-col items-center my-10 ">
        <h2>My latest Projects</h2>
      </div>

      <div className="portafolio-gallery flex flex-wrap gap-10">
        {portafolioInfo &&
          portafolioInfo.map((item) => {
            return (
              <PortafolioCard
                image={item.image}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            )
          })}
        {/* <PortafolioCard
          image={'/images/websites/thinkeyschool.png'}
          title={'THINKey School'}
          description={
            'Educational Platform with online content, e-commerce, CRM and user dashboards. Made with React and Firebase.'
          }
          href={'https://thinkeyschool.com'}
        /> */}
      </div>
    </div>
  )
}
