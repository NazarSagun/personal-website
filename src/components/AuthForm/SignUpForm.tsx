import { FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { login } from "../../redux/features/auth/authSlice";
import FormInput from "./FormInput";

import { useNavigate } from "react-router";

import { useForm } from "../../helpers/useForm";

const FormComponent: FC = () => {

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

  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((status) => status.auth);
  const navigate = useNavigate();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    dispatch(login({ email, password }));
    
    if (status === "completed") {
      navigate("/");
      setEmail("");
      setPassword("");
    } 
  };

  const disableBtn =
    status === "loading" || email === "" || password === "" || (!isEmailValid && !isPasswordValid);

  return (
    <form className="container-sm" noValidate onSubmit={submitHandler}>
      <h1 className="mt-5">Sign Up Form</h1>
      <FormInput
        label="Email"
        value={email}
        onChange={setEmail}
        type="text"
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
          data-testid="submitBtn"
        >
          Sign Up
        </button>
        {status === "rejected" && (
          <div className="alert alert-danger mt-2 p-2">{message}</div>
        )}
    </form>
  );
};

export default FormComponent;
