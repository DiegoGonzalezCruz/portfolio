import Image from 'next/image'
import React, { useState } from 'react'
import { Info } from '../cards/Info'
import { Welcome } from '../cards/Welcome'

export const Hero = () => {
  const [flip, setFlip] = useState(false)

  return (
    <div className="flex items-center justify-center bg-base-200 w-screen h-screen">
      <div className="w-full h-full items-center justify-center text-center flex md:flex-row flex-col gap-10">
        <div className="xl:h-96 xl:w-96 md:h-48 md:w-48 h-24 w-24 rounded-full overflow-hidden flex items-center">
          <div className="h-full w-full relative ">
            <Image
              src={'/images/DiegoDeep.jpeg'}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              alt="Diego González Cruz"
            />
          </div>
        </div>
        {!flip ? <Welcome setFlip={setFlip} /> : <Info setFlip={setFlip} />}
      </div>
    </div>
  )
}
