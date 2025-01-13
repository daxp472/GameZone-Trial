const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  gamesPlayed: {
    type: Number,
    default: 1
  },
  totalScore: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Compound index for efficient querying
leaderboardSchema.index({ gameId: 1, score: -1 });
leaderboardSchema.index({ userId: 1, gameId: 1 }, { unique: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);