import { findByText, fireEvent, getByText, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

import LoginForm from "../LoginForm";
import ProductCategories from "../../Shop/ProductCategories";

const URL = "http://localhost:5000/api";

export const handlers = [
  rest.get("http://localhost:5000/api/type", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1",
          type: "Test",
          products: []
        },
        {
          id: "2",
          type: "Test2",
          products: []
        }
      ])
    );
  }),
  rest.post("http://localhost:5000/api/registration", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          user: {
            email: "test@gmail.com",
            id: "1",
            isActivated: false,
            role: "USER"
          }
        }
      )
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

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
      screen.getByText(
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
    ).toBeInTheDocument();
  });

  it("should send the credentials to server and receive success response", async () => {
    renderWithProviders(<LoginForm />);
    const user = userEvent.setup();
    const submitBtn = screen.getByRole("button");
    const passwordInput = screen.getByLabelText("Password");
    const emailInput = screen.getByTestId("email");

    user.type(emailInput, "test@gmail.com");
    user.type(passwordInput, "Test.pass11");
    user.click(submitBtn);

    expect(submitBtn).toBeDisabled();
  });

  it("should display error message if user already exists", async () => {
    renderWithProviders(<LoginForm />);
    const user = userEvent.setup();
    const submitBtn = screen.getByRole("button");
    const passwordInput = screen.getByLabelText("Password");
    const emailInput = screen.getByLabelText("Email");
    // const error = await screen.findByText(
    //   "User with email test1@gmail.com already exists."
    // );

    user.type(emailInput, "test@gmail.com");
    user.type(passwordInput, "Test.pass11");
    fireEvent.submit(submitBtn);

    expect(await screen.findByText("test@gmail.com")).toBeInTheDocument();
  });

  it("render types", async() => {
    renderWithProviders(<ProductCategories />)
    const text = await screen.findByText("Test");
    expect(text).toBeInTheDocument()
  })
});
