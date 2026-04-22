# Image de base (Node LTS, légère)
FROM node:22

# Dossier de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers de dépendances d’abord (meilleur cache)
COPY package*.json ./

# Installer les dépendances (prod uniquement en production)
RUN npm install
RUN npm i baseline-browser-mapping@latest -D
RUN npm audit fix --force

# Copier le reste du code
COPY . .

# Variable d'environnement
ENV PORT=3001

# Database
ENV DATABASE_URL="file:./dev.db"

# Email
ENV EMAIL_USER="portfolio@wailly-mylowann.fr"
ENV EMAIL_PASS="Mylow@nn1236"
ENV EMAIL_RECEIVER="wailly.mylowann@hotmail.fr"
ENV RESEND_API_KEY="re_enQBeNmE_9cUTbUF2LGkNzdxKDNybRXkC"
ENV EMAIL_FROM="onboarding@resend.dev"

#création du dossier uploads
RUN npm run build

# Exposer le port de ton app (adapter si besoin)
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "run", "start"]