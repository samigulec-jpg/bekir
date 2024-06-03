import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsListPage.css';

const NewsListPage = () => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news/all');
                setNewsList(response.data);
            } catch (err) {
                console.error('Haberler alınırken bir hata oluştu:', err);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-list-container">
            <h1>Haberler Listesi</h1>
            <div className="news-list">
                {newsList.map(news => (
                    <div className="news-item" key={news._id}>
                        <img src={`http://localhost:5000/${news.image}`} alt="Haber Görseli" />
                        <div className="news-content">
                            <h2>{news.title}</h2>
                            <p>{news.content}</p>
                            <p className="news-date">{news.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsListPage;
