// Routes pour la gestion de la bibliothèque utilisateur
const express = require('express');
const router = express.Router();
const UserLibrary = require('../models/UserLibrary');
const Manga = require('../models/Manga');
const auth = require('../middleware/auth');

// @route   GET api/library
// @desc    Obtenir la bibliothèque de l'utilisateur
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userLibrary = await UserLibrary.find({ user: req.user.id })
      .populate('manga', 'title cover_image status')
      .sort({ dateAdded: -1 });
    
    res.json(userLibrary);
  } catch (err) {
    console.error('Erreur lors de la récupération de la bibliothèque:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   POST api/library
// @desc    Ajouter un manga à la bibliothèque
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { mangaId, mangaTitle, coverImage, status } = req.query;
    
    // Vérifier si le manga existe déjà dans la base de données
    let manga = await Manga.findOne({ mangadex_id: mangaId });
    
    // Si le manga n'existe pas, le créer
    if (!manga) {
      manga = new Manga({
        mangadex_id: mangaId,
        title: mangaTitle,
        cover_image: coverImage,
        status: status || 'ongoing'
      });
      
      await manga.save();
    }
    
    // Vérifier si le manga est déjà dans la bibliothèque de l'utilisateur
    const existingEntry = await UserLibrary.findOne({ 
      user: req.user.id,
      manga: manga._id
    });
    
    if (existingEntry) {
      return res.status(400).json({ msg: 'Ce manga est déjà dans votre bibliothèque' });
    }
    
    // Créer une nouvelle entrée dans la bibliothèque
    const newLibraryEntry = new UserLibrary({
      user: req.user.id,
      manga: manga._id,
      reading_status: 'reading'
    });
    
    await newLibraryEntry.save();
    
    res.json(newLibraryEntry);
  } catch (err) {
    console.error('Erreur lors de l\'ajout à la bibliothèque:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   DELETE api/library/:id
// @desc    Supprimer un manga de la bibliothèque
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const libraryEntry = await UserLibrary.findById(req.params.id);
    
    if (!libraryEntry) {
      return res.status(404).json({ msg: 'Entrée non trouvée dans la bibliothèque' });
    }
    
    // Vérifier si l'utilisateur est autorisé à supprimer cette entrée
    if (libraryEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }
    
    await libraryEntry.remove();
    
    res.json({ msg: 'Manga retiré de la bibliothèque' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la bibliothèque:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   PUT api/library/:id
// @desc    Mettre à jour le statut de lecture d'un manga
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { reading_status } = req.body;
    
    // Vérifier si le statut est valide
    if (!['reading', 'completed', 'on_hold', 'dropped', 'plan_to_read'].includes(reading_status)) {
      return res.status(400).json({ msg: 'Statut de lecture invalide' });
    }
    
    const libraryEntry = await UserLibrary.findById(req.params.id);
    
    if (!libraryEntry) {
      return res.status(404).json({ msg: 'Entrée non trouvée dans la bibliothèque' });
    }
    
    // Vérifier si l'utilisateur est autorisé à mettre à jour cette entrée
    if (libraryEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }
    
    libraryEntry.reading_status = reading_status;
    await libraryEntry.save();
    
    res.json(libraryEntry);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du statut:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
