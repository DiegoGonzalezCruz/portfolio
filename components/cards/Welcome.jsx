import React from 'react'

export const Welcome = ({ setFlip }) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there!</h1>
      <p className="py-6">I&apos;m DGC, a creative Fullstack developer.</p>
      <button className="btn btn-primary" onClick={() => setFlip(true)}>
        See my stack
      </button>
    </div>
  )
}
