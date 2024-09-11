# Utiliser une image de node comme base
FROM node:18

# Créer le répertoire de travail
WORKDIR /app

# Exposer le port 80
EXPOSE 80

# Lancer l'application quand le conteneur démarre
CMD ["npm", "start"]

