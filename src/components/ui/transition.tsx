'use client'

import CustomLink from "./Link"
import { motion } from "framer-motion"
import React from "react"
import { cn } from '@/utils/cn'

interface CustomTransitionProps {
  href?: string
  targetId?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'accent' | 'blue'
}

/**
 * A component that handles navigation.
 * If targetId is provided, it performs a smooth scroll to that element.
 * If href is provided, it uses the CustomLink component for standard navigation.
 */
export default function CustomTransition({ href, targetId, children, className, variant = 'default' }: CustomTransitionProps) {
  if (targetId) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    const variantStyles = {
      default: 'text-secondary-500 hover:text-accent-500 transition-colors',
      primary: 'bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors',
      outline: 'border border-primary-400 px-4 py-2 rounded-lg hover:bg-primary-500 hover:border-primary-500 transition-colors',
      ghost: 'text-secondary-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors',
      accent: 'text-accent-500 font-bold hover:underline text-accent-500',
      blue: 'text-teal-300 hover:text-accent-500 transition-colors',
    }

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </motion.button>
    )
  }

  if (href) {
    return <CustomLink
      href={href}
    >
      {children}
    </CustomLink>
  }

  return <>{children}</>
}
