import "./Order.css";
import Button from '../../components/Button/Button';
import IconOrderProcessing from '../../assets/components/IconOrderProcessing';

function Order() {
	return (
		<main className="px-6 pb-12 pt-6">
			<header className="grid gap-1 mb-8">
				<h1 className="text-3xl capitalize font-semibold">my orders</h1>
				<p className="text-sm">Track, manage, and review your recent food deliveries.</p>
			</header>
			<section className="flex flex-col gap-4">
				<OrderItem />
				<OrderItem />
				<OrderItem />
			</section>
		</main>
	);
}

export default Order;

const OrderItem = () => {
	return (
		<article className="flex justify-between p-4 bg-neutral-950 items-center rounded-default">
			<div className="flex gap-4 items-center">
				<span className="w-16 h-16 bg-neutral-800 inline-grid place-content-center rounded-default">
					<IconOrderProcessing />
				</span>

				<div className="flex flex-col gap-1">
					<strong className="text-xl">
						Greek salad x 2, Margherita Pizza x 1, Garlic Bread x 1
					</strong>
					<span className="text-sm">Order #TM-8924 • $45.50 • 4 Items</span>
				</div>
			</div>
			<div className="flex gap-4 items-center">
				<span className="rounded-full bg-neutral-800 px-2 py-1 capitalize text-xs font-semibold">
					<span className="point before:bg-primary-600">food processing</span>
				</span>

				<Button
					className={"btn-outlined text-primary-600 border-primary-600 rounded-default hover:text-neutral-950 hover:bg-primary-600"}
					link={"#"}
				>
					track order
				</Button>
			</div>
		</article>
	);
};
