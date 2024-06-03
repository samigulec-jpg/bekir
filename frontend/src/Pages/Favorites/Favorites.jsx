import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // null değerlerini filtreleyerek sadece geçerli haberleri içeren bir liste oluştur
        const validFavorites = response.data.filter(fav => fav.newsId !== null);
        setFavoriteNews(validFavorites);
      } catch (error) {
        console.error('Favori haberler yüklenemedi:', error);
        setError('Favori haberler yüklenemedi. Lütfen tekrar deneyin.');
      }
    };

    fetchFavorites();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!favoriteNews || favoriteNews.length === 0) {
    return <p>Henüz favori haberiniz yok.</p>;
  }

  return (
    <div className="favorites">
      <h2>Favori Haberler</h2>
      <div className="news-grid">
        {favoriteNews.map((fav, index) => (
          <Link key={fav.newsId._id || index} to={`/news/${fav.newsId._id}`}>
            <div className="news-card">
              <img src={fav.newsId.image} alt="Haber Görseli" />
              <div className="news-content">
                <h2>{fav.newsId.title}</h2>
                <p>{fav.newsId.content}</p>
                <p className="news-date">{fav.newsId.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
