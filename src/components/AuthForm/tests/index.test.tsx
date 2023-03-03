import { getByText, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

import LoginForm from "../LoginForm"; 

describe("Login form functionality", () => {
  it("should render login form component", () => {
    renderWithProviders(<LoginForm />);
    const loginLabel = screen.getByText("Login Form");
    expect(loginLabel).toBeInTheDocument();
  });

  test("Submit button should be disabled if input fields are invalid or empty", () => {
    renderWithProviders(<LoginForm />);
    const submitBtn = screen.getByRole("button");

    expect(submitBtn).toBeDisabled();
  });

  it("should show the error message if email or password format is invalid", async () => {
    renderWithProviders(<LoginForm />);
    const user = userEvent.setup();
    const emailInput = screen.getByTestId("email");

    await user.type(emailInput, "email");
    await user.tab();

    expect(emailInput).toHaveValue("email");
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });
  it("should show a 'Password must be at least 8 characters' warning message if user entered less then 8 characters", async () => {
    renderWithProviders(<LoginForm />);
    const user = userEvent.setup();
    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "123");
    await user.tab();

    expect(passwordInput).toHaveValue("123");
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });

  it("should show a another warning message if user entered then 8 characters without uppercase letter or number", async () => {
    renderWithProviders(<LoginForm />);
    const user = userEvent.setup();
    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "testpassword123");
    await user.tab();

    expect(passwordInput).toHaveValue("testpassword123");
    expect(
      screen.getByText("Password must contain at least one lowercase letter, one uppercase letter, and one number")
    ).toBeInTheDocument();
  });
});
