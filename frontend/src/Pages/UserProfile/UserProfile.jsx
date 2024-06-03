import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ setIsLoggedIn, setUsername }) => {
  const [userId, setUserId] = useState('');
  const [username, setUsernameState] = useState(''); // State'in adı username olarak değiştirildi
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId'); // Kullanıcı ID'sini de saklıyoruz
    if (storedUsername && storedUserId) {
      setUsernameState(storedUsername);
      setUserId(storedUserId);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/auth/update', {
        userId,
        username: username ? username : undefined,
        newPassword: newPassword ? newPassword : undefined,
      });
      if (username) {
        localStorage.setItem('username', username); // Yeni kullanıcı adını localStorage'a kaydediyoruz
      }
      setMessage(response.data.message);
    } catch (error) {
      console.error('Update error:', error.response?.data?.message || error.message); // Daha ayrıntılı hata mesajı
      setMessage(error.response?.data?.message || 'Güncelleme sırasında bir hata oluştu');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/auth/delete', {
        data: { userId }
      });
      setMessage(response.data.message);
      setShowPopup(true);
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUsername('');
        setShowPopup(false);
        navigate('/login'); // Kullanıcıyı login sayfasına yönlendiriyoruz
      }, 2000);
    } catch (error) {
      console.error('Delete error:', error.response?.data?.message || error.message); // Daha ayrıntılı hata mesajı
      setMessage(error.response?.data?.message || 'Hesap silme sırasında bir hata oluştu');
    }
  };

  return (
    <div className="user-profile">
      <h2>Kullanıcı Profili</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Yeni Şifre:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Güncelle</button>
      </form>
      <button className="delete-account" onClick={handleDeleteAccount}>Hesabı Sil</button>
      {showPopup && (
        <div className="popup">
          <p>Hesap Başarıyla Silindi</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
