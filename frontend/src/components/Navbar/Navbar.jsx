import "./Navbar.css";
import { assets } from "../../assets/assets";
import Button from '../Button/Button';
import { Link } from "react-router";


function Navbar() {
  return (
    <header className="h-16 px-6 flex justify-between gap-8 items-center border-b-3 border-b-neutral-800">
      <a href="/">
	  	<img src={assets.logo} alt="Tomato logo" />
	  </a>

	  <nav className="">
		<ul className="flex items-center gap-6 menu-links">
			<li><a href={"/"}>home</a></li>
			<li><a href={"/menu"}>menu</a></li>
			<li><a href={"/mobile"}>mobile app</a></li>
			<li><a href={"/contact"}>contact us</a></li>
		</ul>
	  </nav>

	  <div className="flex items-center gap-6">
		<div>
			<img className={"cursor-pointer"} src={assets.icon_search} alt="search icon" />
		</div>
		<div>
			<Link to={"/cart"}><img className={"cursor-pointer"} src={assets.icon_cart} alt="basket icon" /></Link>
		</div>

		<Button link={"/signup"} className={"btn-primary-outlined rounded-xl"}>sign up</Button>
	  </div>
    </header>
  );
}

export default Navbar;
