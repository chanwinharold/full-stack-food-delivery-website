import CartContext from "./CartContext.js";
import {useContext, useEffect, useState} from "react";
import MenuContext from "../MenuContext/MenuContext.js";


const CartProvider = ({children}) => {

    const extra = {deliveryFee: 5, taxes: 4}
    const [Total, setTotal] = useState(0);
    const {Foods} = useContext(MenuContext);
    const [Cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(Cart))
    }, [Cart]);

    const addToCart = (foodId) => {
        const currentFood = Cart.find(f => f.id === foodId);

        if (currentFood) {
            setCart(prevState =>
                prevState.map(item =>
                    item.id === foodId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            const food = Foods.find(f => f.id === foodId);

            if (!food) return;

            setCart(prevState => [
                ...prevState,
                {
                    ...food,
                    quantity: 1
                }
            ]);
        }
    };

    const removeFromCart = (foodId) => {
        setCart(prevState =>
            prevState
                .map(item =>
                    item.id === foodId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const clearFromCart = (foodId) => {
        setCart(prevState =>
            prevState.map(item => item.id === foodId
                ? {...item, quantity: 0}
                : item
            ).filter(item => item.id !== foodId)
        )
    }

    const states = {
        Cart,
        Total,
        extra,
        setTotal,
        setCart,
        addToCart,
        removeFromCart,
        clearFromCart
    }
    return (
        <CartContext.Provider value={states}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;