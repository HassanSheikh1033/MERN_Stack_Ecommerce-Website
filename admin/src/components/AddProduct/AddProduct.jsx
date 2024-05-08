import React, { useState } from 'react'
import './AddProduct.css'
import uploadarea from '../../Assets/upload_area.svg'

export default function AddProduct() {

    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }


    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }



    const uploadImage = async (image) => {
        try {
            const formData = new FormData();
            formData.append('product', image);
    
            const response = await fetch("http://localhost:4000/api/products/upload", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
    
            const responseData = await response.json();
            return responseData.image_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };
    


    const addProduct = async (product) => {
        try {
            const response = await fetch('http://localhost:4000/api/products/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
    
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    };
    
    const add_product = async () => {
        console.log(productDetails);
        let product = productDetails;
    
        try {
            const image_url = await uploadImage(image);
            product.image = image_url;
    
            const responseData = await addProduct(product);
    
            if (responseData.success) {
                alert("Product Added");
            } else {
                alert("Failed");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        }
    };
    




    return (
        <div className="add-product">
            <div className="add-product-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler}
                    type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="add-product-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler}
                        type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="add-product-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler}
                        type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="add-product-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler}
                    name="category" className='add-product-selector' >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="add-product-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : uploadarea}
                        className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" id='file-input' name='image' hidden />
            </div>
            <button onClick={() => { add_product() }} className="addproduct-btn">ADD</button>
        </div>
    )
}









// const add_product = async () => {
//     console.log(productDetails);
//     let product = productDetails;

//     let formData = new FormData();
//     formData.append('product', image);

//     let responseData;

//     await fetch("http://localhost:4000/upload", {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//         },
//         body: formData,
//     })
//         .then((res) => res.json()) // Corrected: return res.json() to pass data to next then()
//         .then((data) => {
//             responseData = data;
//             if (responseData.success) {
//                 product.image = responseData.image_url;
//                 console.log(product);
           
//                 const addProduct = async () => {
//                     const response = await fetch('http://localhost:4000/addproduct', {
//                         method: 'POST',
//                         headers: {
//                             Accept: "application/json",
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify(product),
//                     });
        
//                     // Handle the response from the inner fetch request
//                     const responseData = await response.json();
//                     if (responseData.success) {
//                         alert("Product Added");
//                     } else {
//                         alert("Failed");
//                     }
//                 };

//                 addProduct()
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }


