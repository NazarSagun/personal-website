import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";

import Header from "../Header";
import { setAuthState } from "../../../utils/setAuth";

describe("check the Header component", () => {
  // shop: {
  //   products: [],
  //   product: {},
  //   types: [],
  //   typeStatus: "idle",
  //   productsStatus: "idle",
  //   productStatus: "idle",
  //   productsMessage: "",
  //   cartTotalAmount: 0,
  //   cartItems: []
  // }

  it("renders Home text, LogIn and Sign Up buttons if user not authenticated", async () => {
    renderWithProviders(<Header />, {
      preloadedState: setAuthState(false, "idle"),
    });
    const logoText = screen.getByText("Home");
    const loginBtn = screen.getByText("LogIn");
    const signupBtn = screen.queryByText("Sign Up");
    expect(logoText).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
  });

  it("should show the cart button with 0 items if user authenticated and cart is empty", async () => {
    renderWithProviders(<Header />, {
      preloadedState: setAuthState(true, "completed"),
    });
    const cartBtn = screen.queryByTestId("cartBtn");
    const cartItemsAmount = screen.queryByTestId("cartItemsAmount");
    expect(cartItemsAmount).toHaveTextContent("0");
    expect(cartBtn).toBeInTheDocument();
  });

  it("not renders Logout button if user authenticated", async () => {
    renderWithProviders(<Header />, {
      preloadedState: setAuthState(false, "idle"),
    });
    const logoutBtn = screen.queryByText("Logout");
    expect(logoutBtn).not.toBeInTheDocument();
  });

  it("should show the spinner if state is loading", async () => {
    renderWithProviders(<Header />, {
      preloadedState: setAuthState(false, "loading"),
    });

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should not show the spinner if status is completed or idle", async () => {
    renderWithProviders(<Header />, {
      preloadedState: setAuthState(true, "completed"),
    });

    const spinner = screen.queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();
  });
});
