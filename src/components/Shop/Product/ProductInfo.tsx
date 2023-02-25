import { FC, ChangeEvent } from "react";

import {IImage, IDetail, ISize} from "../../../http/models/IProduct";
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai";
import { useAppDispatch } from "../../../redux/app/hooks";
import { addProductToCart } from "../../../redux/features/shop/shopSlice";

interface ProductProps {
  id: string;
  type: string;
  name: string;
  price: string;
  description: string;
  availableAmount: number;
  productAmount: number;
  images: IImage[];
  details: IDetail[] | [];
  sizes: ISize[] | [];
  size: string;
  increaseItem: () => void;
  decreaseItem: () => void;
  onChangeSize: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductInfo: FC<ProductProps> = ({
  name,
  description,
  price,
  availableAmount,
  productAmount,
  details,
  sizes,
  images,
  id,
  increaseItem,
  decreaseItem,
  onChangeSize,
  size
}) => {

  const dispatch = useAppDispatch();

  const addToCartHandler = () => {

    dispatch(addProductToCart({
      id,
      name,
      productAmount,
      price,
      size,
      availableAmount,
      images,
      description,
      details
    }))
  }

  return (
    <div className="d-flex flex-column">
      <h1 className="fs-3">{name}</h1>
      <div>
        <span className="fs-5 font-monospace bg-dark text-white px-2">
          {price}$
        </span>
      </div>
      <p className="my-2">{description}</p>
      <div className="mb-auto d-flex flex-column">
        {details.map((detail) => (
          <span className="fs-6 text-muted" key={detail._id}>
            {detail.detail}
          </span>
        ))}
      </div>
      <div>
        <p className="mb-0 mt-2">Sizes</p>
        {sizes.map((size) => (
          <div
            key={size._id}
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={size._id}
              autoComplete="off"
              value={size.size}
              onChange={onChangeSize}
              
            />
            <label
              className="py-0 px-2 me-1 btn btn-dark rounded-0"
              htmlFor={size._id}
            >
              {size.size}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <AiFillMinusCircle onClick={decreaseItem} size="1.5em" style={{cursor: "pointer"}} />
        <span style={{userSelect: "none"}} className="mx-2">{productAmount}</span>
        <AiFillPlusCircle onClick={increaseItem} size="1.5em" style={{cursor: "pointer"}} />
        
      </div>
      <div className="mt-3">
        <button
          onClick={addToCartHandler}
          type="button"
          className="btn-sm-size font-weight-bold text-uppercase btn btn-sm btn-dark"
        >
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
