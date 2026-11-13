import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Wyloz Buisness',
  description: 'Consultez la politique de confidentialité de Wyloz Buisness concernant la protection de vos données personnelles.',
  keywords: ['Wailly Mylowann', 'Mylowann Wailly', 'Wyloz', 'confidentialité', 'RGPD'],
}

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
