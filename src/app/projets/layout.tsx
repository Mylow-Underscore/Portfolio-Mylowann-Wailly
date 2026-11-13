import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Projets | Wyloz Buisness',
  description: 'Explorez nos réalisations en développement Web, IoT, informatique et montage PC.',
  keywords: ['Wailly Mylowann', 'Mylowann Wailly', 'Wyloz', 'Developpeur Web Aude', 'Developpeur Montagne Noir', 'portfolio', 'projets'],
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
