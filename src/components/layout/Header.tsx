'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import {
  motion,
  animate,
  AnimatePresence,
  useScroll,
  useTransform,
  delay,
} from "motion/react";
import { usePathname } from 'next/navigation'

import Button from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'
import CustomLink from "@/components/ui/Link";
import CustomTransition from "@/components/ui/transition";


interface ClientData {
  id: number
  code: string
  nomPrenom: string
  raison_Sociale: string | null
  siret: string | null
  facturation: string | null
  tel: string | null
  email: string | null
  createdAt: string
}

export default function Header() {
  const [client, setClient] = useState<ClientData | null>(null)
  const [scrolled, setScrolled]     = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCompta, setIsCompta] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname();
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    Promise.all([
      fetch('/api/auth/me').then(async (r) => {
        
        const d = await r.json()
        setClient(d.client)
        setIsAdmin(d.isAdmin)
        setIsCompta(d.isCompta)
      }),
    ])
      .catch(() => router.replace('/login'))
      .finally(() => setLoading(false))
      
    return () => window.removeEventListener("scroll", onScroll);
  }, [router])

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const isHomePage = pathname === '/';
  const isComptePage = pathname === '/compte';

  const menuItemsSCrolled = [
    { label: 'Accueil', targetId: 'hero' },
    { label: 'Portfolio', targetId: 'portfolio' },
    { label: 'Contact', targetId: 'contact' },
  ]

  const menuItemsLinked = [
    { label: 'Login', href: '/login' },
  ]

  const homeLink = !isHomePage ? [
    { label: 'Accueil', href: '/' },
  ] : [];

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${scrolled ? "backdrop-blur-md border-b border-[#EDE8DB]" : "bg-transparent"} sticky top-0 z-100`}>
      <motion.nav
        className={`z-100 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 0.92 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="z-50 flex items-center justify-between">
          <CustomLink href="/" variant="blue" className="z-50 hover:text-accent-500 transition-colors">
            <button className="font-display text-xl font-bold">Wyloz Buisness</button>
          </CustomLink>

          <div className="items-center justify-between max-md:hidden md:flex">
            {isHomePage ? (
              <div>
                {menuItemsSCrolled.map((item) => (
                    <CustomTransition key={item.targetId} targetId={item.targetId} className="mx-2">
                      {item.label}
                    </CustomTransition>
                ))}
                {menuItemsLinked.map((item) => (
                    <CustomTransition key={item.href} href={item.href} variant="outline" className="mx-2">
                      {item.label}
                    </CustomTransition>
                ))}
                {homeLink.length > 0 && homeLink.map((item) => (
                    <CustomTransition key={item.href} href={item.href} variant="outline" className="mx-2">
                      {item.label}
                    </CustomTransition>
                ))}
              </div>
              ) : (
                <div>
                  {homeLink.map((item) => (
                    <CustomLink key={item.href} href={item.href} variant="outline">
                      {item.label}
                    </CustomLink>
                  ))}
                </div>
              )}

              {isComptePage ? (
                <div className="mx-1" style={{ display: 'flex', alignItems: 'center' }}>
                  {isAdmin && <CustomLink href="/admin">Admin ⚙</CustomLink>}
                  {isCompta && <CustomLink href="/compta">Compta 💰</CustomLink>}
                  <motion.button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'transparent',
                      padding: '7px 16px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {loggingOut ? '…' : 'Déconnexion'}
                  </motion.button>
                </div>
              ) : (
                <div className="mx-1" style={{ display: 'flex', alignItems: 'center' }}>
                  
                </div>
              )}
          </div>

          <div className="max-md:flex md:hidden items-center">
            {menuItemsLinked.map((item) => (
              <CustomLink key={item.href} href={item.href} variant="outline" className="mx-4">
                {item.label}
              </CustomLink>
            ))}

            {isComptePage ? (
                <div className="mx-1" style={{ display: 'flex', alignItems: 'center' }}>
                  {isAdmin && <CustomLink href="/admin">Admin ⚙</CustomLink>}
                  {isCompta && <CustomLink href="/compta">Compta 💰</CustomLink>}
                  <motion.button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'transparent',
                      padding: '7px 16px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {loggingOut ? '…' : 'Déconnexion'}
                  </motion.button>
                </div>
              ) : (
                <div className="mx-1" style={{ display: 'flex', alignItems: 'center' }}>
                  
                </div>
              )}

            {isHomePage ? (
              <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            ) : (
              <div className="">
                {homeLink.map((item) => (
                  <CustomLink key={item.href} href={item.href} variant="outline">
                    {item.label}
                  </CustomLink>
                ))}
              </div>
            )}
          </div>


        </div>

        {isMobileMenuOpen && (
          <div className="grid grid-cols-1 mt-4 space-y-4 pb-4 md:hidden">
            {menuItemsSCrolled.map((item) => (
                <CustomTransition key={item.targetId} targetId={item.targetId} >
                  {item.label}
                </CustomTransition>
            ))}

            <hr className="border-primary-400" />

            {menuItemsLinked.map((item) => (
                <CustomTransition key={item.href} href={item.href} >
                  {item.label}
                </CustomTransition>
            ))}

            {homeLink.length > 0 && homeLink.map((item) => (
                <CustomTransition key={item.href} href={item.href} >
                  {item.label}
                </CustomTransition>
            ))}
          </div>
        )}
      </motion.nav>
    </header>
  )
}
