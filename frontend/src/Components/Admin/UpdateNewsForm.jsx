import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateNewsForm.css';

const UpdateNewsForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        // Haber verilerini API'den çekme işlemi burada gerçekleştirilebilir
        // Örnek olarak ID'ye göre veri çekimi
        const exampleNews = {
            id,
            title: 'Örnek Haber Başlığı',
            content: 'Örnek Haber İçeriği',
            source: 'Örnek Haber Kaynağı',
            category: 'siyaset',
            image: 'example.jpg',
        };
        setTitle(exampleNews.title);
        setContent(exampleNews.content);
        setSource(exampleNews.source);
        setCategory(exampleNews.category);
        setImage(exampleNews.image);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Haber güncelleme işlemleri burada gerçekleştirilebilir
        console.log('Güncellenen haber id:', id);
        console.log('Haber başlığı:', title);
        console.log('Haber içeriği:', content);
        console.log('Haber kaynağı:', source);
        console.log('Kategori:', category);
        console.log('Fotoğraf:', image);
        // Formu sıfırla
        setTitle('');
        setContent('');
        setSource('');
        setCategory('');
        setImage('');
    };

    return (
        <div className="update-news-form-container">
            <h1>Haber Güncelle</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Haber Başlığı:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Haber İçeriği:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Haber Kaynağı:</label>
                    <input 
                        type="text" 
                        value={source} 
                        onChange={(e) => setSource(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Kategori:</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        <option value="siyaset">Siyaset</option>
                        <option value="spor">Spor</option>
                        <option value="hayat">Hayat</option>
                    </select>
                </div>
                <div>
                    <label>Fotoğraf:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImage(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Haberi Güncelle</button>
            </form>
        </div>
    );
};

export default UpdateNewsForm;
