import { FC } from "react";
import "./Cart.css";

import { IImage, IDetail } from "../../../http/models/IProduct";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { useAppDispatch } from "../../../redux/app/hooks";
import {
  addProductToCart,
  decreaseProductAmount,
  removeProduct
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
    dispatch(decreaseProductAmount({ id: cartItem.id, size: cartItem.size }));
  };

  const removeProductHandler = () => {
    dispatch(removeProduct({id: cartItem.id, size: cartItem.size}))
  }

  return (
    <>
      <section
        style={{ userSelect: "none" }}
        id="cart-section"
        className="d-flex justify-content-between align-items-center position-relative"
      >
        <div className="d-flex cart-media-block">
          <img
            className="w-25 rounded me-4"
            src={url + cartItem.images[0].img}
            alt={cartItem.name}
          />
          <div className="d-flex flex-column justify-content-center">
            <span className="fw-bold">{cartItem.name}</span>
            <span>Clothing size</span>
            <div>
              <span className="d-inline-block fw-bold py-1 px-2 bg-white mt-1">
                {cartItem.size}
              </span>
            </div>
          </div>
        </div>
        <div className="cart-media-block">
          <div className="d-flex align-items-center me-5">
            <div className="d-flex flex-column align-items-center me-5">
              <span>Amount:</span>
              <div className="d-flex align-items-center">
                <AiFillMinusCircle
                  onClick={decreaseHandler}
                  size="2.2em"
                  style={{ cursor: "pointer" }}
                />
                <span className="mx-3">{cartItem.productAmount}</span>
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
            <AiOutlineClose
              onClick={removeProductHandler}
              className="position-absolute top-0 end-0 cart-cross"
              size="1.2em"
              color="tomato"
            />
          </div>
        </div>
      </section>
      <hr />
    </>
  );
};

export default CartItem;
