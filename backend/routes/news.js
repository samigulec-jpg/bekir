const express = require('express');
const router = express.Router();
const News = require('../models/News');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Haber ekleme
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const news = new News({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      fullContent: req.body.fullContent,
      category: req.body.category,
      image: req.file.path.replace(/\\/g, '/')
    });
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(400).json({ message: 'Haber eklenirken bir hata oluştu', error: err.message });
  }
});

// Tüm haberleri listeleme
router.get('/all', async (req, res) => {
  try {
    const news = await News.find({});
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Haberler alınırken bir hata oluştu', error: err.message });
  }
});

// Belirli kategoriye göre haberleri listeleme
router.get('/category/:category', async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Haberler alınırken bir hata oluştu', error: err.message });
  }
});

// Tek haber getirme
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Haber bulunamadı' });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Haber alınırken bir hata oluştu', error: err.message });
  }
});

// Haber güncelleme
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      fullContent: req.body.fullContent,
      category: req.body.category
    };

    if (req.file) {
      updatedData.image = req.file.path.replace(/\\/g, '/');
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedNews) return res.status(404).json({ message: 'Haber bulunamadı' });
    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: 'Haber güncellenirken bir hata oluştu', error: err.message });
  }
});

// Haber silme
router.delete('/:id', async (req, res) => {
  console.log(`Silinecek haber ID'si: ${req.params.id}`);
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      console.log('Haber bulunamadı');
      return res.status(404).json({ message: 'Haber bulunamadı' });
    }
    console.log('Haber başarıyla silindi');
    res.status(200).json({ message: 'Haber silindi' });
  } catch (err) {
    console.error('Haber silinirken bir hata oluştu:', err);
    res.status(500).json({ message: 'Haber silinirken bir hata oluştu', error: err.message });
  }
});

module.exports = router;
