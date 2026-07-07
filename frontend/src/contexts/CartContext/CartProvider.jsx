import CartContext from "./CartContext.js";
import {useEffect, useState} from "react";


const CartProvider = ({children}) => {
    const [Cart, setCart] = useState({});

    const addToCart = (foodId) => {
        const CartCopy = structuredClone(Cart)
        if (CartCopy[foodId]) {
            if (CartCopy[foodId]["quantity"]) {
                CartCopy[foodId]["quantity"] += 1;
            } else {
                CartCopy[foodId] = {"quantity": 1}
            }
        }
        else {
            CartCopy[foodId] = {"quantity": 1}
        }

        setCart(CartCopy);
    }

    const removeFromCart = (foodId) => {
        const CartCopy = structuredClone(Cart)
        CartCopy[foodId]["quantity"] -= 1;
        if (CartCopy[foodId]["quantity"]===0) {
            delete CartCopy[foodId]
        }
        setCart(CartCopy);
    }

    useEffect(() => {
        console.log(Cart)
    }, [Cart]);

    const states = {
        Cart,
        setCart,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value={states}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;