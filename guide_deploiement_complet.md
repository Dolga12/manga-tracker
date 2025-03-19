# Guide de déploiement complet - MangaTracker

## Introduction
Ce guide vous explique comment finaliser le déploiement complet de votre application MangaTracker, incluant le backend et la base de données.

## Prérequis
- Un compte [Render](https://render.com) (service gratuit disponible)
- Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (niveau gratuit disponible)

## Étape 1: Configuration de MongoDB Atlas
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster (le niveau gratuit est suffisant)
3. Dans "Database Access", créez un nouvel utilisateur avec les permissions de lecture/écriture
4. Dans "Network Access", ajoutez 0.0.0.0/0 pour permettre l'accès depuis n'importe où
5. Notez votre chaîne de connexion qui ressemblera à:
   `mongodb+srv://username:password@cluster0.mongodb.net/manga_tracker?retryWrites=true&w=majority`

## Étape 2: Déploiement du backend sur Render
1. Créez un compte sur [Render](https://render.com)
2. Sélectionnez "New Web Service"
3. Connectez votre dépôt GitHub ou téléchargez le code du backend
4. Configurez le service:
   - Nom: manga-tracker-api
   - Runtime: Node.js
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Ajoutez les variables d'environnement:
   - PORT: 10000
   - NODE_ENV: production
   - MONGO_URI: (votre chaîne de connexion MongoDB Atlas)
   - JWT_SECRET: manga_tracker_secret_key
   - CORS_ORIGIN: https://svatucqv.manus.space
6. Déployez le service

## Étape 3: Mise à jour du frontend
1. Remplacez le fichier de configuration API dans votre frontend
2. Assurez-vous que l'URL du backend pointe vers votre service Render
3. Redéployez le frontend si nécessaire

## Étape 4: Test de l'application complète
1. Accédez à votre frontend: https://svatucqv.manus.space
2. Vérifiez que la recherche de mangas fonctionne
3. Testez l'ajout de mangas à votre bibliothèque
4. Vérifiez le suivi de progression de lecture

## Dépannage
- Si le backend ne répond pas immédiatement, attendez quelques instants (le plan gratuit de Render met en veille les services inactifs)
- Vérifiez les journaux sur Render pour identifier d'éventuelles erreurs
- Assurez-vous que les variables d'environnement sont correctement configurées

## Ressources
- Documentation Render: https://render.com/docs
- Documentation MongoDB Atlas: https://docs.atlas.mongodb.com/
- Code source du backend: inclus dans les fichiers fournis
- Configuration API du frontend: incluse dans les fichiers fournis
