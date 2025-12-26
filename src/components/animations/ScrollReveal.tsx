'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className={className}>
      {children}
    </motion.div>
  )
}