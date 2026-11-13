import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation | Wyloz Buisness',
  description: 'Consultez les conditions générales d\'utilisation du site de Wyloz Buisness.',
  keywords: ['Wailly Mylowann', 'Mylowann Wailly', 'Wyloz', 'CGU', 'conditions générales'],
}

export default function ConditionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
