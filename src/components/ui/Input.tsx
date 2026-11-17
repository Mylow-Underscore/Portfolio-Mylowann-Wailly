'use client'

import React from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-primary-500 mb-2 block text-sm font-medium">
            {label}
            {props.required && <span className="text-status-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && <div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>}

          <input
            type={type}
            className={cn(
              'bg-secondary-400 border-neutral-light w-full rounded-lg border-2 px-4 py-2.5',
              'text-primary-500 placeholder:text-neutral-gray',
              'focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2 focus:outline-none',
              'transition-colors duration-300',
              icon && 'pl-10',
              error && 'border-status-error focus:border-status-error',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>

        {error && <p className="text-status-error mt-2 text-sm">{error}</p>}
        {helperText && <p className="text-neutral-gray mt-2 text-sm">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
