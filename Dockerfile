# Étape 1 : Construction avec Node.js 22
FROM node:22-alpine AS build
WORKDIR /app

# Copie des fichiers de configuration des dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Compilation de l'application Angular
RUN npm run build

# Étape 2 : Serveur web Nginx pour la production
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers générés vers le dossier de Nginx (avec le dossier /browser pour Angular 17+)
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80
