import { useEffect, FC, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { getProduct } from "../../../redux/features/shop/shopSlice";
import Spinner from "../../../utils/Spinner";
import ProductCategories from "../ProductCategories";
import Products from "../Products";
import ProductInfo from "./ProductInfo";
import ProductSlider from "./ProductSlider";

const Product: FC = () => {
  const [productAmount, setProductAmount] = useState(1);
  const [size, setSize] = useState("");

  const dispatch = useAppDispatch();
  const { product, productStatus } = useAppSelector((state) => state.shop);
  const { isAuth } = useAppSelector((state) => state.auth);
  const { name, amount, description, sizes, price, type, details, id, images } =
    product;
  const params = useParams();

  useEffect(() => {
    let id: any = params.id;
    dispatch(getProduct(id));
  }, [dispatch, params.id]);

  const increaseHandler = () => {
    if (productAmount === amount) {
      return;
    }
    setProductAmount((prevState) => prevState + 1);
  };

  const decreaseHandler = () => {
    if (productAmount <= 0) {
      return;
    }
    setProductAmount((prevState) => prevState - 1);
  };

  const changeSizeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  return (
    <div className="container-sm mt-3 px-0">
      <div className="row row-cols-2 mb-3">
        {productStatus === "loading" && <Spinner />}
        {productStatus === "completed" && (
          <ProductSlider images={product.images} />
        )}
        {productStatus === "completed" && (
          <ProductInfo
            name={name}
            availableAmount={amount}
            description={description}
            sizes={sizes}
            price={price}
            type={type}
            details={details}
            id={id}
            images={images}
            productAmount={productAmount}
            increaseItem={increaseHandler}
            decreaseItem={decreaseHandler}
            onChangeSize={changeSizeHandler}
            size={size}
            isAuth={isAuth}
          />
        )}
      </div>
      <hr />
      <ProductCategories />
      <Products />
    </div>
  );
};

export default Product;
