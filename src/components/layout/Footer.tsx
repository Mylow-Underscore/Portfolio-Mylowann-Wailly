'use client'

import CustomLink from '@/components/ui/Link'
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-secondary-400 relative z-50 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-display mb-4 text-lg font-bold">Portfolio</h3>
            <p className="text-secondary-200 text-sm">
              Développeur web spécialisé en IoT, support informatique et assemblage PC.
            </p>
          </div>

          

          <div>
            <h3 className="font-display mb-4 text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Développement Web</li>
              <li>Solutions IoT</li>
              <li>Support IT</li>
              <li>Montage PC</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent-500" />
                <CustomLink href="mailto:wailly.mylowann@hotmail.com">
                  wailly.mylowann@hotmail.com
                </CustomLink>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent-500" />
                <CustomLink href="tel:+33652835239">+33 6 52 83 52 39</CustomLink>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent-500 mt-0.5" />
                <span>Toulouse, France</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-400 mb-8" />

        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-secondary-200 mb-4 text-sm md:mb-0">
            © {currentYear} Wyloz Buisness, SASU. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6">
            <CustomLink href="https://github.com/Mylow-Underscore">
              <Github size={20} />
            </CustomLink>
            <CustomLink href="https://www.linkedin.com/in/mylowann-wailly-8b57a3241/">
              <Linkedin size={20} />
            </CustomLink>
            <CustomLink href="https://www.instagram.com/wyloz._/">
              <Instagram size={20} />
            </CustomLink>
          </div>

          {/* Legal Links */}
          <div className="mt-4 flex items-center gap-4 text-sm md:mt-0">
            <CustomLink href="/Confidentialite">Confidentialité</CustomLink>
            <span className="text-secondary-300">|</span>
            <CustomLink href="/Conditions">Conditions</CustomLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
