import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteNewsPage.css';

const DeleteNewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news/all');
                setNews(response.data);
                console.log('Fetched news:', response.data); // Haberleri kontrol et
            } catch (error) {
                console.error('Haberler alınırken bir hata oluştu:', error);
            }
        };

        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        console.log('Deleting news with ID:', id); // Silme işlemi öncesi ID'yi kontrol et
        try {
            const response = await axios.delete(`http://localhost:5000/api/news/${id}`);
            console.log('Silme API yanıtı:', response);
            if (response.status === 200) {
                setNews(news.filter((item) => item._id !== id));
                console.log('Haber silindi');
            } else {
                console.error('Silme işlemi sırasında beklenmeyen bir hata oluştu:', response.status);
            }
        } catch (error) {
            console.error('Haber silinirken bir hata oluştu:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="delete-news-container">
            <h1>Haber Sil</h1>
            <div className="news-list">
                {news.map((item) => (
                    <div key={item._id} className="news-item">
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <p className="news-date">{item.date}</p>
                        {item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.title} className="news-image" />}
                        <button onClick={() => handleDelete(item._id)}>Haber Sil</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteNewsPage;
