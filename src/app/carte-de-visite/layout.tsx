import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos cartes de visite | Mylowann Wailly - Wyloz',
  description: 'Découvrez nos cartes de visite numériques.',
  keywords: ['Wailly Mylowann', 'Mylowann Wailly', 'Wyloz', 'carte de visite', 'developpeur web'],
}

export default function VisitCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
