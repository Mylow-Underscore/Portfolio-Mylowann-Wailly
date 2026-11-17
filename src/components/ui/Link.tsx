'use client'

import Link from 'next/link'
import { cn } from '@/utils/cn'

interface CustomLinkProps {
  href: string
  subject?: string
  cc?: string
  body?: string
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'accent' | 'blue'
  className?: string
}

/**
 * A smart link component that handles internal, external, mailto, and tel links
 * with support for various visual variants.
 */
export default function CustomLink({
  href,
  subject,
  cc,
  body,
  children,
  variant = 'default',
  className,
}: CustomLinkProps) {
  const isExternal = href.startsWith('https://') || href.startsWith('http://')
  const isInternal = href.startsWith('/')
  const isMailto = href.startsWith('mailto:')
  const isTel = href.startsWith('tel:')

  const mailtoHref = isMailto ? new URL(href) : undefined
  if (mailtoHref) {
    if (subject !== undefined) mailtoHref.searchParams.set('subject', subject)
    if (cc !== undefined) mailtoHref.searchParams.set('cc', cc)
    if (body !== undefined) mailtoHref.searchParams.set('body', body)
  }

  const variantStyles = {
    default: 'text-secondary-500 hover:text-accent-500 transition-colors',
    primary: 'bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors',
    outline: 'border border-primary-400 px-4 py-2 rounded-lg hover:bg-primary-500 hover:border-primary-500 transition-colors',
    ghost: 'text-secondary-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors',
    accent: 'text-accent-500 font-bold hover:underline transition-colors',
    blue: 'text-teal-300 hover:text-accent-500 transition-colors',
  }

  const content = (
    <span className={cn(variantStyles[variant], className)}>
      {children}
    </span>
  )

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    )
  } else if (isInternal) {
    return <Link href={href}>{content}</Link>
  } else if (isMailto) {
    return <Link href={mailtoHref!.toString()}>{content}</Link>
  } else if (isTel) {
    return <Link href={href}>{content}</Link>
  }

  return <Link href={href}>{content}</Link>
}
