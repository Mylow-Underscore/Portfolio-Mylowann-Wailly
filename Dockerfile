# Image de base (Node LTS, légère)
FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers de dépendances d’abord (meilleur cache)
COPY package*.json ./

# Installer les dépendances (prod uniquement en production)
RUN npm ci --only=production

# Copier le reste du code
COPY . .

# Variable d'environnement
ENV NODE_ENV=production

# Exposer le port de ton app (adapter si besoin)
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "prisma","migrate", "deploy", "&&", "npm", "run","start"]
