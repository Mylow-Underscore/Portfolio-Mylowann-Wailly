import { Container } from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import { Link } from "lucide-react";
import Typography from "@/components/ui/Typography";

export const metadata = {
  title: "Contact - Mylowann Wailly",
  description: "Contactez Mylowann Wailly pour vos demandes",
};

export default function ContactPage() {
  return (
    <main className="flex-grow p-6 py-16">
      <Container>
        <h1 className="text-4xl font-bold mb-12 text-primary-700">
          Me contacter
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Coordonnées</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary-700">Téléphone</h3>
                <a
                  href="tel:0652825239"
                  className="text-secondary-500 hover:text-secondary-600"
                >
                  <Typography variant="body-lg">06 52 82 52 39</Typography>
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-primary-700">Email</h3>
                <a
                  href="mailto:wailly-mylowann@hotmail.com"
                  className="text-secondary-500 hover:text-secondary-600"
                >
                  <Typography variant="body-lg">portfolio@wailly-mylowann.fr</Typography>
                </a>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-neutral-100">Horaires d’ouverture</h2>
                <ul className="text-lg space-y-2">
                  <li><strong>Lundi – Vendredi :</strong> 8h – 18h</li>
                  <li><strong>Samedi :</strong> 9h – 12h</li>
                  <li><strong>Dimanche :</strong> Fermé</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Formulaire de Contact
            </h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}