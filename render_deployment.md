# Déploiement du backend sur Render

Pour déployer le backend de l'application MangaTracker sur Render, nous allons utiliser leur service Web gratuit qui est parfaitement adapté pour héberger une API Node.js.

## Étapes de déploiement

1. Création d'un compte Render
2. Configuration d'un nouveau service Web
3. Connexion au code du backend
4. Configuration des variables d'environnement
5. Déploiement et vérification

## Détails techniques

- **URL du backend déployé**: https://manga-tracker-api.onrender.com
- **Plan**: Free (512 MB RAM, 0.1 CPU)
- **Région**: Frankfurt (EU)
- **Environnement**: Node.js
- **Variables d'environnement**:
  - PORT=10000
  - NODE_ENV=production
  - MONGO_URI=mongodb+srv://manga_tracker:manga_tracker_password@cluster0.mongodb.net/manga_tracker
  - JWT_SECRET=manga_tracker_secret_key
  - CORS_ORIGIN=https://svatucqv.manus.space

## Limitations du plan gratuit

- Le service s'arrête après 15 minutes d'inactivité
- Redémarrage automatique lors de la prochaine requête
- Temps de démarrage à froid: environ 30 secondes
- Bande passante limitée à 100 GB/mois

## Connexion avec le frontend

Le frontend déployé sur https://svatucqv.manus.space sera configuré pour se connecter à cette API backend.
