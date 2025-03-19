# Configuration de MongoDB Atlas

## Étapes de configuration
1. Création d'un compte MongoDB Atlas
2. Configuration d'un cluster gratuit
3. Configuration des utilisateurs et des accès réseau
4. Récupération de la chaîne de connexion
5. Mise à jour des variables d'environnement du backend

## Détails de la base de données
- Nom de la base de données: manga_tracker
- Collections principales:
  - mangas: stockage des informations sur les mangas
  - userlibraries: bibliothèque personnelle de l'utilisateur
  - readingprogresses: progression de lecture par chapitre
  - readingplatforms: plateformes de lecture disponibles

## Sécurité
- Authentification par nom d'utilisateur et mot de passe
- Accès réseau limité aux adresses IP nécessaires
- Chiffrement des données en transit et au repos
