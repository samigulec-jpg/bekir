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
        // Null değerlerini filtreleyerek sadece geçerli haberleri içeren bir liste oluştur
        const validFavorites = response.data.filter(fav => fav.newsId !== null);
        setFavoriteNews(validFavorites.map(fav => fav.newsId)); // newsId alanını al
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
        {favoriteNews.map((newsItem) => (
          <div key={newsItem._id} className="news-card">
            <Link to={`/news/${newsItem._id}`}>
              <img src={`http://localhost:5000/${newsItem.image}`} alt={newsItem.title} className="news-image" />
              <h2>{newsItem.title}</h2>
              <p>{newsItem.content}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
