const express = require('express');
const Favorite = require('../models/Favorite');
const { auth } = require('./auth');

const router = express.Router();

// Favori haberi ekle
router.post('/', auth, async (req, res) => {
  const { newsId } = req.body;
  const userId = req.user._id;

  try {
    const existingFavorite = await Favorite.findOne({ userId, newsId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Haber zaten favorilerde.' });
    }

    const favorite = new Favorite({ userId, newsId });
    await favorite.save();

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Favori eklenemedi:', error);
    res.status(500).json({ message: 'Favori eklenemedi' });
  }
});

// Favori haberi kaldır
router.post('/remove', auth, async (req, res) => {
  const { newsId } = req.body;
  const userId = req.user._id;

  try {
    const favorite = await Favorite.findOneAndDelete({ userId, newsId });

    if (!favorite) {
      return res.status(404).json({ message: 'Haber favorilerde değil.' });
    }

    res.json({ message: 'Favori başarıyla kaldırıldı' });
  } catch (error) {
    console.error('Favori kaldırılamadı:', error);
    res.status(500).json({ message: 'Favori kaldırılamadı' });
  }
});



// Kullanıcının favori haberlerini getir
router.get('/', auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await Favorite.find({ userId }).populate('newsId');
    res.json(favorites);
  } catch (error) {
    console.error('Favoriler alınamadı:', error);
    res.status(500).json({ message: 'Favoriler alınamadı' });
  }
});

module.exports = router;
