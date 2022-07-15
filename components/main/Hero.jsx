import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center flex flex-row">
        <div className="h-48 w-48 debug1 overflow-hidden">
          <div className="h-48 w-48 relative ">
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
          <p className="py-6">
            I&apos;m DGC, a FullStack Javascript developer.
          </p>
          <button className="btn btn-primary">See my stack</button>
        </div>
      </div>
    </div>
  )
}
