import React from 'react'
import { PortafolioCard } from '../cards/PortafolioCard'

export const Portafolio = () => {
  return (
    <div className="w-screen h-full my-24" id="projects">
      <div className="w-full flex flex-col items-center my-10 ">
        <h2>My last Projects</h2>
      </div>

      <div className="portafolio-gallery flex flex-wrap gap-10">
        <PortafolioCard
          image={'/images/websites/careassistance.png'}
          title={'Care Assistance'}
          description={
            'Landing page with animated scroll. Connected to Wordpress as a Headless platform to upload content. Made with react.'
          }
          href={'https://careassistance.vercel.app/'}
        />
        <PortafolioCard
          image={'/images/websites/thinkeyschool.png'}
          title={'THINKey School'}
          description={
            'Educational Platform with online content, e-commerce, CRM and user dashboards. Made with React and Firebase.'
          }
          href={'https://thinkeyschool.com'}
        />
      </div>
    </div>
  )
}
