'use client'

import { Container } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowBigDownDash } from 'lucide-react'
import Typography from "../ui/Typography";

export default function Hero() {
  return (
    <section className="relative min-h-screen text-secondary-400 overflow-hidden flex items-center bg-primary-500 z-1">
      
        
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            Wailly Mylowann - Informaticien / Developpeur
          </h1>
          <p className="text-xl text-neutral-100 mb-8">
            Depuis 2023, j'accompagne les particuliers et les professionnels
            dans leurs projets informatique de Development web ou équipement matériels.
          </p>
          <div className="flex gap-4">
            <Link href="/devis">
              <Button variant="secondary" size="lg" className="hover:bg-accent hover:cursor-pointer">
                Demander un devis
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-accent hover:cursor-pointer">
                Mes Projets
              </Button>
            </Link>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-100">Horaires d’ouverture</h2>
          <ul className="text-lg space-y-2">
            <li><strong>Lundi – Vendredi :</strong> 8h – 18h</li>
            <li><strong>Samedi :</strong> 9h – 12h</li>
            <li><strong>Dimanche :</strong> Fermé</li>
          </ul>
        </section>
      
        
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center">
            <Typography  className="mb-2" variant="body-sm" color="secondary">Scroll</Typography>
            <div className="flex justify-center m-1">
              <ArrowBigDownDash size={28} />
            </div>
          </div>
        </motion.div>
      </div>
    </section> 
  );
}