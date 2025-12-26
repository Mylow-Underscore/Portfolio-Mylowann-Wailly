'use client'

import React from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-lg p-6 transition-all duration-300'
    
    const variantStyles = {
      default: 'bg-secondary-400 border border-neutral-light shadow-md hover:shadow-lg',
      elevated: 'bg-secondary-400 shadow-lg hover:shadow-elevated',
      outlined: 'border-2 border-primary-500 bg-secondary-400 hover:border-accent-500',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card