// Routes pour les API externes (MangaDex)
const express = require('express');
const router = express.Router();
const mangadexApi = require('../services/mangadexApi');

// @route   GET api/external/search
// @desc    Rechercher des mangas via MangaDex
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { query, limit = 10, offset = 0 } = req.query;
    
    if (!query) {
      return res.status(400).json({ msg: 'Le paramètre de recherche est requis' });
    }
    
    const results = await mangadexApi.searchManga(query, limit, offset);
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de la recherche externe:', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   GET api/external/manga/:id
// @desc    Obtenir les détails d'un manga via MangaDex
// @access  Public
router.get('/manga/:id', async (req, res) => {
  try {
    const mangaId = req.params.id;
    const manga = await mangadexApi.getMangaById(mangaId);
    res.json(manga);
  } catch (err) {
    console.error(`Erreur lors de la récupération du manga ${req.params.id}:`, err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   GET api/external/manga/:id/chapters
// @desc    Obtenir les chapitres d'un manga via MangaDex
// @access  Public
router.get('/manga/:id/chapters', async (req, res) => {
  try {
    const mangaId = req.params.id;
    const { limit = 100, offset = 0, lang = 'fr' } = req.query;
    
    const chapters = await mangadexApi.getMangaChapters(mangaId, limit, offset, [lang]);
    res.json(chapters);
  } catch (err) {
    console.error(`Erreur lors de la récupération des chapitres pour ${req.params.id}:`, err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
