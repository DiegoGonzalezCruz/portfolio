import React from 'react'
import { motion } from 'framer-motion'
import { heroboxVariants } from '../animations/variants'

export const Info = ({ setFlip }) => {
  return (
    <motion.div
      variants={heroboxVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-md"
    >
      <h1 className="text-5xl font-bold text-white">Fullstack Developer</h1>
      <p className="py-6 text-white">
        I love to design web apps with ReactJS, using its framework Nextjs. I
        can help you from idea to deployment.
      </p>
      <button className="btn btn-primary" onClick={() => setFlip(false)}>
        Go back
      </button>
    </motion.div>
  )
}
