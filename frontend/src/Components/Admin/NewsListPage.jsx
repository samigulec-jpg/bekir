import React, { useEffect, useState } from 'react';
import './NewsListPage.css';

const NewsListPage = () => {
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

    return (
        <div className="news-list-container">
            <h1>Haber Listesi</h1>
            <ul>
                {news.map((item) => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsListPage;
