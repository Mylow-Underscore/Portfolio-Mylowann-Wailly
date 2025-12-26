import { Container } from "@/components/ui/Container";
import DevisForm from "@/components/forms/DevisForm";

export const metadata = {
  title: "Demander un Devis - PM Rénovation",
  description: "Demandez gratuitement un devis pour vos travaux",
};

export default function DevisPage() {
  return (
    <main className="flex-grow py-16">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-primary-700">
            Demander un Devis
          </h1>
          <p className="text-neutral-600 mb-12">
            Remplissez le formulaire ci-dessous pour nous décrire votre
            projet. Nous reviendrons vers vous rapidement avec un devis
            personnalisé et sans engagement.
          </p>
          <DevisForm />
        </div>
      </Container>
    </main>
  );
}