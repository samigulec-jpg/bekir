import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>BesNews</p>
        </div>
        <ul className='nav-menu'>
            <li>Home <hr/></li>
            <br/>
            <li>Siyaset <hr/></li>
            <br/>
            <li>Spor <hr/></li>
            <br/>
            <li>Hayat <hr/></li>
        </ul>
        <div className='nav-login'>
            <button>Login</button>
        </div>

        <div className='nav-register'>
            <button>Register</button>
        </div>
        
      
    </div>
  )
}

export default Navbar
