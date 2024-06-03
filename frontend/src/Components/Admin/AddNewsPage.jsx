import React, { useState } from 'react';
import './AddNewsPage.css';

const AddNewsPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Haber ekleme işlemleri burada gerçekleştirilebilir
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
        <div className="add-news-container">
            <h1>Haber Ekle</h1>
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
                <button type="submit">Haberi Ekle</button>
            </form>
        </div>
    );
};

export default AddNewsPage;
