import { assets } from "../../assets/assets";
import "./Mobile.css";

function Mobile() {
	return (
		<main className="">
			<Hero />
			<Arguments />
		</main>
	);
}

export default Mobile;

const Hero = () => {
	return (
		<section className="grid gap-4 grid-cols-2 place-items-center px-6 pb-16 min-h-lvh">
			<div className="flex flex-col gap-8 max-w-125">
				<h1 className="text-3xl font-bold">
					Get the Tomato App for a <br />
					faster experience
				</h1>
				<p className="text-sm text-neutral-200">
					Order from your favorite restaurants and track your delivery
					in real-time. Experience the most seamless food delivery
					process right from your pocket.
				</p>
				<div className="flex gap-4">
					<a href="#">
						<img src={assets.play_store} alt="" />
					</a>
					<a href="#">
						<img src={assets.app_store} alt="" />
					</a>
				</div>
			</div>

			<div className="flex gap-4 relative">
				<div className="shape-phone image-one"></div>
				<div className="bg-circle"></div>
				<div className="shape-phone image-two"></div>
			</div>
		</section>
	);
};

const Arguments = () => {
	return (
		<section className="flex flex-col gap-16 py-16 items-center px-6 bg-neutral-800 mt-16">
			<div className="flex flex-col gap-2 text-center">
				<h2 className="text-3xl font-semibold">Why use our app?</h2>
				<p className="text-neutral-200 max-w-150">
					Everything you love about Tomato, optimized for speed and
					convenience on your mobile device.
				</p>
			</div>

			<div className="flex flex-wrap gap-6">
				<article className="hover:shadow-2xl grid w-100 gap-4 bg-neutral-900 p-6 rounded-default transition-shadow duration-350 cursor-pointer">
					<span className="w-12 h-12 rounded-full bg-primary-200 inline-grid place-content-center">
						<img src={assets.icon_order} alt="" />
					</span>
					<div className="grid gap-2">
						<strong className="text-xl font-medium">
							Easy Ordering
						</strong>
						<p className="text-sm text-neutral-200">
							Browse menus, customize your meals, and checkout
							with just a few taps. Your favorites are always
							saved for quick reordering.
						</p>
					</div>
				</article>
				<article className="hover:shadow-2xl transition-shadow duration-350 cursor-pointer grid w-100 gap-4 bg-neutral-900 p-6 rounded-default">
					<span className="w-12 h-12 rounded-full bg-tertiary-800 inline-grid place-content-center">
						<img src={assets.icon_delivery} alt="" />
					</span>
					<div className="grid gap-2">
						<strong className="text-xl font-medium">
							Fast Delivery
						</strong>
						<p className="text-sm text-neutral-200">
							Live tracking from the kitchen to your doorstep.
							Know exactly when your food will arrive with real-
							time updates.
						</p>
					</div>
				</article>
				<article className="hover:shadow-2xl transition-shadow duration-350 cursor-pointer grid w-100 gap-4 bg-neutral-900 p-6 rounded-default">
					<span className="w-12 h-12 rounded-full bg-primary-50 inline-grid place-content-center">
						<img src={assets.icon_offers} alt="" />
					</span>
					<div className="grid gap-2">
						<strong className="text-xl font-medium">
							Exclusive Offers
						</strong>
						<p className="text-sm text-neutral-200">
							App-only discounts, secret menu items, and loyalty
							rewards. Earn points on every order to spend on
							future meals.
						</p>
					</div>
				</article>
			</div>
		</section>
	);
};
