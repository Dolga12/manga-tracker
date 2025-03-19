// Fichier de configuration pour le déploiement sur Render
// Placez ce fichier à la racine de votre projet backend

// Configuration pour le déploiement sur Render
const RENDER_EXTERNAL_URL = 'https://manga-tracker-api.onrender.com';
const FRONTEND_URL = 'https://svatucqv.manus.space';

// Configuration pour le développement local
const LOCAL_API_URL = 'http://localhost:5000';

// Exportation des configurations
module.exports = {
  // URL de l'API en fonction de l'environnement
  API_URL: process.env.NODE_ENV === 'production' ? RENDER_EXTERNAL_URL : LOCAL_API_URL,
  
  // URL du frontend pour la configuration CORS
  FRONTEND_URL: FRONTEND_URL,
  
  // Configuration spécifique à Render
  RENDER: {
    // Port utilisé par Render (défini dans les variables d'environnement)
    PORT: process.env.PORT || 10000,
    
    // Autres configurations spécifiques à Render
    NODE_VERSION: '14.x',
    BUILD_COMMAND: 'npm install',
    START_COMMAND: 'npm start'
  }
};
