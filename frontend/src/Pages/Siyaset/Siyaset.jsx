import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HaberSayfasi.css';
import axios from 'axios';

const Siyaset = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/category/siyaset');
        setNews(response.data);
      } catch (err) {
        console.error('Haberler alınırken bir hata oluştu:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="category">
      <h1>Siyaset Haberleri</h1>
      <div className="news-grid">
        {news.map((item) => (
          <Link key={item._id} to={`/news/${item._id}`}>
            <div className="news-card">
              <img src={`http://localhost:5000/${item.image}`} alt="Haber Görseli" />
              <div className="news-content">
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <p className="news-date">{item.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Siyaset;
