import AlertContext from "./AlertContext.js";
import {useState} from "react";


const AlertProvider = ({children}) => {
	const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState(null)
    const [detail, setDetail] = useState(null)
    const states = {
        showAlert,
        setShowAlert,
        status,
        setStatus,
        detail,
        setDetail
    }

    return (
        <AlertContext.Provider value={states}>
            {children}
        </AlertContext.Provider>
    )

}

export default AlertProvider;