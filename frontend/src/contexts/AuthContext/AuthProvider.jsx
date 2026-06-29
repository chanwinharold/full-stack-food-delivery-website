import AuthContext from "./AuthContext.js";
import {useState} from "react";


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null)
    const states = {
        auth,
        setAuth
    }

    return (
        <AuthContext.Provider value={states}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;