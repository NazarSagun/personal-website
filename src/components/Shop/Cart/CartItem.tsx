import { FC } from "react";

import { IImage, IDetail } from "../../../http/models/IProduct";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useAppDispatch } from "../../../redux/app/hooks";
import {
  addProductToCart,
  removeProduct,
} from "../../../redux/features/shop/shopSlice";

interface CartItemProps {
  cartItem: {
    id: string;
    name: string;
    productAmount: number;
    price: string;
    size: string;
    availableAmount: number;
    images: IImage[];
    description: string;
    details: IDetail[];
  };
}

const url = "http://localhost:5000/";

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch();

  const increaseHandler = () => {
    if (cartItem.availableAmount === cartItem.productAmount) {
      return;
    }
    dispatch(addProductToCart({ ...cartItem, productAmount: 1 }));
  };

  const decreaseHandler = () => {
    if (cartItem.productAmount <= 0) {
      return;
    }
    dispatch(removeProduct({id: cartItem.id, size: cartItem.size}));
  };

  return (
    <section
      style={{ userSelect: "none" }}
      className="d-flex justify-content-between align-items-center"
    >
      <div>
        <img
          className="w-25 rounded"
          src={url + cartItem.images[0].img}
          alt={cartItem.name}
        />
        <span className="fw-bold ms-4">{cartItem.name} - size: {cartItem.size}</span>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column align-items-center me-5">
            <span>Amount:</span>
            <div>
              <AiFillMinusCircle
                onClick={decreaseHandler}
                size="2.2em"
                style={{ cursor: "pointer" }}
              />
              <span className="mx-4">{cartItem.productAmount}</span>
              <AiFillPlusCircle
                onClick={increaseHandler}
                size="2.2em"
                style={{ cursor: "pointer" }}
              />
            </div>
            <span style={{ fontSize: "0.9em" }} className="mt-1 text-muted">
              price per 1 un
            </span>
            <span>{cartItem.price}$</span>
          </div>
          <span className="fs-2">
            {+cartItem.price * cartItem.productAmount}$
          </span>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
