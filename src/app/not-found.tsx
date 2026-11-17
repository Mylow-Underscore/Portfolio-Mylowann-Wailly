import CustomLink from '@/components/ui/Link'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 text-neutral-100">
      <p className="text-sm tracking-[0.3em] text-neutral-500 uppercase">Erreur 404</p>

      <h1 className="mt-3 text-center text-3xl font-semibold md:text-5xl">
        Cette page est introuvable
      </h1>

      <p className="mt-4 max-w-md text-center text-neutral-400">
        La page que tu cherches n’existe pas ou a été déplacée. Retourne à l’accueil pour continuer
        ta visite.
      </p>

      <CustomLink href="/">⬅ Retour à l&apos;accueil</CustomLink>
    </main>
  )
}
