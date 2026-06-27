const API_URL = import.meta.env.VITE_API_URL


export const apiRequest = async (endpoint, method_, body_=null) => {
    const URL = `${API_URL}${endpoint}`
    let request = ["get", "delete"].includes(method_.toLowerCase()) ? (
        new Request(URL, {method: method_, headers: {"Accept": "application/json"}})
    ):(
        new Request(URL, {method: method_, body: JSON.stringify(body_), headers: {"Content-Type": "application/json", "Accept": "application/json"}})
    )

    let response = await fetch(request)
    let data_ = await response.json()
    data_.status = response.status
    return data_
}