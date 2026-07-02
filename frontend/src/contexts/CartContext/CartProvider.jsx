import CartContext from "./CartContext.js";
import useCart from "../../hooks/useCart.js";


const CartProvider = ({children}) => {
    const [Cart, setQuantity, setRemove] = useCart();
    const states = {
        Cart,
        setQuantity,
        setRemove
    }

    return (
        <CartContext.Provider value={states}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;