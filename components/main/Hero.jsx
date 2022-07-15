import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <div className="flex items-center justify-center bg-base-200 w-screen h-screen ">
      <div className="w-full h-full items-center justify-center text-center flex flex-row gap-5">
        <div className="xl:h-96 xl:w-96 md:h-48 md:w-48 h-24 w-24 rounded-full overflow-hidden flex items-center">
          <div className="h-full w-full relative ">
            <Image
              src={'/images/DiegoDeep.jpeg'}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">I&apos;m DGC, a creative Fullstack developer.</p>
          <button className="btn btn-primary">See my stack</button>
        </div>
      </div>
    </div>
  )
}
