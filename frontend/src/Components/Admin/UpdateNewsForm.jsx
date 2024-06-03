import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateNewsForm.css';

const UpdateNewsForm = ({ onSubmit }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [fullContent, setFullContent] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/news/${id}`);
                const news = response.data;
                setTitle(news.title);
                setContent(news.content);
                setSource(news.source);
                setCategory(news.category);
                setFullContent(news.fullContent);
                setDate(news.date);
                setImage(news.image);
            } catch (err) {
                console.error('Haber alınırken bir hata oluştu:', err);
            }
        };

        fetchNews();
    }, [id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('source', source);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('fullContent', fullContent);
        formData.append('date', date);

        onSubmit(formData);
    };

    return (
        <div className="update-news-form-container">
            <h1>Haberi Güncelle</h1>
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
                    <label>Detaylı Haber İçeriği:</label>
                    <textarea 
                        value={fullContent} 
                        onChange={(e) => setFullContent(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Haber Tarihi:</label>
                    <input 
                        type="text" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Fotoğraf:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </div>
                <button type="submit">Haberi Güncelle</button>
            </form>
        </div>
    );
};

export default UpdateNewsForm;
