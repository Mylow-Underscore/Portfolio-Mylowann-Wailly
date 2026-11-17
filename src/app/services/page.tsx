import { Container } from '@/components/ui/Container'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { services } from '@/data/services'
import Typography from '@/components/ui/Typography'

export const metadata = {
  title: 'Services & Expertise | Wyloz Buisness',
  description:
    'Services professionnels en développement Web, IoT et support informatique par Wyloz Buisness.',
  keywords: [
    'Wailly Mylowann',
    'Mylowann Wailly',
    'Wyloz',
    'Développeur Web Aude',
    'Developpeur Montagne Noir',
    'services informatique',
    'Smart Home',
  ],
}

export default function ServicesPage() {
  return (
    <main className="text-secondary-400 bg-primary-500 relative z-1 flex min-h-screen items-center overflow-hidden">
      <Container className="">
        <Typography variant="h1" className="text-primary-700 mb-4 text-center font-bold">
          Mes services
        </Typography>
        <Typography variant="body-base" className="mb-12 text-center text-neutral-600">
          Je propose une gamme complète de services pour tous vos besoins en Informatique.
        </Typography>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </main>
  )
}
