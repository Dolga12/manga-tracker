// Vérification de la connexion à MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = 'mongodb+srv://test:u%m5%Th6w%rFjruTFKfHp@cluster.mongodb.net/manga_tracker?retryWrites=true&w=majority';

// Utilisation d'une base de données en mémoire pour le développement et les tests
const useInMemoryDB = () => {
  console.log('Utilisation d\'une base de données en mémoire pour le développement');
  const { MongoMemoryServer } = require('mongodb-memory-server');
  
  const mongoServer = new MongoMemoryServer();
  
  mongoServer.start().then(() => {
    const uri = mongoServer.getUri();
    mongoose.connect(uri)
      .then(() => console.log('Connexion à la base de données en mémoire établie'))
      .catch(err => console.error('Erreur de connexion à la base de données en mémoire:', err));
  });
  
  return mongoServer;
};

// Connexion à MongoDB en production ou à la base de données en mémoire en développement
const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(MONGO_URI);
      console.log('Connexion à MongoDB établie');
    } else {
      return useInMemoryDB();
    }
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    // En cas d'erreur, utiliser une base de données en mémoire
    return useInMemoryDB();
  }
};

module.exports = { connectDB };
