import { useEffect, useCallback, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { getTypes, getTypedProducts } from "../../redux/features/shop/shopSlice";
import Spinner from "../../utils/Spinner";

const ProductCategories = () => {
  const dispatch = useAppDispatch();
  const { typeStatus, types } = useAppSelector((state) => state.shop);

  const getFilteredItems = useCallback(
    async( type: string) => {
    
      dispatch(getTypedProducts(type))
    }, [dispatch])

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  useLayoutEffect(() => {
    window.scrollTo(scrollX, scrollY);
  });

  return (
    <nav className="container navbar navbar-expand-sm bg-transparent mt-3 mb-3 p-0">
      <div className="d-flex container">
        <ul className="navbar-nav">
          {typeStatus === "completed" &&
            types.map((type) => (
              <li
                role="button"
                className="nav-item nav-link active font-monospace"
                onClick={() => getFilteredItems(type.type)}
                key={type.id}
              >
                {type.type}
              </li>
            ))}
          {typeStatus === "loading" && <Spinner />}
        </ul>
        <div>qwe</div>
      </div>
    </nav>
  );
};

export default ProductCategories;
