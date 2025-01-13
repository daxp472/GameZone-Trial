const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

// Get overall leaderboard
router.get('/overall', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.aggregate([
      {
        $group: {
          _id: '$userId',
          username: { $first: '$username' },
          totalScore: { $sum: '$totalScore' },
          gamesPlayed: { $sum: '$gamesPlayed' }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 100 }
    ]);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get game-specific leaderboard
router.get('/game/:gameId', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ gameId: req.params.gameId })
      .sort({ score: -1 })
      .limit(100);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create player score
router.put('/update', async (req, res) => {
  try {
    const { userId, username, gameId, score } = req.body;
    
    const existingEntry = await Leaderboard.findOne({ userId, gameId });
    
    if (existingEntry) {
      // Update existing score if new score is higher
      if (score > existingEntry.score) {
        existingEntry.score = score;
      }
      existingEntry.gamesPlayed += 1;
      existingEntry.totalScore += score;
      await existingEntry.save();
      res.json(existingEntry);
    } else {
      // Create new entry
      const newEntry = new Leaderboard({
        userId,
        username,
        gameId,
        score,
        totalScore: score
      });
      await newEntry.save();
      res.status(201).json(newEntry);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;