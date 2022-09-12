import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const PortafolioCard = ({ image, title, description, href }) => {
  return (
    <div className="w-5/6 mx-auto h-full border-2 border-primary rounded-xl p-10">
      <div className=" flex flex-row items-center gap-10">
        <div className="w-1/2 h-[15rem]">
          <a href={href} target={'__blank'}>
            <figure className="relative h-full w-full mx-auto my-5 border border-primary rounded-xl cursor-pointer">
              <Image
                src={image}
                layout="fill"
                objectFit={'contain'}
                priority
                alt="skills"
                className=" "
              />
            </figure>
          </a>
        </div>
        <div className="w-1/2 h-full flex flex-col gap-10">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
