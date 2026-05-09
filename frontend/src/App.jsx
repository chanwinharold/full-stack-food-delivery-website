import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import Menu from "./pages/Menu/Menu";

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
				path: "/cart",
				Component: Cart
			},
			{
				path: "/menu",
				Component: Menu
			}
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
		<>
			<RouterProvider router={router} />
		</>
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
