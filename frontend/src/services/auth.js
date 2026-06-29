import {isGoodResponse} from "./status.js";
import {apiRequest} from "./api.js";


const handleAuth = async ({setShowAlert, setStatus, setDetail}) => {
    const authMe = await apiRequest("/auth/me", "GET")

    if (!isGoodResponse(authMe.status)) {
        setShowAlert(true)
        setStatus(authMe.status)
        setDetail(authMe.detail)
    }
    setAuthToLocalStorage(authMe.data)
    return authMe.data
}

export default handleAuth;


const setAuthToLocalStorage = (data) => {
    if (data) {
        delete data.id
        localStorage.setItem("current_user", JSON.stringify(data))
    } else {
        localStorage.removeItem("current_user")
    }
}