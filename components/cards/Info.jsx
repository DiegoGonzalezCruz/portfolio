import React from 'react'

export const Info = ({ setFlip }) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Fullstack Developer</h1>
      <p className="py-6">
        I love to design web apps with ReactJS, using its framework Nextjs. I
        can help you from idea to deployment.
      </p>
      <button className="btn btn-primary" onClick={() => setFlip(false)}>
        See my stack
      </button>
    </div>
  )
}
