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
ENV PORT=3001

# Database
ENV DB_HOST="82.65.202.204"
ENV DB_PORT="3306"
ENV DB_USER="mylow"
ENV DB_PASSWORD="WylozBuisness#1236"
ENV DB_NAME="WylozBuisness"

ENV DATABASE_URL="mysql://mylow:WylozBuisness%231236@82.65.202.204:3306/WylozBuisness"
ENV SESSION_SECRET="VSZjP3ZPMlxadzJmemM6JlNOKGVrVzU5YUJOZk5qLWoyVWF2VGMoMCxTfGxdWWBX"
ENV ADMIN_CODE="WylozBuisness#2026"
ENV ADMIN_PASSWORD="WylozBuisness#2026"


# Email 
ENV EMAIL_USER="portfolio@wailly-mylowann.fr"
ENV EMAIL_PASS="Mylow@nn1236"
ENV EMAIL_RECEIVER="Contact <portfolio@wailly-mylowann.fr>"
ENV EMAIL_FROM="Contact <portfolio@wailly-mylowann.fr>"

# SMTP Configuration
ENV SMTP_HOST="82.65.202.204"
ENV SMTP_PORT=25


ENV RESEND_API_KEY=re_FjfGXU3i_28eirgCKq2eqLcRWhF6FSsua



RUN npx prisma generate

# Création du dossier uploads
RUN npm run build
EXPOSE 3001

# Commite de démarrage
CMD ["npm", "run", "start"]
