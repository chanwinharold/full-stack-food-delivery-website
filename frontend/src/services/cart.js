

export const handleCartItems = async (cart, foods) => {

    const IDs = Object.keys(cart)
    const Qty = Object.values(cart)
    const CartItems = []

    for (let i = 0; i < IDs.length; i++) {
        const currentID = parseInt(IDs[i]);
        CartItems.push({
            id: currentID,
            food: foods.find(f => f.id === currentID),
            quantity: Qty[i].quantity
        })
    }

    return CartItems
}