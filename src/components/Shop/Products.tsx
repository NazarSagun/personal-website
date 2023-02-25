import ProductItem from "./ProductItem";
import { useEffect, useCallback, useRef } from "react";
import { getProducts } from "../../redux/features/shop/shopSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import Spinner from "../../utils/Spinner";

const Products = () => {
  const dispatch = useAppDispatch();
  const {products, productsStatus, productsMessage} = useAppSelector((state) => state.shop);

  let mounted: any = useRef(null);

  const fetchProducts = useCallback(() => {
    dispatch(getProducts());
  }, [dispatch])

  

  useEffect(() => {
    mounted.current = true;
    fetchProducts()
    

    return () => {
      mounted.current = false
    }
  }, [fetchProducts]);

  const loading = productsStatus === "loading";
  const rejected = productsStatus === "rejected";

  return (
    <div className="container-sm">
      <div className={`d-flex flex-wrap ${loading || rejected ? "justify-content-center" : null}`}>
        {productsStatus === "completed" &&
          products.map((item) => (
            <ProductItem
              key={item.id}
              name={item.name}
              price={item.price}
              image={item.images[0]}
              id={item.id}
            />
            
          ))}
        {productsStatus === "loading" && (
          <Spinner />
        )}
        {productsStatus === "rejected" && (
          <div className="alert alert-danger" role="alert">
            {productsMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
