import { FC, FormEvent } from "react";

import { useNavigate } from "react-router-dom";
import { registration } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";

import { useForm } from "../../helpers/useForm";
import FormInput from "./FormInput";

export type InputCondition = boolean | null;

const AuthForm: FC = () => {
  const {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    isEmailValid,
    isPasswordValid,
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { status, message, user } = useAppSelector((status) => status.auth);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    dispatch(registration({ email, password }));
    if (status === "completed") {
      // navigate("/");
      setEmail("");
      setPassword("");
    }
    
    
  };

  const disableBtn =
    status === "loading" || email === "" || password === "" || (!isEmailValid && !isPasswordValid);

  return (
    <form className="container-sm" noValidate onSubmit={submitHandler}>
      <h1 className="mt-5">Login Form</h1>
      <FormInput
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
        required={true}
        errorMessage={emailError}
      />
      <FormInput
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        required={true}
        errorMessage={passwordError}
      />
      <button
          disabled={disableBtn}
          className="btn btn-primary"
          aria-disabled={disableBtn}
        >
          Login
        </button>
        {status === "rejected" && (
          <div className="alert alert-danger mt-2 p-2">{message}</div>
        )}
        {user && <div>{user.email}</div>}
    </form>
  );
};

export default AuthForm;
