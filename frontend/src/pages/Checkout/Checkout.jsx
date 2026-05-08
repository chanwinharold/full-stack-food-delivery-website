import "./Checkout.css";
import Button from "../../components/Button/Button";

function Checkout() {
  return (
    <main className="px-6 pb-12 pt-6 w-full">
      <a className="inline-flex gap-2 pb-8 items-center" href="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-left-icon lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span className="text-sm">Back to Cart</span>
      </a>

      <h1 className="text-4xl pb-8 capitalize font-bold">Checkout</h1>

      <div className="cart-container">
        <Delivery />
        <Aside />
      </div>
    </main>
  );
}

export default Checkout;

const Delivery = () => {
  return (
    <form className="grid gap-6 bg-neutral-950 p-8 rounded-default">
      <h2 className="text-2xl font-semibold capitalize">delivery information</h2>

      <div className="grid-form">
        <label className="form-field" htmlFor="first-name">
          <span>First name</span>
          <input type="text" name="first name" id="first-name" placeholder="John" />
        </label>
        <label className={"form-field"} htmlFor="last-name">
          <span>Last name</span>
          <input type="text" name="last name" id="last-name" placeholder="Doe" />
        </label>
        <label className={"form-field"} htmlFor="email">
          <span>Email address</span>
          <input type="email" name="email" id="email" placeholder="john.doe@example.com" />
        </label>
        <label className={"form-field"} htmlFor="phone">
          <span>Phone number</span>
          <input type="tel" name="phone" id="phone" placeholder="(555) 123-4567-890" />
        </label>
        <label className={"form-field col-span-2"} htmlFor="street">
          <span>Street address</span>
          <input type="text" name="street-address" id="street" placeholder="123 Main St" />
        </label>
        <label className={"form-field"} htmlFor="city">
          <span>City</span>
          <input type="text" name="city" id="city" placeholder="Anytown" />
        </label>
        <label className={"form-field"} htmlFor="state">
          <span>State / Province</span>
          <input type="text" name="state" id="state" placeholder="CA" />
        </label>
        <label className={"form-field"} htmlFor="postal-code">
          <span>Zip / Postal code</span>
          <input type="number" name="postal-code" id="postal-code" placeholder="12345" />
        </label>
        <label className={"form-field"} htmlFor="country">
          <span>Country</span>
          <input type="text" name="country" id="country" placeholder="United States" />
        </label>
      </div>
    </form>
  );
};

const Aside = () => {
  return (
    <aside className="w-full grid gap-6 place-self-start">
      <div className="bg-neutral-950 grid gap-8 rounded-default p-6 h-min">
        <h2 className="text-2xl font-semibold capitalize">
          cart totals
        </h2>

        <div className="grid gap-6 text-md">
          <div className="flex justify-between border-b border-b-neutral-800 pb-2">
            <span>Subtotal</span>
            <span className="text-sm font-bold">$42.50</span>
          </div>
          <div className="flex justify-between border-b border-b-neutral-800 pb-2">
            <span>Delivery Fee</span>
            <span className="text-sm font-bold">$5.00</span>
          </div>
          <div className="flex justify-between border-b border-b-neutral-800 pb-2">
            <span>Taxes</span>
            <span className="text-sm font-bold">$4.00</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl text-primary-600 font-semibold">
            $42.00
          </span>
        </div>

        <Button
          link={"/payment"}
          className={"rounded-sm btn-primary capitalize inline-flex justify-center items-center gap-2 h-12"}
        >
          <span>proceed to payment</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Button>
        <span className="text-primary-800 text-xs inline-flex items-center justify-center gap-1 -mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
            Secure encrypted checkout
        </span>
      </div>
    </aside>
  );
};
