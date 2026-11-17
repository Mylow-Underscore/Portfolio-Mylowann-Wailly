'use client'

import React from 'react'
import { Typography } from '@/components/ui/Typography'
import { Container } from '@/components/ui/Container'
import ContactForm from '@/components/forms/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'
import FadeInSection from '@/components/animations/FadeInSection'
import CustomLink from '../ui/Link';

/**
 * Section de contact incluant un formulaire et les coordonnées directes.
 * Stylisé pour correspondre aux autres sections du portfolio (bg-primary-500).
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-primary-500 text-secondary-400 justify-left relative flex min-h-screen items-center px-6 py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Informations de contact */}
          <div className="space-y-8">
            <FadeInSection>
              <div>
                <Typography variant="h2" className="mb-4 font-display">
                  Contactez-moi
                </Typography>
                <Typography variant="body-lg" color="muted">
                  Vous avez un projet en tête ? Une question sur mes services ou simplement envie de discuter ? 
                </Typography>
                <Typography variant="body-lg" color="muted">
                  N&apos;hésitez pas à me contacter via le formulaire ci-contre ou directement par mes coordonnées.
                </Typography>
              </div>
            </FadeInSection>


            <div className="grid grid-cols-2 items-center mt-10 md:grid-cols-1">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary rounded-full">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="mx-4">
                    <Typography variant="h4">Email</Typography>
                    <CustomLink href="mailto:wailly.mylowann@hotmail.com">
                      wailly.mylowann@hotmail.com
                    </CustomLink>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary rounded-full">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="mx-4">
                    <Typography variant="h4">Téléphone</Typography>
                    <CustomLink href="tel:+33652835239">
                      +33 6 52 83 52 39
                    </CustomLink>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary rounded-full">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="mx-4">
                    <Typography variant="h4">Localisation</Typography>
                    <Typography variant="body-base" color="muted">
                      Toulouse, France
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="w-full">
            <FadeInSection>
              <ContactForm />
            </FadeInSection>
          </div>
        </div>
      </Container>
    </section>
  )
}
