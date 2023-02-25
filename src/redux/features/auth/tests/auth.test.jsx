import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { rootReducer } from "../../../app/store";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

import Header from "../../../../components/Header/Header";
import FormComponent from "../../../../components/AuthForm/FormComponent";
import AuthService from "../../../../services/AuthService";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("http://localhost:5000/api/login", (req, res, ctx) => {
    return res(ctx.json({ user: "test.test@gmail.com" }));
  }),
  rest.post("http://localhost:5000/api/registration", (req, res, ctx) => {
    return res(
      ctx.json(ctx.status(200), ctx.json({ user: "test.test@gmail.com" }))
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const store = configureStore({ reducer: rootReducer });

test("Login and Sigh Up buttons should be displayed when component is rendered", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Sign Up")).toBeInTheDocument();
});

describe("Form Component", () => {
  test("Login form button should be disabled if nothing was entered", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormComponent email="" password="" />
        </BrowserRouter>
      </Provider>
    );
    let submitBtn = screen.queryByTestId("submitBtn");

    expect(submitBtn).toBeDisabled();
  });

  test("Login form button should be enabled if entered values are valid", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormComponent
            email="test@gmail.com"
            password="Test.input11"
            isEmailValid={true}
          />
        </BrowserRouter>
      </Provider>
    );
    let btn = screen.queryByTestId("submitBtn");

    expect(btn).toBeEnabled();
  });

  test("Error message should be rendered after changed focus if email is invalid", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormComponent
            email="test@"
            password=""
            isEmailFocus={false}
            isEmailValid={false}
          />
        </BrowserRouter>
      </Provider>
    );
    const email = screen.getByLabelText("Email");
    const errorMessage = screen.queryByText(
      "Please, enter valid email address"
    );

    expect(email).toHaveValue("test@");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Success check should be rendered instead of error message after changed focus if email is valid", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormComponent
            email="test@gmail.com"
            password=""
            isEmailFocus={false}
            isEmailValid={true}
          />
        </BrowserRouter>
      </Provider>
    );
    const email = screen.getByLabelText("Email");
    const errorMessage = screen.queryByText(
      "Please, enter valid email address"
    );
    const successMessage = screen.queryByTestId("successCheck");

    expect(email).toHaveValue("test@gmail.com");
    expect(errorMessage).not.toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });

  test("Login form should be rendered if textBtn prop is Login", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormComponent form="Login" />
        </BrowserRouter>
      </Provider>
    );
    const submitBtn = screen.queryByTestId("submitBtn");

    expect(submitBtn).toBeInTheDocument();
  });

  test("Sign Up form should be rendered if textBtn prop is Sign Up", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormComponent form="Sign Up" />
        </BrowserRouter>
      </Provider>
    );
    const submitBtn = screen.queryByTestId("submitBtn");

    expect(submitBtn).toBeInTheDocument();
  });

  test("should allow user to login", async () => {
    const user = userEvent.setup();
    const submitMock = jest.fn();

    render(
      <Provider store={store}>
        <FormComponent
          form="Sign Up"
          email="test.test@gmail.com"
          password="Qwer.1234"
          disableBtn={false}
          isPasswordValid={true}
          isEmailValid={true}
          onSubmit={submitMock}
        />
      </Provider>
    );
    const submitBtn = screen.getByTestId("submitBtn");
    await user.click(submitBtn);
    expect(submitMock).toBeCalled();
    const response = await AuthService.login(
      "test.test@gmail.com",
      "Qwer.1234"
    );
    expect(response.data).toStrictEqual({ user: "test.test@gmail.com" });
  });

  it("shows error message after login if user not exists", async () => {
    const user = userEvent.setup();
    const submitMock = jest.fn();

    render(
      <Provider store={store}>
        <FormComponent
          form="Sign Up"
          email="test.test@gmail.com"
          password="Qwer.1234"
          disableBtn={false}
          isPasswordValid={true}
          isEmailValid={true}
          onSubmit={submitMock}
          status="rejected"
          message="There is no user with such email"
        />
      </Provider>
    );
    server.use(
      rest.post("http://localhost:5000/api/login", (req, res, ctx) => {
        return res(
          ctx.json({ message: "There is no user with such email", status: 400 })
        );
      })
    );
    const submitBtn = screen.getByTestId("submitBtn");
    const errorMessage = screen.queryByText("There is no user with such email");
    await user.click(submitBtn);
    expect(submitMock).toBeCalled();
    const response = await AuthService.login(
      "test.test@gmail.com",
      "Qwer.1234"
    );
    expect(response.data).toStrictEqual({
      message: "There is no user with such email",
      status: 400,
    });
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows error message after register if user exists", async () => {
    const user = userEvent.setup();
    const submitMock = jest.fn();

    render(
      <Provider store={store}>
        <FormComponent
          form="Register"
          email="test.test@gmail.com"
          password="Qwer.1234"
          disableBtn={false}
          isPasswordValid={true}
          isEmailValid={true}
          onSubmit={submitMock}
          status="rejected"
          message="User with email test.test@gmail.com already exists."
        />
      </Provider>
    );
    server.use(
      rest.post("http://localhost:5000/api/registration", (req, res, ctx) => {
        return res(
          ctx.json({
            message: "User with email test.test@gmail.com already exists.",
            status: 400,
          })
        );
      })
    );
    const submitBtn = screen.getByTestId("submitBtn");
    const errorMessage = screen.queryByText(
      "User with email test.test@gmail.com already exists."
    );
    await user.click(submitBtn);
    expect(submitMock).toBeCalled();
    const response = await AuthService.registration(
      "test.test@gmail.com",
      "Qwer.1234"
    );
    expect(response.data).toStrictEqual({
      message: "User with email test.test@gmail.com already exists.",
      status: 400,
    });
    expect(errorMessage).toBeInTheDocument();
  });
});
