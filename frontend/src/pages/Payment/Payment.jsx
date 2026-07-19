import "./Payment.css";
import Button, { BtnGoBack } from "../../components/Button/Button";
import IconDish from '../../assets/components/IconDish';
import IconLock from '../../assets/components/IconLock';
import {useContext} from "react";
import CartContext from "../../contexts/CartContext/CartContext.js";


function Payment() {
	return (
		<main className="payment-container">
			<OrderSummary />
			<FormPayment />
		</main>
	);
}

export default Payment;


const OrderSummary = () => {
	const {Cart, Total, extra} = useContext(CartContext);
	return (
		<section className="border-r border-r-neutral-600 p-8 flex flex-col justify-between gap-12 bg-neutral-800 w-full">
			<BtnGoBack to={"/checkout"}>Back</BtnGoBack>
			<div className="grid gap-8">
				<div className="flex justify-between items-center">
					<div className="grid">
						<h1 className="text-2xl font-bold">Tomato</h1>
						<span className="text-sm text-primary-900">order summary</span>
					</div>
					<div className="w-12 h-12 rounded-full bg-primary-400 inline-grid place-content-center">
						<IconDish />
					</div>
				</div>

				<div className="grid gap-4 max-h-50 overflow-y-auto scrollbar-hidden">
					{Cart.map(f => (
						<Order food={f} />
					))}
				</div>

				<div className="py-6 border-y border-y-neutral-700 grid gap-4">
					<div className="flex justify-between">
						<span className="text-md text-primary-950 capitalize">subtotal</span>
						<span className="text-sm text-primary-950 font-semibold">${Total.toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-md text-primary-950 capitalize">delivery charge</span>
						<span className="text-sm text-primary-950 font-semibold">${Total > 0 ? extra.deliveryFee.toFixed(2) : (0).toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-md text-primary-950 capitalize">taxes</span>
						<span className="text-sm text-primary-950 font-semibold">${Total > 0 ? extra.taxes.toFixed(2) : (0).toFixed(2)}</span>
					</div>
				</div>

			</div>

			<footer>
				<div className="flex justify-between items-center">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-semibold">${Total > 0
						? (Total + extra.deliveryFee + extra.taxes).toFixed(2)
						: (0).toFixed(2)
					}</span>
				</div>
			</footer>
		</section>
	);
};


const Order = ({ food }) => {
	return (
		<article className="flex justify-between">
			<div className="flex gap-4 items-center">
				<img
					className="w-12 h-12 rounded-default object-cover"
					src={`/src/assets/images/foods/${food.image}`}
					alt={food.name}
				/>
				<div className="grid gap-1">
					<strong className="text-lg font-semibold">{food.name}</strong>
					<span className="text-xs text-primary-900">Qty: {food.quantity}</span>
				</div>
			</div>
			<span className="text-sm font-semibold">${food.price}</span>
		</article>
	);
};


const FormPayment = () => {
	const {Total, extra} = useContext(CartContext);

	return (
		<section className="p-8 flex flex-col gap-12 bg-neutral-950 w-full">
			<h2 className="text-2xl font-medium">Pay with card</h2>

			<form className="grid justify-between gap-8" action="">
				<label className={"form-field"} htmlFor="email">
					<span>Email</span>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="customer@example.com"
					/>
				</label>
				<label className={"card-field"} htmlFor="card-number">
					<span>Card information</span>
					<div className="card-grid border rounded-default overflow-hidden">
						<input className="col-span-2 bg-transparent border-b"
							type="number"
							name="card-number"
							id="card-number"
							placeholder="Card number"
						/>
						<input className="bg-transparent border-r"
							type="month"
							name="expired-in"
							id="expired-in"
							placeholder="MM / YYYY"
						/>
						<input className="bg-transparent"
							type="number"
							name="cvc"
							id="cvc"
							placeholder="CVC"
							max={999}
						/>
					</div>
				</label>
				<label className={"form-field"} htmlFor="card-name">
					<span>Name on card</span>
					<input
						type="text"
						name="card-name"
						id="card-name"
						placeholder="Name on card"
					/>
				</label>
				<label className={"form-field"} htmlFor="card-country">
					<span>Country or region</span>
					<input
						type="text"
						name="card-country"
						id="card-country"
						placeholder="United States"
					/>
				</label>

				<Button link={"/"} className={"bg-tertiary-500 rounded-default inline-flex m-0 gap-2 items-center justify-center text-neutral-950 h-12 font-bold w-full"}>
					<IconLock />
					<span>Pay</span>
					<span>${Total > 0
						? (Total + extra.deliveryFee + extra.taxes).toFixed(2)
						: (0).toFixed(2)
					}</span>
				</Button>
				<a className="text-center -mt-4 text-sm" href="https://stripe.com" target={"_blank"}>Powered by <span className="font-bold text-tertiary-400">stripe</span></a>
			</form>
		</section>
	);
};
