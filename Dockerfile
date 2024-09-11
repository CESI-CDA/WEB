# Utiliser une image de node comme base
FROM node:18

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le répertoire de travail
COPY . .

# Construire l'application React pour la production
RUN npm run build

# Exposer le port 80
EXPOSE 80

# Lancer l'application quand le conteneur démarre
CMD ["npm", "start"]

