const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Tüm haberleri getiren endpoint
router.get('/all', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Haberler alınırken bir hata oluştu' });
  }
});

// Tek bir haberi ID ile getiren endpoint
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'Haber bulunamadı' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Haber alınırken bir hata oluştu' });
  }
});

module.exports = router;
