// Middleware d'authentification
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Clé secrète pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'manga_tracker_secret_key';

module.exports = function(req, res, next) {
  // Récupérer le token du header
  const token = req.header('x-auth-token');
  
  // Vérifier si le token existe
  if (!token) {
    // Pour les besoins de développement, créer un utilisateur fictif si aucun token n'est fourni
    if (process.env.NODE_ENV !== 'production') {
      req.user = { id: 'dev_user_id' };
      return next();
    }
    return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });
  }
  
  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ajouter l'utilisateur à la requête
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalide' });
  }
};
