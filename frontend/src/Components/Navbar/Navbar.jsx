import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import userIcon from '../Assets/user.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setSearchData, isLoggedIn, setIsLoggedIn, username, favorites }) => {
    const [menu, setMenu] = useState("home");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Logo" />
                <p>BesNews</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("home")}>
                    <Link to="/">Home {menu === "home" && <hr />}</Link>
                </li>
                <li onClick={() => setMenu("siyaset")}>
                    <Link to="/siyaset">Siyaset {menu === "siyaset" && <hr />}</Link>
                </li>
                <li onClick={() => setMenu("spor")}>
                    <Link to="/spor">Spor {menu === "spor" && <hr />}</Link>
                </li>
                <li onClick={() => setMenu("hayat")}>
                    <Link to="/hayat">Hayat {menu === "hayat" && <hr />}</Link>
                </li>
                {isLoggedIn && (
                    <li onClick={() => setMenu("favorites")}>
                        <Link to="/favorites">Favoriler {menu === "favorites" && <hr />}</Link>
                    </li>
                )}
            </ul>
            <form className="nav-search" onSubmit={handleSearchSubmit}>
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    placeholder="Search..." 
                />
                <button type="submit">Search</button>
            </form>
            {isLoggedIn ? (
                <div className='nav-user'>
                    <img src={userIcon} alt="User" className='user-icon' onClick={handleProfileClick} />
                    <button onClick={handleLogout} className='logout-button'>Logout</button>
                </div>
            ) : (
                <div className='nav-auth'>
                    <button><Link to="/login">Login</Link></button>
                    <button><Link to="/signup">Register</Link></button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
