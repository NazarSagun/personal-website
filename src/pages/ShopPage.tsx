import ProductCategories from "../components/Shop/ProductCategories";
import ProductCards from "../components/Shop/ProductCards";
import Products from "../components/Shop/Products";

const ShopPage = () => {
  return (
    <>
      <ProductCards />
      <hr />
      <ProductCategories />
      <Products />
    </>
  )
}

export default ShopPage;