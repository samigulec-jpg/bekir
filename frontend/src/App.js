import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Siyaset from './Pages/Siyaset/Siyaset';
import Spor from './Pages/Spor/Spor';
import Hayat from './Pages/Hayat/Hayat';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import SearchResults from './Pages/SearchResults/SearchResults';
import NewsDetail from './Pages/NewsDetail/NewsDetail';
import UserProfile from './Pages/UserProfile/UserProfile';
import Favorites from './Pages/Favorites/Favorites';

function App() {
  const [searchData, setSearchData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcı giriş durumu
  const [username, setUsername] = useState(''); // Kullanıcı adı
  const [favorites, setFavorites] = useState([]); // Favori haberler

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar 
        setSearchData={setSearchData} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        username={username} 
        favorites={favorites} 
      />
      <Routes>
        <Route path="/" element={<Home setSearchData={setSearchData} />} />
        <Route path="/siyaset" element={<Siyaset />} />
        <Route path="/spor" element={<Spor />} />
        <Route path="/hayat" element={<Hayat />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults searchData={searchData} />} />
        <Route path="/news/:id" element={<NewsDetail searchData={searchData} isLoggedIn={isLoggedIn} username={username} setFavorites={setFavorites} favorites={favorites} />} />
        <Route path="/profile" element={<UserProfile setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
