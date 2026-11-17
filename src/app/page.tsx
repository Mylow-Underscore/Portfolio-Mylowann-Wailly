import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import ApplicationMetier from '@/components/sections/ApplicationMetier';
import PortfolioSection from '@/components/sections/PortfolioSection';
import Contact from '@/components/sections/Contact';

export const metadata = {
  title: 'Wyloz Buisness | Wailly Mylowann ; Développeur Web',
  description:
    'Découvrez le portfolio de Mylowann Wailly | Wyloz Buisness. Spécialiste en développement Web et référencement SEO, montage PC et solutions Smart Home IoT.',
  keywords: [
    'Wailly Mylowann',
    'Mylowann Wailly',
    'Wailly',
    'Mylowann',
    'Mylow',
    'Wyloz',
    'Wyloz Buisness',
    'Developpeur Web Aude',
    'Developpeur Montagne Noir',
    'wailly-mylowann.fr',
  ],
}

export default function Home() {
  return (
    <div>
      <video className="max-md:hidden fixed z-0 md:flex" autoPlay muted loop playsInline>
        <source src="/hero-bg/hero-bg-3.mp4" type="video/mp4" />
      </video>
      <video className="md:hidden fixed z-0 max-md:flex" autoPlay muted loop playsInline>
        <source src="/hero-bg/hero-bg-portable.mp4" type="video/mp4" />
      </video>
      <div>
        <Hero></Hero>
        <Services></Services>
        <ApplicationMetier></ApplicationMetier>
        <PortfolioSection></PortfolioSection>
        <Contact></Contact>
      </div>
    </div>
  )
}
