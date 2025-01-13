const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all adventure games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ category: 'Adventure' });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific adventure game
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findOne({ gameId: req.params.gameId, category: 'Adventure' });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;