import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Şifrelerin eşleştiğini kontrol edin
    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor');
      return;
    }

    // Burada kayıt işlevselliğini uygulayın
    console.log('Kayıt bilgileri:', { username, password });

    // Örneğin, kayıt API'sine istek gönderin
    // Başarılı bir kayıt işleminden sonra anasayfaya yönlendirin
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Şifreyi Onayla:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default SignUp;
