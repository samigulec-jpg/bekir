import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import haberImage from '../../Components/Assets/Haber.jpeg'; // doğru dosya yolu

const Home = ({ setSearchData }) => {
  const todayNews = useMemo(() => [
    { 
      _id: 1, 
      title: 'SÖZCÜ', 
      content: 'Bugün ne oldu haberi 1', 
      date: '1 SAAT',
      fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli sürüş sırasında Off-Road modunda kumlu veya kayalık yol koşullarıyla karşılaştığında, ARDIS- Akıllı Tüm Zeminlerde Sürüş Sistemi ile kum, çamur ve kar modları arasında akıllıca geçiş yapabiliyor. Aracın patinaj önleme sistemi ise hassas tork dağılımı sağlayarak kaymayı önlemek için tekerlek torkunu uygun bir aralıkta tutuyor.',
      image: haberImage
    },
    { 
      _id: 2, 
      title: 'GAZETE OKSİJEN', 
      content: 'Bugün ne oldu haberi 2', 
      date: '1 SAAT',
      fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli sürüş sırasında Off-Road modunda kumlu veya kayalık yol koşullarıyla karşılaştığında, ARDIS- Akıllı Tüm Zeminlerde Sürüş Sistemi ile kum, çamur ve kar modları arasında akıllıca geçiş yapabiliyor. Aracın patinaj önleme sistemi ise hassas tork dağılımı sağlayarak kaymayı önlemek için tekerlek torkunu uygun bir aralıkta tutuyor.',
      image: haberImage
    },
    { 
      _id: 3, 
      title: 'EKONOMİM.COM', 
      content: 'Bugün ne oldu haberi 3', 
      date: '6 SAAT',
      fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli sürüş sırasında Off-Road modunda kumlu veya kayalık yol koşullarıyla karşılaştığında, ARDIS- Akıllı Tüm Zeminlerde Sürüş Sistemi ile kum, çamur ve kar modları arasında akıllıca geçiş yapabiliyor. Aracın patinaj önleme sistemi ise hassas tork dağılımı sağlayarak kaymayı önlemek için tekerlek torkunu uygun bir aralıkta tutuyor.',
      image: haberImage
    },
  ], []);

  const normalNews = useMemo(() => [
    { 
      _id: 4, 
      title: 'EKONOMİST', 
      content: 'Çinli otomobil markası JAECOO, Türkiye otomobil pazarına geliyor', 
      date: '8 SAAT',
      fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli sürüş sırasında Off-Road modunda kumlu veya kayalık yol koşullarıyla karşılaştığında, ARDIS- Akıllı Tüm Zeminlerde Sürüş Sistemi ile kum, çamur ve kar modları arasında akıllıca geçiş yapabiliyor. Aracın patinaj önleme sistemi ise hassas tork dağılımı sağlayarak kaymayı önlemek için tekerlek torkunu uygun bir aralıkta tutuyor.',
      image: haberImage
    },
    { 
      _id: 5, 
      title: 'DÜNYA', 
      content: 'LGS soruları ve cevap anahtarları yayımlandı', 
      date: '4 SAAT',
      fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli sürüş sırasında Off-Road modunda kumlu veya kayalık yol koşullarıyla karşılaştığında, ARDIS- Akıllı Tüm Zeminlerde Sürüş Sistemi ile kum, çamur ve kar modları arasında akıllıca geçiş yapabiliyor. Aracın patinaj önleme sistemi ise hassas tork dağılımı sağlayarak kaymayı önlemek için tekerlek torkunu uygun bir aralıkta tutuyor.',
      image: haberImage
    },
    { 
      _id: 6, 
      title: 'EKONOMİM.COM', 
      content: 'Yeni ticaret anlaşmaları ile ilgili önemli gelişmeler', 
      date: '3 SAAT',
      fullContent: 'Markanın bilgilendirmesine göre JAECOO 7 modeli sürüş sırasında Off-Road modunda kumlu veya kayalık yol koşullarıyla karşılaştığında, ARDIS- Akıllı Tüm Zeminlerde Sürüş Sistemi ile kum, çamur ve kar modları arasında akıllıca geçiş yapabiliyor. Aracın patinaj önleme sistemi ise hassas tork dağılımı sağlayarak kaymayı önlemek için tekerlek torkunu uygun bir aralıkta tutuyor.',
      image: haberImage
    }
  ], []);

  const allNews = useMemo(() => [...todayNews, ...normalNews], [todayNews, normalNews]);

  useEffect(() => {
    setSearchData(allNews); // Haber verilerini setSearchData ile geçiyoruz
  }, [setSearchData, allNews]);

  return (
    <div className="home">
      <section className="today-news-section">
        <h1>Bugün Ne Oldu?</h1>
        <div className="news-grid">
          {todayNews.map((item) => (
            <Link key={item._id} to={`/news/${item._id}`}>
              <div className="news-card">
                <img src={item.image} alt="Haber Görseli" className="news-image" />
                <div className="news-content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <p className="news-date">{item.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="normal-news-section">
        <h2>Haberler</h2>
        <div className="news-grid">
          {normalNews.map((item) => (
            <Link key={item._id} to={`/news/${item._id}`}>
              <div className="news-card">
                <img src={item.image} alt="Haber Görseli" className="news-image" />
                <div className="news-content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <p className="news-date">{item.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
