'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Button from '@/components/ui/Button'
import { GalleryVerticalEnd, Menu, X } from 'lucide-react'


export default function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-primary text-secondary-400 shadow-lg">
      <nav className="z-50 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="z-50 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-500"></span>
            </div>
            <GalleryVerticalEnd size={20} />
            <span className="font-display font-bold text-xl">Portfolio</span>
          </Link>

          <div className="max-md:hidden md:flex items-center gap-8">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent-500 transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* <div className="sm:hidden lg:flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium hover:text-accent-500 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="gold" size="sm">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div> */}

          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:text-accent-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-primary-400" />
            {session ? (
              <>
                <Link href="/dashboard" className="block">
                  Dashboard
                </Link>
                <Button
                  onClick={() => {
                    signOut()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left hover:text-accent-500"
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  Connexion
                </Link>
                <Link href="/register" className="block">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}