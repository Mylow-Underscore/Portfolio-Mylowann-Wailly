# Image de base (Node LTS, légère)
FROM node:22-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers de dépendances d’abord (meilleur cache)
COPY package*.json ./

# Installer les dépendances (prod uniquement en production)
RUN npm ci --omit=dev
RUN npm i baseline-browser-mapping@latest -D

# Copier le reste du code
COPY . .

# Variable d'environnement
ENV PORT=3101

#Email
ENV EMAIL_USER="portfolio@wailly-mylowann.fr"
ENV EMAIL_PASS="Mylow@nn1236"
ENV EMAIL_RECEIVER="wailly.mylowann@hotmail.fr"
ENV RESEND_API_KEY="re_i2EZ341m_Jj3sQJdtSmXnZ1hT7tBy5UYD"
ENV EMAIL_FROM="onboarding@resend.dev"

#création du dossier uploads
RUN npm run build

EXPOSE 3101

# Commande de démarrage
CMD ["npm", "run", "start"]