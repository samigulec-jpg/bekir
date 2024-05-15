import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Home from './Pages//Home/Home';
import Hayat from './Pages/Hayat/Hayat';
import Spor from './Pages/Spor/Spor';
import Siyaset from './Pages//Siyaset/Siyaset';
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} /> {/* Ana sayfa rotası */}
          <Route path='/signup'element={<SignUp />} /> {/* Kayıt sayfası rotası */}
          <Route path='/login' element={<Login />} /> {/* Giriş sayfası rotası */}
          <Route path='/hayat' element={<Hayat />} /> {/* Hayat sayfası rotası */}
          <Route path='/spor' element={<Spor />} /> {/* Spor sayfası rotası */}
          <Route path='/siyaset' element={<Siyaset />} /> {/* Siyaset sayfası rotası */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
