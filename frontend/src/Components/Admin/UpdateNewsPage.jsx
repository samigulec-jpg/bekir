import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateNewsPage.css';

const UpdateNewsPage = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Haberleri API'den çekme işlemleri burada gerçekleştirilebilir
        // Örnek haber verisi
        const exampleNews = [
            { id: 1, title: 'Haber Başlığı 1', content: 'Haber İçeriği 1' },
            { id: 2, title: 'Haber Başlığı 2', content: 'Haber İçeriği 2' },
            { id: 3, title: 'Haber Başlığı 3', content: 'Haber İçeriği 3' },
        ];
        setNews(exampleNews);
    }, []);

    const handleUpdate = (id) => {
        // Haber güncelleme sayfasına yönlendirme
        navigate(`/update-news/${id}`);
    };

    return (
        <div className="update-news-container">
            <h1>Haber Güncelle</h1>
            <ul>
                {news.map((item) => (
                    <li key={item.id}>
                        <div className="news-item">
                            <div className="news-content">
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                            </div>
                            <button className="update-button" onClick={() => handleUpdate(item.id)}>Güncelle</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpdateNewsPage;
