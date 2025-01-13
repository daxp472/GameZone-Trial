const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all action games with preview option
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
    
    const games = await Game.find({ category: 'Action' }, projection)
      .sort({ downloadCount: -1, 'rating.average': -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific action game
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
      category: 'Action' 
    }, projection);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (!preview) {
      const similarGames = await Game.find({
        category: 'Action',
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