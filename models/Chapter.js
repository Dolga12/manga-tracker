const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
  mangadex_id: {
    type: String,
    required: true,
    unique: true
  },
  manga: {
    type: Schema.Types.ObjectId,
    ref: 'Manga',
    required: true
  },
  number: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  volume: {
    type: String
  },
  language: {
    type: String,
    default: 'fr'
  },
  pages: {
    type: Number,
    default: 0
  },
  date_published: {
    type: Date,
    default: Date.now
  }
});

// Créer un index composé pour faciliter la recherche
ChapterSchema.index({ manga: 1, number: 1, language: 1 });

module.exports = mongoose.model('Chapter', ChapterSchema);
