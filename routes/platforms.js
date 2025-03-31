// Routes pour la gestion des plateformes de lecture
const express = require('express');
const router = express.Router();
const ReadingPlatform = require('../models/ReadingPlatform');
const auth = require('../middleware/auth');

// @route   GET api/platforms
// @desc    Obtenir toutes les plateformes de lecture
// @access  Public
router.get('/', async (req, res) => {
  try {
    const platforms = await ReadingPlatform.find().sort({ name: 1 });
    res.json(platforms);
  } catch (err) {
    console.error('Erreur lors de la récupération des plateformes:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   POST api/platforms
// @desc    Ajouter une nouvelle plateforme de lecture
// @access  Private (admin only in a real app)
router.post('/', auth, async (req, res) => {
  try {
    const { name, url, icon } = req.body;
    
    // Vérifier si la plateforme existe déjà
    const existingPlatform = await ReadingPlatform.findOne({ name });
    
    if (existingPlatform) {
      return res.status(400).json({ msg: 'Cette plateforme existe déjà' });
    }
    
    const newPlatform = new ReadingPlatform({
      name,
      url,
      icon
    });
    
    await newPlatform.save();
    
    res.json(newPlatform);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la plateforme:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   PUT api/platforms/:id
// @desc    Mettre à jour une plateforme de lecture
// @access  Private (admin only in a real app)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, url, icon } = req.body;
    
    const platform = await ReadingPlatform.findById(req.params.id);
    
    if (!platform) {
      return res.status(404).json({ msg: 'Plateforme non trouvée' });
    }
    
    // Mettre à jour les champs
    if (name) platform.name = name;
    if (url) platform.url = url;
    if (icon) platform.icon = icon;
    
    await platform.save();
    
    res.json(platform);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la plateforme:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   DELETE api/platforms/:id
// @desc    Supprimer une plateforme de lecture
// @access  Private (admin only in a real app)
router.delete('/:id', auth, async (req, res) => {
  try {
    const platform = await ReadingPlatform.findById(req.params.id);
    
    if (!platform) {
      return res.status(404).json({ msg: 'Plateforme non trouvée' });
    }
    
    await platform.remove();
    
    res.json({ msg: 'Plateforme supprimée' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la plateforme:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
