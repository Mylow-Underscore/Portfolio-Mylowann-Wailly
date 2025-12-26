'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import React, { useRef } from 'react'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

export default function FadeInSection({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.6,
}: FadeInSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directionVariants = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionVariants[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionVariants[direction] }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}