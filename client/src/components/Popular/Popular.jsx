import React, { useState, useEffect } from 'react'
import './Popular.css'
// import data_product from '../../Assets/data'
import Items from '../Items/Items'

export default function Popular() {

  const [popularProducts, setPopularProducts] = useState([])

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products/popularinwomen");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPopularProducts(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular_item">
            {
                popularProducts.map((item,index)=>{
                    return (
                    <Items 
                     key={index} 
                     id={item.id}
                     name={item.name}
                     image={item.image}
                     new_price={item.new_price}
                     old_price={item.old_price}
                     />
                    )
                })
            }
        </div>
    </div>
  )
}
