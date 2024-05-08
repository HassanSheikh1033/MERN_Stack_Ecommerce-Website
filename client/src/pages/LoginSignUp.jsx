import React, { useState } from 'react'
import './CSS/LoginSignUp.css'
import { Link } from 'react-router-dom'

export default function LoginSignUp() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const signup = async () => {
    let responseData;
    let res = await fetch('http://localhost:4000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    responseData = await res.json()

    if (res.ok) {
      console.log(responseData)
      localStorage.setItem('token', responseData.token)
      window.location.replace('/')
    } else {
      console.log(responseData)
      alert(responseData.message)
    }

  }


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input name='name' value={formData.name} onChange={handleChange} type="text"
            placeholder='Your Name' />
          <input name='email' value={formData.email} onChange={handleChange} type="email"
            placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={handleChange}
            type="password" placeholder='Password' />
          <input name='confirmPassword' value={formData.confirmPassword} type="password"
            onChange={handleChange} placeholder='Confirm Password' />
        </div>
        <button onClick={() => { signup() }}>Continue</button>
        <p className='loginsignup-login'>Already have an account?
          <Link to={'/login'}>Login here</Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the items of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
