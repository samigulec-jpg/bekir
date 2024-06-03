import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites">
      <h1>Favori Haberler</h1>
      <div className="news-grid">
        {favorites.length > 0 ? (
          favorites.map((newsItem) => (
            <div key={newsItem._id} className="news-card">
              <Link to={`/news/${newsItem._id}`}>
                <img src={newsItem.image} alt={newsItem.title} className="news-image" />
                <h2>{newsItem.title}</h2>
                <p>{newsItem.content}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Henüz favori haber eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
