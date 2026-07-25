import Button from "../../components/Button/Button";
import "./Home.css";
import IconArrowRight from '../../assets/components/IconArrowRight';
import IconStar from '../../assets/components/IconStar';
import {useContext, useEffect, useState} from "react";
import AlertContext from "../../contexts/AlertContext/AlertContext.js";
import Alert from "../../components/AlertPopup/Alert.jsx";
import {apiRequest} from "../../services/api.js";
import CartContext from "../../contexts/CartContext/CartContext.js";
import AuthContext from "../../contexts/AuthContext/AuthContext.js";


function Home() {
	const { setShowAlert, showAlert, status, detail } = useContext(AlertContext)

	return (
		<main className="px-6 py-8">
			{showAlert ? <Alert setter={setShowAlert} status={status}>{detail}</Alert> : null}

			<HeroSection />
			<ExploreMenuSection />
			<hr className="text-neutral-800" />
			<TopDishesSection />
		</main>
	);
}

export default Home;

const HeroSection = () => {
	return (
		<section className="min-w-full">
			<div className="section-hero">
				{/* Blur orangered backdrop */}
				<div className="bg-gradient"></div>

				<div className="hero-content">
					<h1>
						Order your favourite <br />
						food here
					</h1>
					<p>
						Choose from a diverse menu featuring a delectable array
						of dishes crafted with the finest ingredients and
						culinary expertise. Our mission is to satisfy your
						cravings and elevate your dining experience, one
						delicious meal at a time.
					</p>
					<Button
						link={"/menu"}
						className={
							"inline-flex gap-x-2 btn-primary-outlined rounded-xl bg-neutral-950 hover:text-neutral-950 hover:bg-primary-600"
						}
					>
						View Menu
						<IconArrowRight />
					</Button>
				</div>
			</div>
		</section>
	);
};

const ExploreMenuSection = () => {
	const [Menus, setMenus] = useState([])
	const [loading, setLoading] = useState(true)

	const handleGetMenus = async () => {
		const menus = await apiRequest("/menus", "GET")
		return menus.data
	}

	useEffect(() => {
		handleGetMenus().then(res => {
			setMenus(res || [])
		}).finally(() => setLoading(false))
	}, []);

	return (
		<section className="min-w-full py-16">
			<div className="min-h-min grid place-items-start gap-8">
				<div className="grid gap-2">
					<h1 className="font-headline font-bold text-neutral-100 text-2xl">
						Explore our menu
					</h1>
					<p className="text-sm text-neutral-200">
						Choose from a diverse menu featuring a delectable array
						of dishes. Our mission is to satisfy your <br />
						cravings and elevate your dining experience, one
						delicious meal at a time.
					</p>
				</div>
				<div className="flex gap-6">
					{loading ? (
						Array.from({length: 8}).map((_, i) => (
							<div key={i} className="grid place-items-center gap-2 animate-pulse">
								<div className="w-20 h-20 rounded-full bg-neutral-800"></div>
								<div className="h-3 w-16 bg-neutral-800 rounded"></div>
							</div>
						))
					) : (
						Menus.map(({id, name, image}) => (
							<article
								key={id}
								className="grid place-items-center gap-2 on-hover cursor-pointer"
							>
								<img
									className="w-20 h-20 rounded-full border-3 border-transparent"
									src={`/src/assets/images/menus/${image}`}
									alt={`${name} image`}
								/>
								<span className="text-sm capitalize">
									{name}
								</span>
							</article>
						))
					)}
				</div>
			</div>
		</section>
	);
};

const TopDishesSection = () => {
	const [Foods, setFoods] = useState([])
	const [loading, setLoading] = useState(true)

	const handleFoods = async () => {
		const response = await apiRequest("/dishes/top", "GET")
		return response.data
	}

	useEffect(() => {
		handleFoods().then(res => {
			setFoods(res || [])
		}).finally(() => setLoading(false))
	}, []);

	return (
		<section className="min-w-full py-16">
			<div className="min-h-min grid place-items-start gap-8">
				<h1 className="font-headline font-bold text-neutral-100 text-2xl">
					Top dishes near you
				</h1>

				<div className="flex gap-6 flex-wrap">
					{loading ? (
						Array.from({length: 6}).map((_, i) => (
							<article key={i} className="dish-component animate-pulse">
								<div className="w-full h-37.5 bg-neutral-800"></div>
								<div className="grid px-3 py-3 gap-3">
									<div className="h-5 bg-neutral-800 rounded w-2/3"></div>
									<div className="h-3 bg-neutral-800 rounded w-full"></div>
									<div className="h-5 bg-neutral-800 rounded w-1/4"></div>
								</div>
							</article>
						))
					) : (
						Foods.map(f => (
							<Dish key={f.id} food={f} />
						))
					)}
				</div>
			</div>
		</section>
	);
};

const Dish = ({ food }) => {
	const {auth} = useContext(AuthContext);
	const {addToCart} = useContext(CartContext);
	const [added, setAdded] = useState(false);

	const handleAddToCart = () => {
		addToCart(food.id);
		setAdded(true)
	}

	return (
		<article className="dish-component">
			<img src={`/src/assets/images/foods/${food.image}`} alt={`${food.name} image`} />
			<div className="grid px-3 py-3 gap-3 relative">
				{/* Note */}
				<span className="absolute top-4 right-4 flex gap-1">
					<IconStar />
					<span className="text-[10px]">{food.stars}</span>
				</span>

				{/* Titre + contenu */}
				<div className="grid">
					<strong className="text-headline text-lg">
						{food.name}
					</strong>
					<span className="text-xs text-primary-900">
						{food.description}
					</span>
				</div>
				{/* prix */}
				<div className="flex justify-between">
					<em className="not-italic font-medium text-primary-600 text-xl transition-colors hover:text-primary-400">
						${food.price}
					</em>
					{auth &&
						<button
							onClick={handleAddToCart}
							className="disabled:opacity-5 cursor-pointer w-6 h-6 inline-grid place-content-center bg-neutral-800 rounded-full transition-all hover:scale-125 hover:bg-neutral-900"
							type={"button"}
							disabled={added}
						>
							+
						</button>
					}
				</div>
			</div>
		</article>
	);
};
