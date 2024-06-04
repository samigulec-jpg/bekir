import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UpdateNewsForm from './UpdateNewsForm';

const UpdateNewsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleUpdate = async (formData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/news/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Haber güncellendi:', response.data);
            navigate('/news-list'); // Güncelleme sonrası listeleme sayfasına yönlendirme
        } catch (error) {
            console.error('Haber güncelleme hatası:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <UpdateNewsForm onSubmit={handleUpdate} />
        </div>
    );
};

export default UpdateNewsPage;
