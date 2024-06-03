import React, { useEffect, useState } from 'react';
import './DeleteNewsPage.css';

const DeleteNewsPage = () => {
    const [news, setNews] = useState([]);

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

    const handleDelete = (id) => {
        // Haber silme işlemleri burada gerçekleştirilebilir
        setNews(news.filter((item) => item.id !== id));
        console.log('Silinen haber id:', id);
    };

    return (
        <div className="delete-news-container">
            <h1>Haber Sil</h1>
            <ul>
                {news.map((item) => (
                    <li key={item.id}>
                        <div className="news-item">
                            <div className="news-content">
                                <h2>{item.title}</h2>
                                <p>{item.content}</p>
                            </div>
                            <button className="delete-button" onClick={() => handleDelete(item.id)}>Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteNewsPage;
