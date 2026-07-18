import IconClose from "../../assets/components/IconClose";
import Button from "../../components/Button/Button";
import "./Cart.css";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../contexts/CartContext/CartContext.js";


function Cart() {
	const [total, setTotal] = useState(0);

	return (
		<main className="px-6 py-12">
			<h1 className="text-2xl pb-8 capitalize font-bold">your cart</h1>

			<div className="cart-container">
				<Table states={{setTotal}} />
				<Aside states={{total}} />
			</div>
		</main>
	);
}

export default Cart;

const Table = ({states}) => {
	const {setTotal} = states;
	const {Cart} = useContext(CartContext);

	useEffect(() => {
		let total = 0;
		Cart.forEach(c => {
			total += c.price * c.quantity;
		})
		setTotal(total)
	}, [Cart, setTotal]);

	const head_list = [
		"items",
		"title",
		"price",
		"quantity",
		"total",
		"remove",
	];

	return (
		<section className="bg-neutral-950 rounded-default overflow-hidden pb-4 h-min border border-neutral-600">
			<table className="w-full text-center m-auto">
				<thead>
				<tr className="uppercase text-primary-900 font-thin text-sm">
					{head_list.map((title, index) => (
						<th key={index}>{title}</th>
					))}
				</tr>
				</thead>
				<tbody>
				{Cart.length > 0 && Cart.map(cartItem => (
					<Item key={cartItem.id} food={cartItem} />
				))}
				</tbody>
			</table>
		</section>
	);
};

const Item = ({ food }) => {

	return (
		<tr className="border-t border-t-neutral-800">
			<td className="py-4">
				<img
					className="w-16 h-16 object-cover object-center rounded-default m-auto"
					src={`/src/assets/images/foods/${food.image}`}
					alt=""
				/>
			</td>
			<td>
				<strong>{food.name}</strong>
			</td>
			<td className="text-primary-900">${food.price}</td>
			<td>
				<div className="w-30 flex justify-between items-center m-auto">
					<span className="cursor-pointer w-8 h-8 inline-grid place-content-center bg-neutral-800 rounded-full transition-all hover:scale-125 hover:bg-neutral-900">
						-
					</span>
					<span>{food.quantity}</span>
					<span className="cursor-pointer w-8 h-8 inline-grid place-content-center bg-primary-600 rounded-full transition-all hover:scale-125 hover:bg-primary-400">
						+
					</span>
				</div>
			</td>
			<td className="font-semibold">${food.price * food.quantity}</td>
			<td>
				<button>
					<IconClose />
				</button>
			</td>
		</tr>
	);
};

const Aside = ({states}) => {
	const {total} = states;
	const deliveryFee = total > 0 ? 5 : 0;

	return (
		<aside className="grid gap-6 place-self-start">
			<div className="bg-neutral-950 grid gap-8 rounded-default p-6 h-min">
				<h2 className="text-2xl capitalize font-semibold text-neutral-200">
					cart totals
				</h2>

				<div className="grid gap-6 text-md">
					<div className="flex justify-between border-b border-b-neutral-800 pb-2">
						<span>Subtotal</span>
						<span className="text-sm font-bold">{total.toFixed(2)}</span>
					</div>
					<div className="flex justify-between border-b border-b-neutral-800 pb-2">
						<span>Delivery Fee</span>
						<span className="text-sm font-bold">{deliveryFee.toFixed(2)}</span>
					</div>
				</div>

				<div className="flex justify-between">
					<span className="text-xl font-bold">Total</span>
					<span className="text-2xl text-primary-600 font-semibold">
						{`$${(total + deliveryFee).toFixed(2)}`}
					</span>
				</div>

				<Button
					link={"/checkout"}
					className={
						"rounded-sm btn-primary uppercase inline-grid place-content-center h-12"
					}
				>
					proceed to checkout
				</Button>
			</div>

			<div className="bg-neutral-950 rounded-default p-6 grid gap-4 h-min">
				<em className="not-italic font-bold text-sm">
					If you have a promo code, Enter it here
				</em>
				<form className="flex gap-4" action="">
					<input
						className="h-10 bg-neutral-900 rounded-sm focus:bg-neutral-950 pl-4"
						type="text"
						name="promo"
						id="promo"
						placeholder="promo code"
					/>
					<Button
						className="btn-inverted rounded-sm inline-grid place-content-center"
						type="submit"
					>
						submit
					</Button>
				</form>
			</div>
		</aside>
	);
};
