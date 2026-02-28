import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-4">
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        Erreur 404
      </p>

      <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-center">
        Cette page est introuvable
      </h1>

      <p className="mt-4 max-w-md text-center text-neutral-400">
        La page que tu cherches n’existe pas ou a été déplacée. 
        Retourne à l’accueil pour continuer ta visite.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-6 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-800 hover:border-neutral-500 transition-colors"
      >
        ⬅ Retour à l&apos;accueil
      </Link>
    </main>
  );
}