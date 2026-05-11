import "./Order.css";
import Button from '../../components/Button/Button';

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
					<svg
						width="23"
						height="23"
						viewBox="0 0 23 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.75 8.4375L11.25 7.1875L13.75 8.4375V2.5H8.75V8.4375ZM5 17.5V15H11.25V17.5H5ZM2.5 22.5C1.8125 22.5 1.22396 22.2552 0.734375 21.7656C0.244792 21.276 0 20.6875 0 20V2.5C0 1.8125 0.244792 1.22396 0.734375 0.734375C1.22396 0.244792 1.8125 0 2.5 0H20C20.6875 0 21.276 0.244792 21.7656 0.734375C22.2552 1.22396 22.5 1.8125 22.5 2.5V20C22.5 20.6875 22.2552 21.276 21.7656 21.7656C21.276 22.2552 20.6875 22.5 20 22.5H2.5ZM2.5 2.5V20V2.5ZM2.5 20H20V2.5H16.25V12.5L11.25 10L6.25 12.5V2.5H2.5V20Z"
							fill="#AB3500"
						/>
					</svg>
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
