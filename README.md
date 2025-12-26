# 🌐 Portfolio Web - Développeur Web & Spécialiste IoT

> Une plateforme complète de portfolio professionnel avec authentification, galerie de projets, gestion clients et tableau de bord administrateur. Construit avec **Next.js 15**, **TypeScript**, **TailwindCSS** et **Framer Motion**.

---

## 🎯 Caractéristiques Principales

### 🌟 Frontend
- ✅ **Design Luxury Modern** - Palette noire, or et blanc cassé
- ✅ **Animations fluides** - Framer Motion pour scroll reveals & transitions
- ✅ **Responsive complet** - Mobile-first, adapté desktop
- ✅ **Performance optimisée** - Next.js Image, Code Splitting, Lazy Loading
- ✅ **Galerie Portfolio** - Filtrable par catégories (Web Dev, IoT, Informatique, Montage PC)
- ✅ **Blog** - Articles avec tags et recherche
- ✅ **Formulaire Contact** - Validation côté client/serveur

### 🔐 Authentification & Sécurité
- ✅ **NextAuth.js** - Sessions JWT sécurisées
- ✅ **Bcrypt** - Hashage sécurisé des mots de passe
- ✅ **Protected Routes** - Middleware d'authentification
- ✅ **Rôles** - Admin, Client, User
- ✅ **Réinitialisation mot de passe** - Par email

### 📊 Dashboard Client
- ✅ **Vue d'ensemble** - Statistiques personnelles
- ✅ **Gestion Projets** - Liste des projets assignés
- ✅ **Support Tickets** - Création et suivi en temps réel
- ✅ **Facturation** - Historique et paiement en ligne
- ✅ **Paramètres** - Profil et préférences

### 🛠️ Admin Panel
- ✅ **Gestion Utilisateurs** - CRUD complet
- ✅ **Gestion Portfolio** - Ajouter/éditer/supprimer projets
- ✅ **Gestion Tickets** - Assignation et résolution
- ✅ **Analytics** - Tableaux de bord statistiques
- ✅ **CMS** - Gestion du contenu

### 💾 Base de Données
- ✅ **PostgreSQL** + Prisma ORM
- ✅ **Schéma complet** - Users, Projects, Tickets, Invoices, etc.
- ✅ **Migrations** - Versionnage des changements
- ✅ **Relations** - Properly modeled pour intégrité

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 20+
- PostgreSQL 14+
- npm ou yarn

### Installation

**1. Cloner le projet**
```bash
git clone <your-repo-url>
cd portfolio-dev
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer les variables d'environnement**
```bash
cp .env.example .env.local
# Éditer .env.local avec vos paramètres
```

**4. Initialiser la base de données**
```bash
# Créer la BD et exécuter les migrations
npx prisma migrate dev --name init

# Ouvrir Prisma Studio (optionnel)
npx prisma studio
```

**5. Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🎉

---

## 📂 Structure du Projet

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Routes publiques
│   ├── (auth)/            # Authentification
│   ├── (private)/         # Routes protégées
│   ├── api/               # API Routes
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants atomiques
│   ├── layout/           # Header, Footer, etc.
│   ├── sections/         # Sections de page
│   ├── animations/       # Composants animés
│   └── forms/            # Formulaires complexes
├── types/                # Interfaces TypeScript
├── styles/               # CSS custom
├── utils/                # Fonctions utilitaires
├── hooks/                # Custom React Hooks
├── services/             # API Client Services
├── lib/                  # Configurations
├── context/              # React Context
└── middleware.ts         # Middleware Next.js

prisma/
├── schema.prisma         # Schéma BDD
└── migrations/           # Historique des migrations

public/                   # Assets statiques
```

---

## 🎨 Design System

### Palette Couleurs

| Usage | Couleur | Code |
|-------|---------|------|
| Primaire | Noir Charbon | `#1a1a1a` |
| Secondaire | Blanc Cassé | `#f5f5f0` |
| Accent | Or Classique | `#d4af37` |
| Succès | Vert | `#10b981` |
| Erreur | Rouge | `#ef4444` |
| Alerte | Orange | `#f59e0b` |

### Typography

- **Affichage** : Space Grotesk (Google Fonts)
- **Corps** : Inter (Google Fonts)
- **Mono** : JetBrains Mono

### Animations

- `fade-in` - Apparition progressive (0.5s)
- `slide-in-up/down/left/right` - Glissement (0.5s)
- `bounce-in` - Rebond (0.6s)
- `scale-in` - Zoom (0.4s)
- Scroll Reveals - Activation au défilement

---

