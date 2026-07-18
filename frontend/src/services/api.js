const API_URL = import.meta.env.VITE_API_URL


export const apiRequest = async (endpoint, method_, body_=null) => {
    const URL = `${API_URL}${endpoint}`
    let request = ["get", "delete"].includes(method_.toLowerCase()) ? (
        new Request(URL, {method: method_, headers: {"Accept": "application/json"}, credentials: "include"})
    ):(
        new Request(URL, {method: method_, body: JSON.stringify(body_), headers: {"Content-Type": "application/json", "Accept": "application/json"}, credentials: "include"})
    )

    let response = await fetch(request)
    let data_ = await response.json()
    data_.status = response.status
    return data_
}

export const handleMenus = async () => {
    const menus = localStorage.getItem("menus")
    if (menus) return JSON.parse(menus)

    const response = await apiRequest("/menus", "GET")
    localStorage.setItem("menus", JSON.stringify(response.data))
    return response.data
}

export const handleFoods = async () => {
    const foods = localStorage.getItem("foods")
    if (foods) return JSON.parse(foods)

    const response = await apiRequest("/dishes", "GET")
    localStorage.setItem("foods", JSON.stringify(response.data))
    return response.data
}