'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-primary text-secondary-400 pt-16 pb-8 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Portfolio</h3>
            <p className="text-secondary-200 text-sm">
              Développeur web spécialisé en IoT, support informatique et assemblage PC.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent-500 transition-colors">
                  Accuei
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent-500 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Web Development</li>
              <li>IoT Solutions</li>
              <li>Support IT</li>
              <li>Montage PC</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent-500" />
                <a href="mailto:wailly.mylowann@hotmail.com" className="hover:text-accent-500">
                  wailly.mylowann@hotmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent-500" />
                <a href="tel:+33652835239" className="hover:text-accent-500">
                  +33 6 52 83 52 39
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent-500 mt-0.5" />
                <span>France</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-400 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-200 mb-4 md:mb-0">
            © {currentYear} Wyloz, Micro. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/Mylow-Underscore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-200 hover:text-accent-500 transition-colors"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mylowann-wailly-8b57a3241/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-200 hover:text-accent-500 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/wyloz._/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-200 hover:text-accent-500 transition-colors"
            >
              <Instagram size={20} />
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-accent-500 transition-colors">
              Confidentialité
            </Link>
            <span className="text-secondary-300">|</span>
            <Link href="/terms" className="hover:text-accent-500 transition-colors">
              Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}