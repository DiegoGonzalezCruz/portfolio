import React from 'react'
import { heroboxVariants } from '../animations/variants'
import { motion } from 'framer-motion'

export const Welcome = ({ setFlip }) => {
  return (
    <motion.div
      variants={heroboxVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-md"
    >
      <h1 className="text-5xl font-bold">Hello there!</h1>
      <p className="py-6">I&apos;m DGC, a creative Fullstack developer.</p>
      <button className="btn btn-primary" onClick={() => setFlip(true)}>
        See my stack
      </button>
    </motion.div>
  )
}
