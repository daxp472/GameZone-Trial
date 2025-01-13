const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Racing', 'Action', 'Puzzle', 'Sports', 'Strategy', 'Adventure']
  },
  description: String,
  rating: {
    average: Number,
    count: Number
  },
  developer: String,
  technology: String,
  platforms: [String],
  classification: String,
  howToPlay: [String],
  gameplayTips: [String],
  moreGamesLikeThis: [String],
  features: [String],
  controls: {
    type: Map,
    of: String
  },
  faq: [{
    question: String,
    answer: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);