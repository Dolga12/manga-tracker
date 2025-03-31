// Routes pour la gestion de la progression de lecture
const express = require('express');
const router = express.Router();
const ReadingProgress = require('../models/ReadingProgress');
const UserLibrary = require('../models/UserLibrary');
const Chapter = require('../models/Chapter');
const auth = require('../middleware/auth');

// @route   GET api/progress/manga/:mangaId
// @desc    Obtenir la progression de lecture pour un manga spécifique
// @access  Private
router.get('/manga/:mangaId', auth, async (req, res) => {
  try {
    // Vérifier si le manga est dans la bibliothèque de l'utilisateur
    const libraryEntry = await UserLibrary.findOne({
      user: req.user.id,
      manga: req.params.mangaId
    });
    
    if (!libraryEntry) {
      return res.status(404).json({ msg: 'Ce manga n\'est pas dans votre bibliothèque' });
    }
    
    // Récupérer la progression de lecture
    const progress = await ReadingProgress.find({
      user: req.user.id,
      manga: req.params.mangaId
    }).populate('chapter', 'number title date_published');
    
    res.json(progress);
  } catch (err) {
    console.error('Erreur lors de la récupération de la progression:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   POST api/progress
// @desc    Marquer un chapitre comme lu
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { mangaId, chapterId, platformId, readDate } = req.body;
    
    // Vérifier si le manga est dans la bibliothèque de l'utilisateur
    const libraryEntry = await UserLibrary.findOne({
      user: req.user.id,
      manga: mangaId
    });
    
    if (!libraryEntry) {
      return res.status(404).json({ msg: 'Ce manga n\'est pas dans votre bibliothèque' });
    }
    
    // Vérifier si le chapitre existe
    let chapter = await Chapter.findById(chapterId);
    
    if (!chapter) {
      return res.status(404).json({ msg: 'Chapitre non trouvé' });
    }
    
    // Vérifier si la progression existe déjà
    let progress = await ReadingProgress.findOne({
      user: req.user.id,
      manga: mangaId,
      chapter: chapterId
    });
    
    if (progress) {
      // Mettre à jour la progression existante
      progress.platform = platformId;
      progress.read_date = readDate || Date.now();
      await progress.save();
    } else {
      // Créer une nouvelle progression
      progress = new ReadingProgress({
        user: req.user.id,
        manga: mangaId,
        chapter: chapterId,
        platform: platformId,
        read_date: readDate || Date.now()
      });
      
      await progress.save();
    }
    
    res.json(progress);
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement de la progression:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   DELETE api/progress/:id
// @desc    Supprimer une progression de lecture
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const progress = await ReadingProgress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({ msg: 'Progression non trouvée' });
    }
    
    // Vérifier si l'utilisateur est autorisé à supprimer cette progression
    if (progress.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }
    
    await progress.remove();
    
    res.json({ msg: 'Progression supprimée' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la progression:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
