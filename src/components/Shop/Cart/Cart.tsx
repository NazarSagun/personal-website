import { TiShoppingCart } from "react-icons/ti";

import { useAppSelector } from "../../../redux/app/hooks";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, cartTotalAmount } = useAppSelector((state) => state.shop);

  return (
    <div className="container-sm">
      <section className="d-flex flex-column py-4">
        <h5 className="fw-bold">Total Price:</h5>
        <div className="d-flex">
          <span className="fs-2 fw-bold">{cartTotalAmount}$</span>
          <button disabled={cartItems.length === 0} className="btn btn-dark py-0 fs-5 font-monospace rounded-3 ms-5">
            Make an Order <TiShoppingCart />
          </button>
        </div>
      </section>
      <hr />
      <hr />
      {cartItems.map((item) => (
        <CartItem
          key={Math.random().toString()}
          cartItem={item}
        />
      ))}
    </div>
  );
};

export default Cart;
