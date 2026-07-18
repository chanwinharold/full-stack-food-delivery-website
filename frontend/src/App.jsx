import { Outlet, createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Mobile from "./pages/Mobile/Mobile";
import Contact from "./pages/Contact/Contact";

import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import AlertProvider from "./contexts/AlertContext/AlertProvider.jsx";
import CartProvider from "./contexts/CartContext/CartProvider.jsx";
import MenuContext from "./contexts/MenuContext/MenuContext.js";
import MenuProvider from "./contexts/MenuContext/MenuProvider.jsx";


const router = createBrowserRouter([
	{
		path: "/",
		Component: AppLayout,
		children: [
			{
				index: true,
				Component: Home
			},
			{
				path: "/menu",
				Component: Menu
			},
			{
				path: "/order",
				Component: Order
			},
			{
				path: "/mobile",
				Component: Mobile
			},
			{
				path: "/contact",
				Component: Contact
			},
			{
				path: "/cart",
				Component: Cart
			},
		],
	},
	{
		path: "",
		Component: AppWithOnlyFooterLayout,
		children: [
			{
				path: "/checkout",
				Component: Checkout,
			},
		],
	},
	{
		path: "/signup",
		Component: Signup,
	},
	{
		path: "/login",
		Component: Login,
	},
	{
		path: "/payment",
		Component: Payment,
	},
]);

function App() {
	return (
		<AuthProvider>
			<MenuProvider>
				<CartProvider>
					<AlertProvider>
						<RouterProvider router={router} />
					</AlertProvider>
				</CartProvider>
			</MenuProvider>
		</AuthProvider>
	);
}

export default App;

function AppLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

function AppWithOnlyFooterLayout() {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
}
