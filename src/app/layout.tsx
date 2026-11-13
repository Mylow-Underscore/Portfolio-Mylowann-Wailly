import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google'
import Typography from "@/components/ui/Typography";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'
import '@/styles/animations.css'
import '@/styles/typography.css'
import '@/styles/colors.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wyloz Buisness | Wailly Mylowann ; Développeur Web',
  description:
    'Découvrez le portfolio de Mylowann Wailly | Wyloz Buisness. Spécialiste en développement Web et référencement SEO, montage PC et solutions Smart Home IoT.',
  keywords: [
    'Wailly Mylowann',
    'Mylowann Wailly',
    'Wailly',
    'Mylowann',
    'Mylow',
    'Wyloz',
    'Wyloz Buisness',
    'Developpeur Web Aude',
    'Developpeur Montagne Noir',
    'wailly-mylowann.fr',
    'développeur web',
    'IoT',
    'informatique',
    'montage PC',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Mylowann Wailly' }],
  creator: 'Mylowann Wailly',
  publisher: 'Wyloz Buisness',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://wailly-mylowann.fr',
    siteName: 'Portfolio Dev',
    title: 'Mylowann Wailly | Portfolio - Developpeur Web & Spécialiste IoT',
    description: 'Services professionnels en développement web, IoT et support informatique',
    images: [
      {
        url: 'https://wailly-mylowann.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mylowann Wailly | Portfolio - Developpeur Web & Spécialiste IoT',
    description: 'Services professionnels en développement web, IoT et support informatique',
    creator: '@MylowannWailly',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-secondary-400 text-primary-500 font-sans">
          <Header />
            <main className="min-h-screen">
              {children}
            </main>
          <Footer />
      </body>
    </html>
  )
}
