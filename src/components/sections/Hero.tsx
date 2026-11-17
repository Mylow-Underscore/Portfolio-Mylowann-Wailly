'use client'

import { Container } from '@/components/ui/Container'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowBigDownDash } from 'lucide-react'
import Typography from '../ui/Typography'
import CustomTransition from '../ui/transition';

export default function Hero() {
  return (
    <section id="hero" className="bg-primary-500 text-secondary-400 justify-left relative flex min-h-screen items-center px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:max-w-6xl md:flex-row">
        <div className="">
          <Typography variant="h1" className="space-y-2">
            WYLOZ BUISNESS | Wailly Mylowann - Developpeur, Informaticien
          </Typography>
          <Typography variant="h2" className="space-y-2">
            Sites web & applications
          </Typography>
          <Typography variant="body-base" className="space-y-2">
            De la vitrine à l&apos;application métier sur mesure, je conçois et développe vos outils web de A à Z : rapidement et avec justesse, grâce à toute mon expérience. 
          </Typography>


          <div className="flex gap-4">
            <CustomTransition className="mx-2" targetId="contact" variant="blue">
                Demander un devis
            </CustomTransition>
            <CustomTransition className="mx-2" variant="outline" targetId="application-metiers">
                Application Metier
            </CustomTransition>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-25 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center">
          <Typography className="mb-2" variant="body-sm" color="secondary">
            Scroll
          </Typography>
          <div className="m-1 flex justify-center">
            <ArrowBigDownDash size={28} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
