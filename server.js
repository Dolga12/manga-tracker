const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db');

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définir les routes API
// Commenté car ces routes ne sont pas encore implémentées
// app.use('/api/users', require('./routes/users'));
// app.use('/api/mangas', require('./routes/mangas'));
app.use('/api/library', require('./routes/library'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/platforms', require('./routes/platforms'));
app.use('/api/external', require('./routes/external'));

// Connexion à MongoDB
connectDB();

// Servir les fichiers statiques du frontend en production
if (NODE_ENV === 'production') {
  // Le dossier où se trouvent les fichiers statiques
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));
  
  // Pour toutes les requêtes qui ne sont pas des API, renvoyer l'index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
    }
  });
} else {
  // Route de base en développement
  app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API de MangaTrack' });
  });
}

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Erreur serveur', 
    error: NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT} en mode ${NODE_ENV}`);
});

module.exports = app;
