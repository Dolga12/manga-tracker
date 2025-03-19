# Guide de déploiement sur Render

Ce guide explique comment déployer le backend corrigé de l'application MangaTracker sur Render.

## Prérequis

- Un compte Render
- Les informations de connexion MongoDB (utilisateur, mot de passe, cluster, nom de base de données)

## Étapes de déploiement

### 1. Mettre à jour les variables d'environnement sur Render

1. Connectez-vous à votre compte Render
2. Accédez au service existant à l'URL: https://manga-tracker-api.onrender.com
3. Cliquez sur l'onglet "Environment"
4. Mettez à jour les variables d'environnement suivantes:

```
PORT=10000
NODE_ENV=production
MONGO_URI=mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority
JWT_SECRET=votre_secret_jwt
CORS_ORIGIN=https://svatucqv.manus.space
```

Remplacez `${MONGO_USER}`, `${MONGO_PASSWORD}`, `${MONGO_CLUSTER}` et `${MONGO_DB}` par vos informations MongoDB réelles.

### 2. Mettre à jour le code source

1. Dans l'onglet "Settings", assurez-vous que:
   - Le Build Command est: `npm install`
   - Le Start Command est: `npm start`
   - La version de Node.js est au moins 14.0.0

2. Dans l'onglet "Deploy", cliquez sur "Manual Deploy" puis "Deploy latest commit"

### 3. Vérifier le déploiement

1. Attendez que le déploiement soit terminé (cela peut prendre quelques minutes)
2. Vérifiez les logs pour vous assurer qu'il n'y a pas d'erreurs
3. Testez l'API en accédant à https://manga-tracker-api.onrender.com

## Problèmes résolus

Les problèmes suivants ont été corrigés dans cette version:

1. Ajout de la dépendance "body-parser" manquante dans package.json
2. Mise à jour de la chaîne de connexion MongoDB pour utiliser des variables d'environnement
3. Correction des chemins relatifs dans server.js pour garantir le bon fonctionnement sur Render

## Remarques importantes

- Le service gratuit de Render s'arrête après 15 minutes d'inactivité
- Le premier accès après une période d'inactivité peut prendre jusqu'à 30 secondes
- Assurez-vous que votre cluster MongoDB autorise les connexions depuis les adresses IP de Render
