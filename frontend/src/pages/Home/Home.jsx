import Button from "../../components/Button/Button";
import "./Home.css";
import { food_list, menu_list } from "../../assets/assets";

function Home() {
	return (
		<main className="px-6 py-8">
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-arrow-right-icon lucide-arrow-right"
						>
							<path d="M5 12h14" />
							<path d="m12 5 7 7-7 7" />
						</svg>
					</Button>
				</div>
			</div>
		</section>
	);
};

const ExploreMenuSection = () => {
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
					{menu_list.map((menu, index) => (
						<article
							key={index}
							className="grid place-items-center gap-2 on-hover cursor-pointer"
						>
							<img
								className="w-20 h-20 rounded-full border-3 border-transparent"
								src={menu.menu_image}
								alt=""
							/>
							<span className="text-sm capitalize">
								{menu.menu_name}
							</span>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

const TopDishesSection = () => {
	const Foods = food_list.slice(1, 8)
	return (
		<section className="min-w-full py-16">
			<div className="min-h-min grid place-items-start gap-8">
				<h1 className="font-headline font-bold text-neutral-100 text-2xl">
					Top dishes near you
				</h1>

				<div className="flex gap-6 flex-wrap">
					{Foods.map((food) => (
						<article key={food._id} className="dish-component">
							<img src={food.image} alt={food.name} />
							<div className="grid px-3 py-3 gap-3 relative">
								{/* Note */}
								<span className="absolute top-4 right-4 flex gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
									>
										<path
											fill="#AB3500"
											d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
										/>
									</svg>
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
								<div className="flex justify-between">
									<em className="not-italic font-medium text-primary-600 text-xl transition-colors hover:text-primary-400">
										${food.price}
									</em>
									<button
										className="cursor-pointer w-6 h-6 inline-grid place-content-center bg-neutral-800 rounded-full transition-all hover:scale-125 hover:bg-neutral-900"
										type={"button"}
									>
										+
									</button>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};
