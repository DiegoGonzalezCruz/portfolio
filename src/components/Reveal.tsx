"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (above-the-fold content). */
  onMount?: boolean;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className, delay = 0, onMount }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      {...(onMount
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
