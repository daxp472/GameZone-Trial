const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all racing games with option for preview or full details
router.get('/', async (req, res) => {
  try {
    const preview = req.query.preview === 'true';
    let projection = preview ? { name: 1, photo: 1, rating: 1 } : {};
    
    const games = await Game.find({ category: 'Racing' }, projection);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific racing game
router.get('/:gameId', async (req, res) => {
  try {
    const preview = req.query.preview === 'true';
    let projection = preview ? { name: 1, photo: 1, rating: 1 } : {};
    
    const game = await Game.findOne({ gameId: req.params.gameId, category: 'Racing' }, projection);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;