## 🔌 API Routes

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/forgot-password` - Réinitialisation

### Projets
- `GET /api/projects` - Récupérer tous les projets
- `GET /api/projects/[id]` - Détail d'un projet
- `POST /api/projects` - Créer un projet (admin)
- `PUT /api/projects/[id]` - Modifier un projet (admin)
- `DELETE /api/projects/[id]` - Supprimer un projet (admin)

### Tickets Support
- `GET /api/tickets` - Récupérer mes tickets
- `GET /api/tickets/[id]` - Détail du ticket
- `POST /api/tickets` - Créer un ticket
- `PUT /api/tickets/[id]` - Mettre à jour le statut
- `POST /api/tickets/[id]/responses` - Ajouter une réponse

### Contact
- `POST /api/contact` - Envoyer un message de contact

---

## 🛣️ Pages Disponibles

### Publiques
- `/` - Accueil
- `/portfolio` - Galerie complète
- `/portfolio/[slug]` - Détail du projet
- `/services` - Services offerts
- `/about` - À propos
- `/blog` - Articles
- `/blog/[slug]` - Article détaillé
- `/contact` - Formulaire de contact

### Authentification
- `/login` - Connexion
- `/register` - Inscription
- `/forgot-password` - Réinitialisation

### Privées (Client)
- `/dashboard` - Vue d'ensemble
- `/dashboard/projects` - Mes projets
- `/dashboard/tickets` - Support tickets
- `/dashboard/invoices` - Facturation
- `/dashboard/settings` - Paramètres

### Admin
- `/admin/dashboard` - Dashboard admin
- `/admin/users` - Gestion utilisateurs
- `/admin/projects` - Gestion portfolio
- `/admin/tickets` - Gestion tickets
- `/admin/analytics` - Statistiques

---

## 🔧 Configuration

### Tailwind CSS
Fichier : `tailwind.config.ts`

```typescript
// Ajouter des couleurs custom
colors: {
  primary: '#1a1a1a',
  accent: '#d4af37',
}

// Ajouter des animations
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
}
```

### TypeScript
Fichier : `tsconfig.json`

Path aliases pré-configurés :
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/types` → `src/types`

### Next.js
Fichier : `next.config.ts`

Configurations :
- Image optimization
- Security headers
- Redirects & rewrites

---

## 📦 Dépendances Principales

| Package | Version | Usage |
|---------|---------|-------|
| next | 15.0.0 | Framework web |
| react | 19.0.0 | Librairie UI |
| typescript | 5.x | Typage statique |
| tailwindcss | 4.x | Styles utilitaires |
| next-auth | 5.x | Authentification |
| @prisma/client | 6.x | ORM Database |
| framer-motion | 11.x | Animations |
| react-hook-form | 7.x | Gestion formulaires |
| zod | 3.x | Validation schémas |
| axios | 1.x | HTTP Client |

Voir `package.json` pour la liste complète.

---

## 🧪 Tests

### Tests unitaires
```bash
npm run test
```

### Tests en mode watch
```bash
npm run test:watch
```

### Tests E2E
```bash
npm run test:e2e
```

---

## 📝 Scripts Utiles

```bash
# Développement
npm run dev          # Lancer serveur dev
npm run build        # Build pour production
npm run start        # Démarrer prod

# Code quality
npm run lint         # Vérifier linting
npm run format       # Formater le code
npm run type-check   # Vérifier types TypeScript

# Database
npm run db:push      # Synchroniser schema
npm run db:studio    # Ouvrir Prisma Studio
npm run db:migrate   # Créer une migration

# Tests
npm run test         # Lancer tests
npm run test:watch   # Mode watch
npm run test:e2e     # Tests E2E
```

---

## 🚢 Déploiement

### Vercel (Recommandé)

1. **Pousser le code sur GitHub**
```bash
git push origin main
```

2. **Connecter à Vercel**
   - Visiter [vercel.com](https://vercel.com)
   - Importer votre repo
   - Ajouter variables d'environnement

3. **Déployer**
   - Vercel build automatiquement

### Docker

**Build l'image**
```bash
docker build -t portfolio-dev .
```

**Lancer le conteneur**
```bash
docker run -p 3000:3000 portfolio-dev
```

**Avec Docker Compose**
```bash
docker-compose up -d
```

---

## 🐛 Dépannage

### Erreur: "DATABASE_URL not found"
```bash
# Vérifier .env.local existe et contient DATABASE_URL
cat .env.local | grep DATABASE_URL

# Redémarrer le serveur dev
npm run dev
```

### Erreur: "Prisma error"
```bash
# Régénérer Prisma client
npx prisma generate

# Vérifier connexion BD
npx prisma db push
```

### Tailwind colors ne s'appliquent pas
```bash
# Redémarrer le serveur dev
npm run dev

# Vérifier tailwind.config.ts includes tous les fichiers
```

### NextAuth session non disponible
```bash
# Vérifier SessionProvider dans layout.tsx
# Vérifier NEXTAUTH_SECRET dans .env.local
# Régénérer clé: openssl rand -base64 32
```

---

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion)

---

## 📄 Licence

MIT License - Voir [LICENSE.md](LICENSE.md)

---

## 💬 Support

Pour des questions ou problèmes :
1. Vérifier la [documentation](./GETTING-STARTED.md)
2. Consulter les issues GitHub
3. Créer une nouvelle issue si nécessaire

---

**Construit avec ❤️ pour les développeurs modernes**
