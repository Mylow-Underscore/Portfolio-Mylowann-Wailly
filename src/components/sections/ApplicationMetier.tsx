'use client'

import { motion } from 'framer-motion'
import FadeInSection from '@/components/animations/FadeInSection'
import Button from '@/components/ui/Button'
import CustomLink from '@/components/ui/Link'
import Typography from '@/components/ui/Typography';

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


export default function ApplicationMetier() {
  return (
    <section id="application-metiers" className="bg-primary-500 relative z-1 min-h-screen">
        <div className="z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid min-lg:grid-cols-2 mt-10 md:grid-col-1 sm:grid-col-1">
                <motion.div className="flex flex-col py-0.5">
                    {menuApplicationMetier.map((item) => (
                        <motion.div className="flex flex-col py-0.5" key={item.id}>                        
                            <Typography key={item.label} variant="h3">
                                <Typography key={item.id} variant="caption" color="success" className="px-2">
                                    <strong>
                                        {item.id}
                                    </strong>
                                </Typography>
                                {item.label}
                            </Typography>
                            <Typography key={item.description} variant="body-base" className="px-6">
                                {item.description}
                            </Typography>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="mx-4">
                    <Typography variant="h1">
                        Le logiciel que votre métier réclame, développé de A à Z.
                    </Typography>
                    <Typography variant="body-base">
                        Quand aucun outil du marché ne correspond vraiment à votre façon de travailler, nous développons le vôtre.
                         Cadrage, base de données, interfaces, automatisations, intelligence artificielle, 
                         hébergement et mise en production : tout est fait ici, par la même équipe, et beaucoup plus vite qu&apos;un développement classique.
                    </Typography>
                    
                </motion.div>
            </div>
        </div>
    </section>
  )
}