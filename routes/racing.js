const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all racing games with option for preview or full details
router.get('/', async (req, res) => {
  try {
    const preview = req.query.preview === 'true';
    let projection = preview ? { 
      name: 1, 
      'photos.thumbnail': 1, 
      rating: 1,
      difficulty: 1,
      platforms: 1,
      downloadCount: 1
    } : {};
    
    const games = await Game.find({ category: 'Racing' }, projection)
      .sort({ downloadCount: -1, 'rating.average': -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific racing game
router.get('/:gameId', async (req, res) => {
  try {
    const preview = req.query.preview === 'true';
    let projection = preview ? { 
      name: 1, 
      'photos.thumbnail': 1, 
      rating: 1,
      difficulty: 1,
      platforms: 1,
      downloadCount: 1
    } : {};
    
    const game = await Game.findOne({ 
      gameId: req.params.gameId, 
      category: 'Racing' 
    }, projection);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (!preview) {
      // If full details requested, get similar games
      const similarGames = await Game.find({
        category: 'Racing',
        gameId: { $ne: game.gameId }
      })
      .select('name photos.thumbnail rating')
      .limit(3);

      res.json({
        game,
        similarGames
      });
    } else {
      res.json(game);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Track game download
router.post('/:gameId/download', async (req, res) => {
  try {
    const game = await Game.findOne({ gameId: req.params.gameId });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    await game.incrementDownloads();
    res.json({ message: 'Download count updated', downloadCount: game.downloadCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;