const mongoose = require('mongoose');
const News = require('./models/News');
require('dotenv').config(); // .env dosyasını yükle

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB bağlantısı başarılı');
  addNews();
}).catch((err) => {
  console.error('MongoDB bağlantı hatası:', err);
});

const newsData = [
  {
    title: 'SÖZCÜ',
    content: 'Bugün ne oldu haberi 1',
    date: '1 SAAT',
    fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli...',
    image: '/images/Haber.jpeg',
  },
  {
    title: 'GAZETE OKSİJEN',
    content: 'Bugün ne oldu haberi 2',
    date: '1 SAAT',
    fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli...',
    image: '/images/Haber.jpeg',
  },
  {
    title: 'EKONOMİM.COM',
    content: 'Bugün ne oldu haberi 3',
    date: '6 SAAT',
    fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli...',
    image: '/images/Haber.jpeg',
  },
  {
    title: 'EKONOMİST',
    content: 'Çinli otomobil markası JAECOO, Türkiye otomobil pazarına geliyor',
    date: '8 SAAT',
    fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli...',
    image: '/images/Haber.jpeg',
  },
  {
    title: 'DÜNYA',
    content: 'LGS soruları ve cevap anahtarları yayımlandı',
    date: '4 SAAT',
    fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli...',
    image: '/images/Haber.jpeg',
  },
  {
    title: 'EKONOMİM.COM',
    content: 'Yeni ticaret anlaşmaları ile ilgili önemli gelişmeler',
    date: '3 SAAT',
    fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli...',
    image: '/images/Haber.jpeg',
  },
];

const addNews = async () => {
  try {
    await News.deleteMany(); // Eski verileri temizleyelim
    await News.insertMany(newsData); // Yeni verileri ekleyelim
    console.log('Database populated with initial news data!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};
