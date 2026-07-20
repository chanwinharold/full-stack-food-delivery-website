import {Navigate, Outlet} from "react-router";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext.js";

function ProtectedRoute() {
    const {auth} = useContext(AuthContext);
    if (!auth) {
        return <Navigate to={`/login`} replace={true} />
    }

    return <Outlet />
}

export default ProtectedRoute;