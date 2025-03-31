const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
  mangadex_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  cover_image: {
    type: String
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'hiatus', 'cancelled'],
    default: 'ongoing'
  },
  description: {
    type: String
  },
  authors: [{
    type: String
  }],
  artists: [{
    type: String
  }],
  genres: [{
    type: String
  }],
  date_added: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Manga', MangaSchema);
