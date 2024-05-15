import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [menu,setMenu] = useState("home");

    
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
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
        </ul>
        <div className='nav-login'>
        <button><Link to="/login">Login</Link></button>
        </div>

        <div className='nav-register'>
        <button><Link to="/signup">Register</Link></button>
        </div>
        
      
    </div>
  )
}

export default Navbar
