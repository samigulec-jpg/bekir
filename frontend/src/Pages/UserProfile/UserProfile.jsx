import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [username, setUsername] = useState('currentUsername');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    // Kullanıcı bilgilerini güncelleme işlemi burada yapılacak
    console.log('Kullanıcı bilgileri güncellendi:', { username, newPassword });
  };

  const handleDeleteAccount = () => {
    // Hesap silme işlemi burada yapılacak
    console.log('Hesap silindi');
  };

  return (
    <div className="user-profile">
      <h2>Kullanıcı Profili</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mevcut Şifre:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Yeni Şifre:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Güncelle</button>
      </form>
      <button className="delete-account" onClick={handleDeleteAccount}>Hesabı Sil</button>
    </div>
  );
};

export default UserProfile;
