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
          <label className="block text-sm font-medium text-primary-500 mb-2">
            {label}
            {props.required && <span className="text-status-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
          
          <input
            type={type}
            className={cn(
              'w-full px-4 py-2.5 bg-secondary-400 border-2 border-neutral-light rounded-lg',
              'text-primary-500 placeholder:text-neutral-gray',
              'focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20',
              'transition-colors duration-300',
              icon && 'pl-10',
              error && 'border-status-error focus:border-status-error',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-status-error mt-2">{error}</p>}
        {helperText && <p className="text-sm text-neutral-gray mt-2">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input