interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
