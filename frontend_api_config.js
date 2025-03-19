// Configuration pour connecter le frontend au backend déployé
const API_URL = 'https://manga-tracker-api.onrender.com';

// Fonction pour effectuer des requêtes API
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la requête API:', error);
    throw error;
  }
};

// Exportation des fonctions API
export const api = {
  // Recherche de mangas
  searchMangas: (query) => apiRequest(`/external/search?query=${encodeURIComponent(query)}`),
  
  // Détails d'un manga
  getMangaDetails: (id) => apiRequest(`/external/manga/${id}`),
  
  // Chapitres d'un manga
  getMangaChapters: (id) => apiRequest(`/external/manga/${id}/chapters`),
  
  // Bibliothèque
  getLibrary: () => apiRequest('/library'),
  addToLibrary: (mangaId, status) => apiRequest('/library', 'POST', { manga_id: mangaId, status }),
  updateLibraryItem: (id, data) => apiRequest(`/library/${id}`, 'PUT', data),
  removeFromLibrary: (id) => apiRequest(`/library/${id}`, 'DELETE'),
  
  // Progression de lecture
  getProgress: (mangaId) => apiRequest(`/progress/${mangaId}`),
  markChapterAsRead: (mangaId, chapterNumber, platformId) => 
    apiRequest('/progress', 'POST', { manga_id: mangaId, chapter_number: chapterNumber, platform_id: platformId }),
  
  // Plateformes de lecture
  getPlatforms: () => apiRequest('/platforms'),
};

export default api;
