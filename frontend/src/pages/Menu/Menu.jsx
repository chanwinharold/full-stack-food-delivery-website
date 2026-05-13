import { food_list, menu_list } from "../../assets/assets";
import "./Menu.css";
import IconStar from "../../assets/components/IconStar";


function Menu() {
	const Foods = food_list.slice(18, 26)

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
				{menu_list.map((menu, index) => (
					<a href={`/menu?id=${index}`}>
						<article
							key={index}
							className="grid place-items-center gap-2 on-hover cursor-pointer"
						>
							<img
								className="w-16 h-16 rounded-full border-3 border-transparent"
								src={menu.menu_image}
								alt=""
							/>
							<span className="text-sm capitalize">
								{menu.menu_name}
							</span>
						</article>
					</a>
				))}
			</div>

			<div className="flex gap-6 flex-wrap">
				{Foods.map((food, index) => (
					<Dish key={index} food={food} />
				))}
			</div>
		</main>
	);
}

export default Menu;


const Dish = ({ food }) => {
	let btnType = true
	return (
		<article key={food._id} className="dish-component">
			<div className="relative">
				<img
					className="w-full max-h-37.5 object-cover object-center"
					src={food.image}
					alt={food.name}
				/>
				{btnType ? (
					<button
						className="absolute bottom-3 right-3 cursor-pointer w-8 h-8 inline-grid place-content-center bg-neutral-950 shadow-btn rounded-full transition-all hover:scale-125 hover:bg-neutral-900"
						type={"button"}
					>
						+
					</button>
				) : (
					<div className="flex justify-between px-1 items-center bg-neutral-950 w-25 h-8 rounded-full absolute bottom-3 right-3">
						<button className="cursor-pointer hover:scale-125 text-red-500 text-xl w-6 h-6 inline-grid place-content-center hover:bg-neutral-900 hover:shadow-btn rounded-full transition-all" type="button">-</button>
						<span className="text-sm">2</span>
						<button className="cursor-pointer hover:scale-125 text-green-500 text-xl w-6 h-6 inline-grid place-content-center hover:bg-neutral-900 hover:shadow-btn rounded-full transition-all" type="button">+</button>
					</div>
				)}
			</div>
			<div className="grid px-3 py-3 gap-3 relative">
				{/* Note */}
				<span className="absolute top-4 right-4 flex gap-1">
					<IconStar />
					<span className="text-[10px]">4.5</span>
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