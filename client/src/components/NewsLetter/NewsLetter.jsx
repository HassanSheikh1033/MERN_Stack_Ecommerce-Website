import React from 'react'
import './NewsLetter.css'

export default function NewsLetter() {
    return (
       <div className='container1'>
         <div className='newsletter'>
            <h1>Get Exclusive Offers on your Email</h1>
            <p>Subscribe to our NewsLetter and Stay Updated.</p>
            <div>
                <input type="email" placeholder='Enter your Email Id' />
                <button>Subscribe</button>
            </div>
        </div>
       </div>
    )
}
