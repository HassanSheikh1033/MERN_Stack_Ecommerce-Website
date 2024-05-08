import React from 'react'
import './Navbar.css'
import logo from '../../Assets/nav-logo.svg'
import navprofile from '../../Assets/nav-profile.svg'


export default function Navbar() {
    return (
        <div className="navbar">
            <img src={logo} className='nav-logo' alt="" />
            <img src={navprofile} className='nav-profile' alt="" />
        </div>
    )
}
