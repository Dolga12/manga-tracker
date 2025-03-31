// Server.js - Version API uniquement (sans frontend)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Définir le port
const PORT = process.env.PORT || 5000;

// Routes API
app.use('/api/library', require('./routes/library'));
app.use('/api/platforms', require('./routes/platforms'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/external', require('./routes/external'));

// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Manga Tracker en ligne',
    status: 'ok',
    endpoints: [
      '/api/library',
      '/api/platforms',
      '/api/progress',
      '/api/external'
    ]
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
});
