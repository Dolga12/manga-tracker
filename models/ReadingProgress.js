const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadingProgressSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  manga: {
    type: Schema.Types.ObjectId,
    ref: 'Manga',
    required: true
  },
  chapter: {
    type: Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  platform: {
    type: Schema.Types.ObjectId,
    ref: 'ReadingPlatform'
  },
  read_date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  notes: {
    type: String
  }
});

// Créer un index composé pour éviter les doublons
ReadingProgressSchema.index({ user: 1, manga: 1, chapter: 1 }, { unique: true });

module.exports = mongoose.model('ReadingProgress', ReadingProgressSchema);
