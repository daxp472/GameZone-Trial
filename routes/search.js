const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Global search across all categories
router.get('/global', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const games = await Game.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Category-specific search
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const games = await Game.find({
      category,
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;