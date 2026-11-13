'use client'

import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowBigDownDash } from 'lucide-react'
import Typography from "../ui/Typography";

export default function Hero() {
  return (
    <section className="relative bg-primary-500 text-secondary-400 min-h-screen flex items-center justify-left px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:max-w-6xl">
        <div className="">
          
          <h1 className="text-5xl font-bold mb-6">
            Wailly Mylowann - Developpeur | Informaticien
          </h1>
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
      </div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-25 z-10"
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
    </section> 
  );
}