import { useEffect, useState } from 'react';
import { createContext } from "react";
// import all_product from '../Assets/all_product'


export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart())

    const fetchInfo = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/products/getAllProducts");

            const data = await response.json();

            if (!response.ok) {
                // throw new Error('Network response was not ok');
                console.log(data)
            }
            if (response.ok) {
                setAll_Product(data)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchInfo()

        if(localStorage.getItem('token')){
            fetch(`http://localhost:4000/api/products/getcart`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ "token": localStorage.getItem('token') })
            }).then(response => response.json())
            .then(data => {setCartItems(data)})
        }
    }, [])


    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if (localStorage.getItem('token')) {
            fetch(`http:/localhost:4000/api/products/addtocart`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then(response => response.json())
                .then(data => { console.log(data) })
        }
        console.log(cartItems)
    }



    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('token')) {
            fetch(`http:/localhost:4000/api/products/removefromcart`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then(response => response.json())
                .then(data => { console.log(data) })
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(itemId));
                totalAmount += itemInfo.new_price * cartItems[itemId];
            }
        }
        return totalAmount;
    };


    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalItems += cartItems[itemId];
            }
        }
        return totalItems;
    }



    const contextValue = { getTotalCartAmount, getTotalCartItems, all_product, cartItems, addToCart, removeFromCart }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;


