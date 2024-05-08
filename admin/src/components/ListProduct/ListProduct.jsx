import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../Assets/cross_icon.png'


export default function ListProduct() {

  const [allProducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products/getAllProducts");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  
  const removeProduct = async (id) => {
    const response = await fetch(`http://localhost:4000/api/products/deleteproduct/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if(response.ok) {
      console.log(json);
    }

    if(!response.ok) {
      console.log(json);
    }

    // After successful deletion, update the product list
    await fetchInfo();
};



  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {
          allProducts.map((product, index) => {
            return <>
              <div key={index}  className='listproduct-format-main listproduct-format'>
                <img src={product.image} className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={() => removeProduct(product._id)}
                  src={cross_icon} className='listproduct-remove-icon' alt="" />
              </div>
              <hr />
            </>
          })
        }
      </div>
    </div>
  )
}
