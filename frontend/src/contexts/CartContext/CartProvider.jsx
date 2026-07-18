import CartContext from "./CartContext.js";
import {useContext, useState} from "react";
import MenuContext from "../MenuContext/MenuContext.js";


const CartProvider = ({children}) => {
    const [Cart, setCart] = useState([]);
    const {Foods} = useContext(MenuContext);

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