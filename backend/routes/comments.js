const express = require('express');
const Comment = require('../models/Comment');
const { auth } = require('./auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { text, postId } = req.body;

  if (!text || !postId) {
    return res.status(400).json({ message: 'Yorum metni ve postId gereklidir' });
  }

  const comment = new Comment({
    text,
    userId: req.user._id,
    postId
  });

  try {
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Yorum kaydedilemedi:', error);
    res.status(500).json({ message: 'Yorum kaydedilemedi' });
  }
});

router.patch('/:commentId', auth, async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Yorum bulunamadı' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Yorumu düzenleme yetkiniz yok' });
    }

    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:commentId', auth, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      console.error(`Yorum bulunamadı: ${commentId}`);
      return res.status(404).json({ message: 'Yorum bulunamadı' });
    }

    if (comment.userId.toString() !== userId.toString()) {
      console.error(`Yetki hatası: ${userId} kullanıcı ${comment.userId} id'li yorumu silmeye çalışıyor`);
      return res.status(403).json({ message: 'Yorumu silme yetkiniz yok' });
    }

    await Comment.findByIdAndDelete(commentId);

    const checkComment = await Comment.findById(commentId);
    if (checkComment) {
      console.error('Yorum silinemedi');
      return res.status(500).json({ message: 'Yorum silinemedi. Lütfen tekrar deneyin.' });
    }

    res.json({ message: 'Yorum başarıyla silindi' });
  } catch (error) {
    console.error('Yorum silme hatası:', error);
    res.status(500).json({ message: 'Yorum silinemedi. Lütfen tekrar deneyin.' });
  }
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate('userId', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Yorumlar alınamadı' });
  }
});

module.exports = router;
