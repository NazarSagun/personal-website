import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import Spinner from "../../utils/Spinner";

import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const { status, isAuth } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  const currentAmountOfProducts = cartItems.reduce((currentNumber, product) => {
    return currentNumber + product.productAmount;
  }, 0);

  const statusCondition =
    (!isAuth && status === "idle") || (!isAuth && status === "completed") || (!isAuth && status === "rejected");

  const loginStatusCondition =
    (!isAuth && status === "loading") || (isAuth && status === "loading");

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container align-center">
        <NavLink to="/" className="navbar-brand text-white">
          Home
        </NavLink>
        <ul className="d-flex align-items-center navbar-nav flex-row">
          {statusCondition && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link me-5 text-white" to="/shop">
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  data-testid="login"
                  className="nav-link me-2 text-white"
                  to="/login"
                >
                  LogIn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/register">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {isAuth && status === "completed" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link me-5 text-white" to="/shop">
                  Shop
                </NavLink>
              </li>
              {/* <li className="nav-item me-2">
                <NavLink className="nav-link text-white" to="/notes">
                  My Notes
                </NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link text-white" to="/create">
                  Create
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  onClick={() => dispatch(logout())}
                  className="nav-link text-white"
                  to="/"
                >
                  <button
                    data-testid="logoutBtn"
                    type="button"
                    className="btn btn-outline-secondary text-white"
                  >
                    Logout
                  </button>
                </NavLink>
              </li>
              <li data-testid="cartBtn" className="nav-item ms-5">
                <NavLink className="nav-link text-white" to="/cart">
                  <TiShoppingCart size="1.4em" />
                  <span data-testid="cartItemsAmount" className="ms-1">{currentAmountOfProducts}</span>
                </NavLink>
              </li>
            </>
          )}
          {loginStatusCondition && <Spinner />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
