import React, { useState } from 'react';
import axios from 'axios';
import './AddNewsPage.css';

const AddNewsPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [fullContent, setFullContent] = useState('');
  const [date, setDate] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('source', source);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('fullContent', fullContent);
    formData.append('date', date);

    // formData içeriğini kontrol edelim
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Haber eklendi:', response.data);
      // Formu sıfırla
      setTitle('');
      setContent('');
      setSource('');
      setCategory('');
      setImage(null);
      setFullContent('');
      setDate('');
    } catch (error) {
      console.error('Haber ekleme hatası:', error.response ? error.response.data : error.message);
    }
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
            required 
          />
        </div>
        <button type="submit">Haberi Ekle</button>
      </form>
    </div>
  );
};

export default AddNewsPage;
