import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const Header = () => {
  const selector = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container align-center">
        <NavLink to="/" className="navbar-brand">
          Home
        </NavLink>
        <ul className="d-flex align-items-center navbar-nav flex-row">
          {!selector.isAuth && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link me-2" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {selector.isAuth && selector.status === "idle" && (
            <>
              <li className="nav-item me-2">
                <NavLink className="nav-link" to="/notes">
                  My Notes
                </NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/create">
                  Create
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={() => dispatch(logout())}
                  className="nav-link"
                  to="/"
                >
                  <button type="button" className="btn btn-outline-secondary">Logout</button>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
