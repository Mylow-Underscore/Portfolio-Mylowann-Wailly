'use client'

import { Container } from '@/components/ui/Container'
import VisitCard from '@/components/animations/AnimatedCard'
import CustomLink from '@/components/ui/Link'
import Typography from '@/components/ui/Typography'
import { motion } from 'framer-motion'

export default function VisitCardPage() {
  return (
    <Container className="space-y-30">
      <Typography variant="h1" className="text-primary-700 mb-12 text-4xl font-bold">
        Ma carte de visite
      </Typography>
      <Container>
        <motion.div
          className=""
          animate={{
            y: [-3.5, 3.5, -3.5],
            x: [-5, 5, -5],
            z: [0, 0, 0],
            rotateY: [0, 0, 0],
            rotateX: [0, 0, 0],
            rotateZ: [0, 0, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <VisitCard className="visitcard h-96 w-80 cursor-pointer">
            <img
              src="/card/verso.png"
              alt="Verso de la carte de visite"
              className="imgverso h-full w-full rounded-2xl object-cover"
            />
            <img
              src="/card/recto.png"
              alt="Recto de la carte de visite"
              className="imgrecto h-full w-full rounded-2xl object-cover"
            />
            <div className="p-6">
              <Typography variant="h2" className="text-primary-700 mb-4 text-2xl font-bold">
                Mylowann Wailly
              </Typography>
              <Typography className="text-gray-600">Entrepreneur & Développeur Web</Typography>
              <Typography className="text-gray-600">
                <CustomLink href="mailto:portfolio@wailly-mylowann.fr">
                  portfolio@wailly-mylowann.fr
                </CustomLink>
              </Typography>
            </div>
          </VisitCard>
        </motion.div>
      </Container>
    </Container>
  )
}
