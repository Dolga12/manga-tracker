// Service pour interagir avec l'API MangaDex
const axios = require('axios');

// URL de base de l'API MangaDex
const BASE_URL = 'https://api.mangadex.org';

// Rechercher des mangas
const searchManga = async (query, limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga`, {
      params: {
        title: query,
        limit,
        offset,
        includes: ['cover_art']
      }
    });
    
    // Transformer les données pour les adapter à notre format
    const mangas = response.data.data.map(manga => {
      const attributes = manga.attributes;
      const coverFile = manga.relationships.find(rel => rel.type === 'cover_art')?.attributes?.fileName;
      
      return {
        id: manga.id,
        title: attributes.title.en || attributes.title.ja || Object.values(attributes.title)[0],
        description: attributes.description.en || attributes.description.fr || Object.values(attributes.description)[0] || '',
        status: attributes.status,
        cover_image: coverFile ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFile}` : null,
        tags: attributes.tags.map(tag => tag.attributes.name.en || tag.attributes.name.fr || Object.values(tag.attributes.name)[0])
      };
    });
    
    return {
      mangas,
      total: response.data.total,
      offset: response.data.offset,
      limit: response.data.limit
    };
  } catch (error) {
    console.error('Erreur lors de la recherche MangaDex:', error);
    throw new Error('Erreur lors de la recherche de mangas');
  }
};

// Obtenir les détails d'un manga par son ID
const getMangaById = async (mangaId) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${mangaId}`, {
      params: {
        includes: ['cover_art', 'author', 'artist']
      }
    });
    
    const manga = response.data.data;
    const attributes = manga.attributes;
    const coverFile = manga.relationships.find(rel => rel.type === 'cover_art')?.attributes?.fileName;
    const authors = manga.relationships.filter(rel => rel.type === 'author').map(author => author.attributes?.name);
    const artists = manga.relationships.filter(rel => rel.type === 'artist').map(artist => artist.attributes?.name);
    
    return {
      id: manga.id,
      title: attributes.title.en || attributes.title.ja || Object.values(attributes.title)[0],
      description: attributes.description.en || attributes.description.fr || Object.values(attributes.description)[0] || '',
      status: attributes.status,
      cover_image: coverFile ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFile}` : null,
      tags: attributes.tags.map(tag => tag.attributes.name.en || tag.attributes.name.fr || Object.values(tag.attributes.name)[0]),
      authors,
      artists,
      year: attributes.year,
      publication: {
        demographic: attributes.publicationDemographic,
        status: attributes.status,
        contentRating: attributes.contentRating
      }
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération du manga ${mangaId}:`, error);
    throw new Error('Erreur lors de la récupération des détails du manga');
  }
};

// Obtenir les chapitres d'un manga
const getMangaChapters = async (mangaId, limit = 100, offset = 0, languages = ['en']) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga/${mangaId}/feed`, {
      params: {
        limit,
        offset,
        translatedLanguage: languages,
        order: {
          chapter: 'desc'
        }
      }
    });
    
    const chapters = response.data.data.map(chapter => {
      const attributes = chapter.attributes;
      
      return {
        id: chapter.id,
        title: attributes.title || `Chapitre ${attributes.chapter}`,
        chapter: attributes.chapter,
        volume: attributes.volume,
        language: attributes.translatedLanguage,
        pages: attributes.pages,
        published_at: attributes.publishAt
      };
    });
    
    return {
      chapters,
      total: response.data.total,
      offset: response.data.offset,
      limit: response.data.limit
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération des chapitres pour ${mangaId}:`, error);
    throw new Error('Erreur lors de la récupération des chapitres');
  }
};

module.exports = {
  searchManga,
  getMangaById,
  getMangaChapters
};
