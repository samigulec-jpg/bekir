import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectNewsPage.css';

const SelectNewsPage = () => {
    const [newsList, setNewsList] = useState([]);
    const navigate = useNavigate();

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

    const handleEditClick = (id) => {
        navigate(`/update-news/${id}`);
    };

    return (
        <div className="select-news-container">
            <h1>Düzenlenecek Haberi Seçin</h1>
            <div className="news-list">
                {newsList.map(news => (
                    <div className="news-item" key={news._id}>
                        <img src={`http://localhost:5000/${news.image}`} alt="Haber Görseli" />
                        <div className="news-content">
                            <h2>{news.title}</h2>
                            <p>{news.content}</p>
                            <p className="news-date">{news.date}</p>
                            <button className="edit-button" onClick={() => handleEditClick(news._id)}>Düzenle</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectNewsPage;
