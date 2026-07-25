import {apiRequest} from "./api.js";


export const createOrder = async (orderData) => {
    const response = await apiRequest("/orders", "POST", orderData)
    return response
}

export const getOrders = async () => {
    const response = await apiRequest("/orders", "GET")
    return response
}
