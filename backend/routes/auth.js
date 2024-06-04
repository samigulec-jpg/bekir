const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'Kullanıcı zaten mevcut' });
    }

    const user = await User.create({ username, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

router.put('/update', async (req, res) => {
  const { userId, username, newPassword } = req.body;

  console.log(`Update request received for userId: ${userId}, username: ${username}, newPassword: ${newPassword}`);

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    if (username) {
      user.username = username;
    }

    if (newPassword) {
      user.password = newPassword; // Mongoose middleware password hash işlemini otomatik olarak yapacaktır
    }

    await user.save();

    res.json({ message: 'Kullanıcı bilgileri güncellendi' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Sunucu hatası: ' + error.message });
  }
});

router.delete('/delete', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json({ message: 'Kullanıcı başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası: ' + error.message });
  }
});

// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Lütfen kimlik doğrulaması yapın.' });
  }
};

module.exports = { router, auth };
