import "./Navbar.css";
import { assets } from "../../assets/assets";
import Button from '../Button/Button';
import { Link } from "react-router";
import {useContext, useEffect} from "react";
import handleAuth from "../../services/auth.js";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";
import AuthContext from "../../contexts/AuthContext/AuthContext.js";
import Cart from "../../pages/Cart/Cart.jsx";
import CartContext from "../../contexts/CartContext/CartContext.js";


function Navbar() {
    const {setShowAlert, setDetail, setStatus} = useContext(AlertContext);
    const {auth, setAuth} = useContext(AuthContext);
    const statesAuth = {setShowAlert, setStatus, setDetail}
    const {Cart} = useContext(CartContext);

    useEffect(() => {
        handleAuth(statesAuth).then(authRes => {
            setAuth(authRes)
        })
    }, []);

    return (
        <header className="sticky inset-x-0 bg-white z-10">
            <div className="h-16 px-6 flex justify-between gap-8 items-center border-b-3 border-b-neutral-800">
                <Link to={"/"}>
                    <img src={`${assets.logo}`} alt="Tomato logo" />
                </Link>

                <nav className="">
                    <ul className="flex items-center gap-6 menu-links">
                        <li><Link to={"/"}>home</Link></li>
                        <li><Link to={"/menu"}>menu</Link></li>
                        <li><Link to={"/order"}>my order</Link></li>
                        <li><Link to={"/mobile"}>mobile app</Link></li>
                        <li><Link to={"/contact"}>contact us</Link></li>
                    </ul>
                </nav>

                <div className="flex items-center gap-6">
                    <div>
                        <img className={"cursor-pointer"} src={`${assets.icon_search}`} alt="search icon"/>
                    </div>
                    <div className={"relative"}>
                        <Link to={"/cart"}>
                            <img
                                className={"cursor-pointer"}
                                src={`${assets.icon_cart}`}
                                alt="basket icon"
                            />
                            {Cart.length > 0
                                ? <span className={`absolute -top-1 -right-2 inline-block w-6 h-4 text-center font-bold rounded-xl bg-primary-500 text-xs `}>{Cart.length}</span>
                                : null
                            }
                        </Link>
                    </div>

                    {!auth
                        ? <Button link={"/login"} className={"btn-primary-outlined rounded-xl"}>login</Button>
                        : <img src="/icon_user.svg" alt="user profile image"/>}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
