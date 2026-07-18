import "./Navbar.css";
import { assets } from "../../assets/assets";
import Button from '../Button/Button';
import { Link } from "react-router";
import {useContext, useEffect} from "react";
import handleAuth from "../../services/auth.js";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";
import AuthContext from "../../contexts/AuthContext/AuthContext.js";


function Navbar() {
    const {setShowAlert, setDetail, setStatus} = useContext(AlertContext);
    const {auth, setAuth} = useContext(AuthContext);
    const statesAuth = {setShowAlert, setStatus, setDetail}

    useEffect(() => {
        handleAuth(statesAuth).then(authRes => {
            setAuth(authRes)
        })
    }, []);

    return (
        <header className="sticky inset-x-0 bg-white z-10">
            <div className="h-16 px-6 flex justify-between gap-8 items-center border-b-3 border-b-neutral-800">
                <a href="/">
                    <img src={assets.logo} alt="Tomato logo" />
                </a>

                <nav className="">
                    <ul className="flex items-center gap-6 menu-links">
                        <li><a href={"/"}>home</a></li>
                        <li><a href={"/menu"}>menu</a></li>
                        <li><a href={"/order"}>my order</a></li>
                        <li><a href={"/mobile"}>mobile app</a></li>
                        <li><a href={"/contact"}>contact us</a></li>
                    </ul>
                </nav>

                <div className="flex items-center gap-6">
                    <div>
                        <img className={"cursor-pointer"} src={assets.icon_search} alt="search icon"/>
                    </div>
                    <div>
                        <Link to={"/cart"}>
                            <img
                                className={"cursor-pointer"}
                                src={assets.icon_cart}
                                alt="basket icon"
                            />
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
