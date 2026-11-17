'use client'

import { motion } from 'framer-motion'
import FadeInSection from '@/components/animations/FadeInSection'
import Button from '@/components/ui/Button'
import CustomLink from '@/components/ui/Link'
import Typography from '@/components/ui/Typography';
import CustomTransition from '../ui/transition';

  const menuApplicationMetier = [
    {
      id: "1",
      label: "De L'idée à la mise en production",
      description: "Une seule personne pour la conception, le design, le développement, l'hébergement et les évolutions. Ce qui vous fera gagner du temps et de l'argent",
    },
    {
      id: "2",
      label: "Gestion de stocks et logistique",
      description: "Optimisez votre chaîne d'approvisionnement avec une solution sur mesure pour suivre vos stocks en temps réel, gérer vos commandes et automatiser vos alertes de réapprovisionnement.",
    },
    {
      id: "3",
      label: "Système de réservation en ligne",
      description: "Simplifiez la prise de rendez-vous pour vos clients avec une interface intuitive, une gestion de calendrier dynamique et des notifications automatiques par email ou SMS.",
    },
    {
      id: "4",
      label: "Plateforme E-commerce sur mesure",
      description: "Une boutique en ligne unique qui reflète votre identité de marque, avec une expérience utilisateur fluide, un tunnel d'achat optimisé et une intégration complète de vos moyens de paiement.",
    },
    {
      id: "5",
      label: "Tableau de bord IoT et monitoring",
      description: "Visualisez et contrôlez vos données en temps réel grâce à des solutions IoT connectées, permettant une surveillance à distance et une analyse prédictive de vos équipements.",
    },
  ];


export default function HeroSection() {
  return (
    <section className="text-secondary-400 bg-primary-500 relative z-1 flex min-h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Text */}
          <FadeInSection className="space-y-6">
            <motion.h1
              className="font-display text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              Développeur Web & <span className="text-accent-500">UX/UI</span>
            </motion.h1>

            <motion.p
              className="text-secondary-200 max-w-lg text-lg sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            >
              Services complets en développement web, projets IoT innovants, support informatique et
              assemblage PC sur mesure.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            >
              <CustomTransition targetId="portfolio" variant="blue" className="mx-2">
                  Voir mes Projets
              </CustomTransition>
              <CustomTransition targetId="contact" variant="outline" className="mx-2">
                  Me contacter
              </CustomTransition>
            </motion.div>
          </FadeInSection>

          <motion.div
            className="relative h-96 lg:h-96"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-900 opacity-30 blur-sm" />
            <div className="border-accent-500/30 relative flex h-full items-center justify-center rounded-2xl border">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="mb-4 text-6xl">🚀</p>
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
