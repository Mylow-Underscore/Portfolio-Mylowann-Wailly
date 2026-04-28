'use client'

import { Container } from "@/components/ui/Container";
import VisitCard from "@/components/animations/AnimatedCard";
import Link from "next/link";
import Typography from "@/components/ui/Typography";
import { motion } from 'framer-motion';

import RectoCard from "./../../../public/card/recto.png";
import VersoCard from './../../../public/card/verso.png';

export default function VisitCardPage() {
  return (
        <Container className="space-y-30 ">
            <Typography variant="h1" className="text-4xl font-bold mb-12 text-primary-700">
            Ma carte de visite
            </Typography>
            <motion.div
                className=""
                animate={{  y: [-3.5, 3.5, -3.5],
                            x: [-5, 5, -5],
                            z: [0, 0, 0],
                            rotateY: [0, 0, 0],
                            rotateX: [0, 0, 0],
                            rotateZ: [0, 0, 0],
                }}
                transition={{ duration: 8, repeat: Infinity}}
            >
                <VisitCard className="visitcard w-80 h-96">
                    <img
                        src="/card/verso.png"
                        alt="Verso de la carte de visite"
                        className="imgverso w-full h-full object-cover rounded-2xl"
                    />
                    <img
                        src="/card/recto.png"
                        alt="Recto de la carte de visite"
                        className="imgrecto w-full h-full object-cover rounded-2xl"
                    />
                    <div className="p-6">
                        <Typography variant="h2" className="text-2xl font-bold mb-4 text-primary-700">
                            Mylowann Wailly
                        </Typography>
                        <Typography className="text-gray-600">
                            Entrepreneur & Développeur Web
                        </Typography>
                        <Typography className="text-gray-600">
                            <Link href="mailto:portfolio@wailly-mylowann.fr" className="text-accent-500 hover:underline">
                                portfolio@wailly-mylowann.fr
                            </Link>
                        </Typography>
                    </div>
                </VisitCard>
            </motion.div>
        </Container>
  );
}