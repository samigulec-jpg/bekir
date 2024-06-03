import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <div className="button-container">
                <Link to="/add-news" className="admin-button">Haber Ekle</Link>
                <Link to="/delete-news" className="admin-button">Haber Sil</Link>
                <Link to="/news-list" className="admin-button">Haberleri Listele</Link>
                <Link to="/update-news" className="admin-button ">Haber Güncelle</Link>
            </div>
        </div>
    );
};

export default AdminPage;
