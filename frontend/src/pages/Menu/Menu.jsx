import "./Menu.css";
import IconStar from "../../assets/components/IconStar";
import {useContext, useEffect, useState, useMemo} from "react";
import {handleFoods, handleMenus} from "../../services/api.js";
import CartContext from "../../contexts/CartContext/CartContext.js";
import MenuContext from "../../contexts/MenuContext/MenuContext.js";


function Menu() {
	const [currentID, setcurrentID] = useState(null);
	const [FoodByCategory, setFoodByCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const {Menus, Foods, setFoods, setMenus, searchQuery, setSearchQuery} = useContext(MenuContext);

	const handleChooseMenu = (id) => {
		setSearchQuery("");
		const currentMenuFoods = Foods.filter(f => f.menu_id === id)
		setFoodByCategory(currentMenuFoods)
		setcurrentID(id)
	}

	useEffect(() => {
		Promise.all([handleMenus(), handleFoods()]).then(([menus, foods]) => {
			setMenus(menus || [])
			setFoods(foods || [])
		}).finally(() => setLoading(false));
	}, []);

	const isSearching = searchQuery.trim().length > 0;

	const displayedFoods = useMemo(() => {
		if (isSearching) {
			const q = searchQuery.toLowerCase();
			return Foods.filter(f =>
				f.name.toLowerCase().includes(q) ||
				f.description.toLowerCase().includes(q)
			);
		}
		return FoodByCategory.length ? FoodByCategory : Foods;
	}, [isSearching, searchQuery, FoodByCategory, Foods]);

	if (loading) {
		return (
			<main className="px-6 py-8 flex flex-col gap-8">
				<div className="grid gap-2">
					<h1 className="font-headline font-bold text-neutral-100 text-2xl">
						Explore our menu
					</h1>
					<p className="text-sm text-neutral-200 max-w-2xl">
						Discover a world of flavors. From crisp salads to decadent
						desserts, our carefully curated menu offers something
						delicious for every craving. Fresh ingredients, expertly
						prepared.
					</p>
				</div>
				<div className="flex gap-6 animate-pulse">
					{Array.from({length: 8}).map((_, i) => (
						<div key={i} className="grid place-items-center gap-2">
							<div className="w-16 h-16 rounded-full bg-neutral-800"></div>
							<div className="h-3 w-14 bg-neutral-800 rounded"></div>
						</div>
					))}
				</div>
				<div className="flex gap-6 flex-wrap">
					{Array.from({length: 8}).map((_, i) => (
						<article key={i} className="dish-component animate-pulse">
							<div className="w-full h-37.5 bg-neutral-800"></div>
							<div className="grid px-3 py-3 gap-3">
								<div className="h-5 bg-neutral-800 rounded w-2/3"></div>
								<div className="h-3 bg-neutral-800 rounded w-full"></div>
								<div className="h-5 bg-neutral-800 rounded w-1/4"></div>
							</div>
						</article>
					))}
				</div>
			</main>
		);
	}

	return (
		<main className="px-6 py-8 flex flex-col gap-8">
			<div className="grid gap-2">
				<h1 className="font-headline font-bold text-neutral-100 text-2xl">
					Explore our menu
				</h1>
				<p className="text-sm text-neutral-200 max-w-2xl">
					Discover a world of flavors. From crisp salads to decadent
					desserts, our carefully curated menu offers something
					delicious for every craving. Fresh ingredients, expertly
					prepared.
				</p>
			</div>

			<div className="flex gap-6">
				{Menus.map(({id, name, image}) => (
					<article
						key={id}
						className={`grid place-items-center gap-2 on-hover cursor-pointer ${!isSearching && currentID === id ? "on-focus" : ""}`}
						onClick={() => handleChooseMenu(id)}
					>
						<img
							className="w-16 h-16 rounded-full border-3 border-transparent"
							src={`/src/assets/images/menus/${image}`}
							alt={`${name} image`}
						/>
						<span className="text-sm capitalize">
							{name}
						</span>
					</article>
				))}
			</div>

			{isSearching && (
				<p className="text-sm text-neutral-400">
					{displayedFoods.length} result{displayedFoods.length !== 1 ? "s" : ""} for "{searchQuery}"
				</p>
			)}

			<div className="flex gap-6 flex-wrap">
				{displayedFoods.length > 0 ? (
					displayedFoods.map(f => (
						<Dish key={f.id} food={f} />
					))
				) : (
					<p className="text-neutral-400 py-8">No dishes found matching your search.</p>
				)}
			</div>
		</main>
	);
}

export default Menu;


const Dish = ({ food }) => {
	const {Cart, addToCart, removeFromCart} = useContext(CartContext);

	const handlers = {
		increment : () => addToCart(food.id),
		decrement: () => removeFromCart(food.id)
	}

	return (
		<article className="dish-component">
			<div className="relative">
				<img
					className="w-full max-h-37.5 object-cover object-center"
					src={`/src/assets/images/foods/${food.image}`}
					alt={food.name}
				/>
				{!Cart.find(f => f.id === food.id) ? (
					<button className="absolute bottom-3 right-3 cursor-pointer w-8 h-8 inline-grid place-content-center bg-neutral-950 shadow-btn rounded-full transition-all hover:scale-125 hover:bg-neutral-900" type={"button"} onClick={handlers.increment}>+</button>
				) : (
					<div className="flex justify-between px-1 items-center bg-neutral-950 w-25 h-8 rounded-full absolute bottom-3 right-3">
						<button onClick={handlers.decrement} className="cursor-pointer hover:scale-125 text-red-500 text-xl w-6 h-6 inline-grid place-content-center hover:bg-neutral-900 hover:shadow-btn rounded-full transition-all" type="button">-</button>
						<span className="text-sm">{Cart.find(f => f.id === food.id).quantity}</span>
						<button onClick={handlers.increment} className="cursor-pointer hover:scale-125 text-green-500 text-xl w-6 h-6 inline-grid place-content-center hover:bg-neutral-900 hover:shadow-btn rounded-full transition-all" type="button">+</button>
					</div>
				)}
			</div>
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
				<em className="not-italic font-medium text-primary-600 text-xl transition-colors hover:text-primary-400">
					${food.price}
				</em>
			</div>
		</article>
	);
};
