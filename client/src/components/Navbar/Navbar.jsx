import React, { useContext, useRef } from 'react'
import './Navbar.css'
import logo from '../../Assets/logo.png'
import cart_icon from '../../Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
// import drop_down from '../../Assets/images.png'
import { TiThMenu } from "react-icons/ti";


export default function Navbar() {

    const [menu, setMenu] = useState("shop")
    const { getTotalCartItems } = useContext(ShopContext)
    const menuRef = useRef()

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-visible')
    }


    return (
        <div className='navbar'>

            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>

            <div onClick={dropdown_toggle} className='nav_dropdown'>
              <TiThMenu className='nav_dropdown_icon' />
            </div>
            <ul ref={menuRef} className="nav-menu">
                <li
                    onClick={() => { setMenu("shop") }}
                >
                    <Link to='/' style={{ textDecoration: 'none', color: '#626262' }} >Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li
                    onClick={() => { setMenu("mens") }}
                >
                    <Link to='/mens' style={{ textDecoration: 'none', color: '#626262' }} > Men </Link>
                    {menu === "mens" ? <hr /> : <></>}
                </li>
                <li
                    onClick={() => { setMenu("womens") }}
                >
                    <Link to='/womens' style={{ textDecoration: 'none', color: '#626262' }} > Women </Link>
                    {menu === "womens" ? <hr /> : <></>}
                </li>
                <li
                    onClick={() => { setMenu("kids") }}
                >
                    <Link to='/kids' style={{ textDecoration: 'none', color: '#626262' }} > Kids </Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>


            <div className="nav-login-cart">
                {localStorage.getItem('token') ?
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        window.location.replace('/')
                    }}>Logout</button>
                    : <Link to='/login' ><button>Login</button></Link>}
                <Link to='/cart' ><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div >
    )
}
