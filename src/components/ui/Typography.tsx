// src/components/ui/Typography.tsx
'use client'

import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-lg'
  | 'body-base'
  | 'body-sm'
  | 'caption'
  | 'quote'

type HTMLElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'blockquote'

interface TypographyProps {
  children: ReactNode
  variant?: TypographyVariant
  as?: HTMLElement
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'danger' | 'success' | 'warning'
  align?: 'left' | 'center' | 'right' | 'justify'
  className?: string
  truncate?: number
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
  italic?: boolean
  bold?: boolean
  underline?: boolean
  mt?: number // margin-top
  mb?: number // margin-bottom
  mx?: number // margin-x
  px?: number // padding-x
}


const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl md:text-5xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold leading-snug tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold leading-snug',
  h4: 'text-xl md:text-2xl font-semibold leading-normal',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
  'body-lg': 'text-lg leading-relaxed',
  'body-base': 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-normal',
  caption: 'text-xs md:text-sm leading-normal text-gray-600 dark:text-gray-400',
  quote: 'text-lg md:text-xl italic leading-relaxed border-l-4 border-accent-500 pl-4',
}


const variantToElement: Record<TypographyVariant, HTMLElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  'body-base': 'p',
  'body-sm': 'p',
  caption: 'span',
  quote: 'blockquote',
}


const colorStyles: Record<string, string> = {
  primary: 'text-primary-500 dark:text-primary-400',
  secondary: 'text-secondary-500 dark:text-secondary-400',
  accent: 'text-accent-500 dark:text-accent-400',
  muted: 'text-gray-600 dark:text-gray-400',
  danger: 'text-red-500 dark:text-red-400',
  success: 'text-green-500 dark:text-green-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
}


const alignStyles: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}


export function Typography({
  children,
  variant = 'body-base',
  as,
  color,
  align = 'left',
  className,
  truncate,
  uppercase,
  lowercase,
  capitalize,
  italic,
  bold,
  underline,
  mt,
  mb,
  mx,
  px,
}: TypographyProps) {
  const Component = as || variantToElement[variant]

  const classes = cn(
    variantStyles[variant],
    color && colorStyles[color],
    alignStyles[align],
    uppercase && 'uppercase',
    lowercase && 'lowercase',
    capitalize && 'capitalize',
    italic && 'italic',
    bold && 'font-bold',
    underline && 'underline',
    truncate && `line-clamp-${truncate}`,
    mt !== undefined && `mt-${mt}`,
    mb !== undefined && `mb-${mb}`,
    mx !== undefined && `mx-${mx}`,
    px !== undefined && `px-${px}`,
    className
  )

  return <Component className={classes}>{children}</Component>
}

export default Typography
