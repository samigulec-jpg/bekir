const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const newsRoutes = require('./routes/news');
const commentRoutes = require('./routes/comments');
const favoriteRoutes = require('./routes/favorites'); // Favoriler rotasını ekleyin

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes); // Favoriler rotasını kullanın

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
