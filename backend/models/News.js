const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  fullContent: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
