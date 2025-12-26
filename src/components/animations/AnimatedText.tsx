'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  stagger = 0.05,
}: AnimatedTextProps) {
  const words = children.split(' ')

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * stagger,
            ease: 'easeOut',
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}