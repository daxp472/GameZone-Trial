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
  photos: {
    thumbnail: String,
    banner: String,
    screenshots: [String]
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  developer: String,
  technology: String,
  platforms: [String],
  classification: String,
  releaseDate: Date,
  lastUpdated: Date,
  size: String,
  downloadCount: {
    type: Number,
    default: 0
  },
  playCount: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert']
  },
  estimatedPlayTime: String,
  howToPlay: [String],
  gameplayTips: [String],
  moreGamesLikeThis: [String],
  features: [String],
  controls: {
    type: Map,
    of: String
  },
  achievements: [{
    name: String,
    description: String,
    points: Number,
    icon: String
  }],
  faq: [{
    question: String,
    answer: String
  }],
  socialFeatures: {
    multiplayer: Boolean,
    leaderboards: Boolean,
    chat: Boolean,
    friendSystem: Boolean
  },
  systemRequirements: {
    minimum: {
      browser: String,
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      network: String
    },
    recommended: {
      browser: String,
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      network: String
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
gameSchema.index({ name: 'text', description: 'text' });

// Virtual for average rating formatted to 1 decimal place
gameSchema.virtual('formattedRating').get(function() {
  return this.rating.average.toFixed(1);
});

// Method to increment download count
gameSchema.methods.incrementDownloads = function() {
  this.downloadCount += 1;
  return this.save();
};

// Method to increment play count
gameSchema.methods.incrementPlayCount = function() {
  this.playCount += 1;
  return this.save();
};

// Static method to find similar games
gameSchema.statics.findSimilarGames = function(gameId, limit = 5) {
  return this.model('Game').find({
    gameId: { $ne: gameId },
    category: this.category
  }).limit(limit);
};

module.exports = mongoose.model('Game', gameSchema);