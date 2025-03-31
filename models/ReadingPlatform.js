const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadingPlatformSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  is_official: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'fr'
  },
  date_added: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ReadingPlatform', ReadingPlatformSchema);
