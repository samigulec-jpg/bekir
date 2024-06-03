import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Home = ({ setSearchData }) => {
  const [todayNews, setTodayNews] = useState([]);
  const [normalNews, setNormalNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/all');
        const allNews = response.data;

        setTodayNews(allNews.slice(0, 3));
        setNormalNews(allNews.slice(3));
        setSearchData(allNews);
      } catch (err) {
        console.error('Haberler alınırken bir hata oluştu:', err);
      }
    };

    fetchNews();
  }, [setSearchData]);

  return (
    <div className="home">
      <section className="today-news-section">
        <h1>Bugün Ne Oldu?</h1>
        <div className="news-grid">
          {todayNews.map((item) => (
            <Link key={item._id} to={`/news/${item._id}`}>
              <div className="news-card">
                <img src={process.env.PUBLIC_URL + item.image} alt="Haber Görseli" />
                <div className="news-content">
                  <h2>{item.title}</h2>
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
                <img src={process.env.PUBLIC_URL + item.image} alt="Haber Görseli" />
                <div className="news-content">
                  <h2>{item.title}</h2>
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
