export const wrapperVariants = {
  initial: {
    // clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    y: -100,
    opacity: 0,
    transition: { duration: 0.4 }
  },
  animate: {
    // clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.4, staggerChildren: 0.1 },
    opacity: 1,

    y: 0,
  },
  exit: {
    // clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    opacity: 0,
    transition: { duration: 0.4 },
    y: -100
  }
}
export const skillsVariants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    opacity: 0,
    transition: { duration: 0.4 }
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.4, staggerChildren: 0.1 },
    opacity: 1,
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    opacity: 0,
    transition: { duration: 0.4 },
  }
}

export const boxAnimations = {
  initial: {
    x: 0,
    opacity: 0
  },
  animate: {
    y: 10,
    opacity: 1
  }
}
export const portafolioAnimations = {
  initial: {
    x: 10,

  },
  animate: {
    x: 0,
  }
}

export const heroboxVariants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    y: -100,
    opacity: 0,
    transition: { duration: 0.4 }
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: { duration: 0.4, staggerChildren: 0.1 },
    opacity: 1,

    y: 0,
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    opacity: 0,
    transition: { duration: 0.4 },
    y: -100
  }
}

export const contactFormAnimation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
}