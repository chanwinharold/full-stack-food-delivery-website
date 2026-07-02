import {useState} from "react";


const useCart = () => {
    const [Cart, setCart] = useState([]);

    const findDish = (dish_) => {
        for (let i = 0; i < Cart.length; i++) {
            if (Cart[i].id === dish_.id) {
                return i
            }
        }
        return -1
    }
    const addDish = (dish_) => {
        setCart(prevState => {
            prevState.push(dish_)
        })
    }
    const deleteDish = (dish_) => {
        setCart(prevState => {
            delete prevState[dish_.id]
        })
    }

    const setQuantity = (dish_, count_) => {
        const index = findDish(dish_)
        if (index === -1) {
            dish_.quantity = count_
            addDish(dish_)
        } else {
            setCart(prevState => {
                prevState[index].quantity = count_
            })
        }
    }
    const setRemove = (dish_) => {
        const is_added =  findDish(dish_)
        if (is_added !== -1) {
            deleteDish(dish_)
        }
    }

    return [Cart, setQuantity, setRemove]
}

export default useCart;