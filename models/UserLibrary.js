const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLibrarySchema = new Schema({
  user: {
    type: String,
    required: true
  },
  manga: {
    type: Schema.Types.ObjectId,
    ref: 'Manga',
    required: true
  },
  reading_status: {
    type: String,
    enum: ['reading', 'completed', 'on_hold', 'dropped', 'plan_to_read'],
    default: 'reading'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  }
});

// Créer un index composé pour éviter les doublons
UserLibrarySchema.index({ user: 1, manga: 1 }, { unique: true });

module.exports = mongoose.model('UserLibrary', UserLibrarySchema);
