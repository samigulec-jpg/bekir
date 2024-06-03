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
import AdminPage from './Components/Admin/AdminPage';
import AddNewsPage from './Components/Admin/AddNewsPage';
import NewsListPage from './Components/Admin/NewsListPage';
import DeleteNewsPage from './Components/Admin/DeleteNewsPage';
import UpdateNewsPage from './Components/Admin/UpdateNewsPage';
import SelectNewsPage from './Components/Admin/SelectNewsPage';

function App() {
  const [searchData, setSearchData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [favorites, setFavorites] = useState([]);

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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/siyaset" element={<Siyaset />} />
        <Route path="/spor" element={<Spor />} />
        <Route path="/hayat" element={<Hayat />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults searchData={searchData} />} />
        <Route path="/news/:id" element={<NewsDetail searchData={searchData} isLoggedIn={isLoggedIn} username={username} setFavorites={setFavorites} favorites={favorites} />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        <Route path="/add-news" element={<AddNewsPage />} />
        <Route path="/news-list" element={<NewsListPage />} />
        <Route path="/delete-news" element={<DeleteNewsPage />} />
        <Route path="/update-news" element={<SelectNewsPage />} /> {/* Seçim Sayfası */}
        <Route path="/update-news/:id" element={<UpdateNewsPage />} /> {/* Güncelleme Sayfası */}
      </Routes>
    </Router>
  );
}

export default App;
