import React, { useState, useEffect } from 'react'
import './NewCollections.css'
// import new_collections from '../../Assets/new_collections'
import Items from '../Items/Items'


export default function NewCollections() {

    const [new_collections, setNew_collections] = useState([])

    
  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products/newCollection");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNew_collections(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {
                    new_collections.map((item,index) => {
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
