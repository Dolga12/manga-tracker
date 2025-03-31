// Configuration de la connexion à MongoDB simplifiée
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Chaîne de connexion MongoDB - utilisez une valeur directe pour éviter les problèmes de variables d'environnement
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/manga_tracker';

// Connexion à MongoDB simplifiée sans dépendance à mongodb-memory-server
const connectDB = async () => {
  try {
    // Suppression de l'avertissement de dépréciation
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(MONGO_URI);
    console.log('Connexion à MongoDB établie');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    // En cas d'erreur, on continue quand même pour permettre le déploiement
    console.log('Continuation sans base de données - application en mode limité');
  }
};

module.exports = { connectDB };
