import { food_list } from "../../assets/assets";
import Button from "../../components/Button/Button";
import "./Cart.css";

function Cart() {
  return (
    <main className="px-6 py-12">
      <h1 className="text-2xl pb-8 capitalize font-bold">your cart</h1>

      <div className="cart-container">
        <Table />
        <Aside />
      </div>
    </main>
  );
}

export default Cart;

const Table = () => {
  const foods_example = food_list.filter((x) => x._id in [1, 2, 3, 4, 5, 6, 7, 10]);
  const head_list = ["items", "title", "price", "quantity", "total", "remove"];
  return (
    <section className="bg-neutral-950 rounded-default overflow-hidden pb-4 h-min border border-neutral-600">
      <table className="w-full text-center m-auto">
        <thead>
          <tr className="uppercase text-primary-900 font-thin text-sm">
            {head_list.map((title) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {foods_example.map((food) => (
            <Item food={food} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

const Item = ({ food }) => {
  // eslint-disable-next-line react-hooks/purity
  const count = (Math.random() * 10).toFixed(0);

  return (
    <tr className="border-t border-t-neutral-800">
      <td className="py-4">
        <img
          className="w-16 h-16 object-cover object-center rounded-default m-auto"
          src={food.image}
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
          <span>{count}</span>
          <span className="cursor-pointer w-8 h-8 inline-grid place-content-center bg-primary-600 rounded-full transition-all hover:scale-125 hover:bg-primary-400">
            +
          </span>
        </div>
      </td>
      <td className="font-semibold">${food.price * count}</td>
      <td>
        <button>
          <svg className="cursor-pointer hover:bg-neutral-800 w-6 transition-colors h-6 rounded-full"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17.705 7.705l-1.41-1.41L12 10.59L7.705 6.295l-1.41 1.41L10.59 12l-4.295 4.295l1.41 1.41L12 13.41l4.295 4.295l1.41-1.41L13.41 12z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

const Aside = () => {
  return (
    <aside className="grid gap-6 place-self-start">
      <div className="bg-neutral-950 grid gap-8 rounded-default p-6 h-min">
        <h2 className="text-2xl capitalize font-semibold text-neutral-200">cart totals</h2>

        <div className="grid gap-6 text-md">
          <div className="flex justify-between border-b border-b-neutral-800 pb-2">
            <span>Subtotal</span>
            <span className="text-sm font-bold">$42.50</span>
          </div>
          <div className="flex justify-between border-b border-b-neutral-800 pb-2">
            <span>Delivery Fee</span>
            <span className="text-sm font-bold">$5.00</span>
          </div>
        </div>

      <div className="flex justify-between">
        <span className="text-xl font-bold">Total</span>
        <span className="text-2xl text-primary-600 font-semibold">$42.00</span>
      </div>

        <Button
          link={"/checkout"}
          className={"rounded-sm btn-primary uppercase inline-grid place-content-center h-12"}
        >
          proceed to checkout
        </Button>
      </div>

      <div className="bg-neutral-950 rounded-default p-6 grid gap-4 h-min">
        <em className="not-italic font-bold text-sm">If you have a promo code, Enter it here</em>
        <form className="flex gap-4" action="">
          <input className="h-10 bg-neutral-900 rounded-sm focus:bg-neutral-950 pl-4" type="text" name="promo" id="promo" placeholder="promo code" />
          <Button className="btn-inverted rounded-sm inline-grid place-content-center" type="submit">submit</Button>
        </form>
      </div>
    </aside>
  );
};
