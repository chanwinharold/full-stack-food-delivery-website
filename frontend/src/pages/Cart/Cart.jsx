import { assets } from "../../assets/assets";
import Button from "../../components/Button/Button"
import "./Cart.css"


function Cart() {
  return (
    <main className="px-6">
      <h1 className="py-8 text-2xl capitalize font-bold">your cart</h1>
      <div className="cart-container">
        <section className="bg-neutral-950">
          <table className="w-full">
            <thead className="w-full flex justify-between px-4">
              <th>items</th>
              <th>title</th>
              <th>price</th>
              <th>quantity</th>
              <th>total</th>
              <th>remove</th>
            </thead>
            <tbody>
              {
                <tr>
                  <td>
                    <img className="w-20 h-20 object-cover object-center rounded-default" src={assets.food_32} alt="" />
                  </td>
                  <td>
                    <strong>Greek Salad</strong>
                  </td>
                  <td>$12.00</td>
                  <td>
                    <div className="w-30 flex justify-between items-center">
                      <span className="cursor-pointer w-8 h-8 inline-grid place-content-center bg-neutral-800 rounded-full transition-all hover:scale-125 hover:bg-neutral-900">-</span>
                      <span>2</span>
                      <span className="cursor-pointer w-8 h-8 inline-grid place-content-center bg-primary-600 rounded-full transition-all hover:scale-125 hover:bg-primary-400">+</span>
                    </div>
                  </td>
                  <td>$24.00</td>
                  <td>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" > <path fill="currentColor" d="m17.705 7.705l-1.41-1.41L12 10.59L7.705 6.295l-1.41 1.41L10.59 12l-4.295 4.295l1.41 1.41L12 13.41l4.295 4.295l1.41-1.41L13.41 12z" /></svg>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </section>

        <aside className="bg-neutral-950">
            <div>
              <h2>cart totals</h2>

              <div>
                <div>
                  <span>Subtotal</span>
                  <span>$42.50</span>
                </div>
                <div>
                  <span>Delivery Fee</span>
                  <span>$5.00</span>
                </div>
              </div>
              <Button link={"/checkout"} className={"rounded-sm btn-primary uppercase py-3"}>proceed to checkout</Button>
            </div>
            <div>

            </div>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
