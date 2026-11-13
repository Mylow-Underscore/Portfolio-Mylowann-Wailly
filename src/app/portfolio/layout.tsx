import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Wyloz Buisness',
  description: 'Découvrez nos réalisations en montage PC et solutions Smart Home IoT.',
  keywords: ['Wailly Mylowann', 'Mylowann Wailly', 'Wyloz', 'montage PC', 'smart home iot', 'portfolio'],
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
