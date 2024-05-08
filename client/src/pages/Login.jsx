import React from 'react'
import './CSS/LoginSignUp.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (response.ok) {
                localStorage.setItem('token', responseData.token);
                window.location.replace('/');
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };


    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign In</h1>
                <div className="loginsignup-fields">
                    <input name='email' value={formData.email} onChange={handleChange}
                     type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={handleChange}
                        type="password" placeholder='Password' />
                </div>
                <button onClick={() => { login() }}>Continue</button>
                <p className='loginsignup-login'>Already have an account?
                    <Link to={'/register'}>Register here</Link>
                </p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the items of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}



