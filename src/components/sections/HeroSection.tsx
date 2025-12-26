'use client'

import { motion } from 'framer-motion'
import FadeInSection from '@/components/animations/FadeInSection'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen text-secondary-400 overflow-hidden flex items-center bg-primary-500 z-1">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <FadeInSection className="space-y-6">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              Développeur Web & <span className="text-accent-500">Spécialiste IoT</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-secondary-200 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            >
              Services complets en développement web, projets IoT innovants, support informatique et assemblage PC sur mesure.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            >
              <Link href="/projects">
                <Button variant="gold" size="lg">
                  Voir mes Projets
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Me contacter
                </Button>
              </Link>
            </motion.div>
          </FadeInSection>

          <motion.div
            className="relative h-96 lg:h-96"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-gold rounded-2xl opacity-20 blur-3xl" />
            <div className="relative bg-secondary-400/10 rounded-2xl border border-accent-500/30 h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-6xl mb-4">🚀</p>
                </motion.div>
                <p className="text-secondary-200">Solutions techniques sur mesure</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}