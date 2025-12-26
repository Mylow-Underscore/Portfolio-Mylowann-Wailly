'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

interface CounterAnimationProps {
  end: number
  start?: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export default function CounterAnimation({
  end,
  start = 0,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: CounterAnimationProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTimestamp = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTimestamp
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      setCount(Math.floor(start + (end - start) * progress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [start, end, duration])

  return (
    <motion.span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  )
}