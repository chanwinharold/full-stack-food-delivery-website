import "./Order.css";
import Button from '../../components/Button/Button';
import IconOrderProcessing from '../../assets/components/IconOrderProcessing';
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext.js";
import {getOrders} from "../../services/orders.js";

function Order() {
	const {auth} = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!auth) return;

		const fetchOrders = async () => {
			setLoading(true);
			try {
				const response = await getOrders();
				if (response.data) {
					setOrders(response.data);
				}
			} catch (err) {
				console.error("Failed to fetch orders:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [auth]);

	if (loading) {
		return (
			<main className="px-6 pb-12 pt-6">
				<header className="grid gap-1 mb-8">
					<h1 className="text-3xl capitalize font-semibold">my orders</h1>
					<p className="text-sm">Track, manage, and review your recent food deliveries.</p>
				</header>
				<section className="flex flex-col gap-4">
					{[1, 2, 3].map(i => (
						<article key={i} className="flex justify-between p-4 bg-neutral-950 items-center rounded-default animate-pulse">
							<div className="flex gap-4 items-center">
								<span className="w-16 h-16 bg-neutral-800 inline-grid place-content-center rounded-default"></span>
								<div className="flex flex-col gap-2">
									<div className="h-5 bg-neutral-800 rounded w-64"></div>
									<div className="h-3 bg-neutral-800 rounded w-48"></div>
								</div>
							</div>
						</article>
					))}
				</section>
			</main>
		);
	}

	return (
		<main className="px-6 pb-12 pt-6">
			<header className="grid gap-1 mb-8">
				<h1 className="text-3xl capitalize font-semibold">my orders</h1>
				<p className="text-sm">Track, manage, and review your recent food deliveries.</p>
			</header>
			<section className="flex flex-col gap-4">
				{orders.length === 0 ? (
					<div className="text-center py-12 text-neutral-400">
						<p className="text-lg mb-4">No orders yet</p>
						<Button link="/menu" className="btn-primary rounded-default">
							Browse Menu
						</Button>
					</div>
				) : (
					orders.map(order => (
						<OrderItem key={order.id} order={order} />
					))
				)}
			</section>
		</main>
	);
}

export default Order;

const OrderItem = ({ order }) => {
	const itemNames = order.items.map(item => `${item.dish_name} x ${item.quantity}`).join(", ");
	const total = (order.total + 5 + 4).toFixed(2);

	return (
		<article className="flex justify-between p-4 bg-neutral-950 items-center rounded-default">
			<div className="flex gap-4 items-center">
				<span className="w-16 h-16 bg-neutral-800 inline-grid place-content-center rounded-default">
					<IconOrderProcessing />
				</span>

				<div className="flex flex-col gap-1">
					<strong className="text-xl">
						{itemNames}
					</strong>
					<span className="text-sm">
						Order #{String(order.id).padStart(4, "0")} &bull; ${total} &bull; {order.item_count} Items
					</span>
				</div>
			</div>
			<div className="flex gap-4 items-center">
				<span className="rounded-full bg-neutral-800 px-2 py-1 capitalize text-xs font-semibold">
					<span className="point before:bg-primary-600">food processing</span>
				</span>
			</div>
		</article>
	);
};
