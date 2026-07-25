import "./Navbar.css";
import { assets } from "../../assets/assets";
import Button from '../Button/Button';
import { Link, useLocation } from "react-router";
import {useContext, useEffect, useState} from "react";
import handleAuth, {handleLogout} from "../../services/auth.js";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";
import AuthContext from "../../contexts/AuthContext/AuthContext.js";
import CartContext from "../../contexts/CartContext/CartContext.js";
import MenuContext from "../../contexts/MenuContext/MenuContext.js";
import {useNavigate} from "react-router";


function Navbar() {
    const {setShowAlert, setDetail, setStatus} = useContext(AlertContext);
    const {auth, setAuth} = useContext(AuthContext);
    const statesAuth = {setShowAlert, setStatus, setDetail}
    const {Cart, clearCart} = useContext(CartContext);
    const {searchQuery, setSearchQuery} = useContext(MenuContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const isMenuPage = location.pathname === "/menu";

    useEffect(() => {
        handleAuth(statesAuth).then(authRes => {
            setAuth(authRes)
        })
    }, []);

    const logout = async () => {
        await handleLogout();
        clearCart();
        setAuth(null);
        setSearchQuery("");
        navigate("/");
    };

    const toggleSearch = () => {
        if (searchOpen) {
            setSearchOpen(false);
            setSearchQuery("");
        } else {
            setSearchOpen(true);
            if (!isMenuPage) {
                navigate("/menu");
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (!isMenuPage) {
            navigate("/menu");
        }
    };

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
                    <div className="relative flex items-center">
                        {searchOpen && (
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search dishes..."
                                className="h-9 w-48 pr-2 pl-3 text-sm rounded-full border border-neutral-300 bg-neutral-950 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                        )}
                        <img
                            className={`cursor-pointer ${searchOpen ? "ml-1" : ""}`}
                            onClick={toggleSearch}
                            src={`${assets.icon_search}`}
                            alt="search icon"
                        />
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
                        : <button
                            onClick={logout}
                            className="cursor-pointer px-4 py-1 text-sm font-medium rounded-xl border border-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors"
                        >
                            logout
                        </button>
                    }
                </div>
            </div>
        </header>
    );
}

export default Navbar;
