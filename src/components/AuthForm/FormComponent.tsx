import { FC, FormEvent, ChangeEvent, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { InputCondition } from "./";
import { useLocation, useNavigate } from "react-router-dom";

import { login, registration } from "../../redux/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";

const validator = require("validator");

interface FormProps {
  form: string
}

const FormComponent: FC<FormProps> = ({form}) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<InputCondition>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<InputCondition>(null);
  const [isEmailFocus, setIsEmailFocus] = useState<InputCondition>(null);
  const [isPasswordFocus, setIsPasswordFocus] = useState<InputCondition>(null);

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((status) => status.auth);

  const onEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onEmailFocus = () => {
    setIsEmailFocus(true);
    setIsEmailValid(null);
  };
  const onPasswordFocus = () => {
    setIsPasswordFocus(true);
    setIsPasswordValid(null);
  };
  const onEmailBlur = () => {
    setIsEmailFocus(false);
    if (validator.isEmail(email)) {
      setIsEmailValid(true);
      return;
    }
    setIsEmailValid(false);
  };
  const onPasswordBlur = () => {
    setIsPasswordFocus(false);
    if (validator.isStrongPassword(password)) {
      setIsPasswordValid(true);
      return;
    }
    setIsPasswordValid(false);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailV = validator.isEmail(email);
    const passwordV = validator.isStrongPassword(password);

    if (!emailV || !passwordV) {
      setIsPasswordValid(false);
      setIsEmailValid(false);

      return;
    }
    if (pathname === "/login") {
      dispatch(login({ email, password }));
    } else if (pathname === "/register") {
      dispatch(registration({ email, password }));
      if (status === "completed") {
        navigate("/");
      }
    }
    setIsPasswordValid(true);
    setIsEmailValid(true);
    setEmail("");
    setPassword("");
  };









  const disableBtn = status === "loading" || email === "" || password === "" || !isEmailValid;

  return (
    <form noValidate onSubmit={submitHandler}>
      
      <div className="container-sm mt-5">
      <h1>{form} Form</h1>
        <div className="mb-3 mt-5">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="d-flex align-items-center">
            <input
              onChange={onEmailChange}
              onFocus={onEmailFocus}
              onBlur={onEmailBlur}
              value={email}
              type="email"
              id="email"
              className="form-control me-2"
              aria-describedby="emailHelp"
            />
            {isEmailValid && isEmailFocus === false && (
              <AiOutlineCheck data-testid="successCheck" size={20} color="green" />
            )}
          </div>
          {!isEmailValid && isEmailFocus === false && (
            <div className="alert alert-danger mt-2 p-2">
              Please, enter valid email address
            </div>
          )}

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="d-flex align-items-center">
            <input
              onBlur={onPasswordBlur}
              onFocus={onPasswordFocus}
              value={password}
              onChange={onPasswordChange}
              type="password"
              className="form-control me-2"
              id="password"
            />
            {isPasswordValid && isPasswordFocus === false && (
              <AiOutlineCheck size={20} color="green" />
            )}
          </div>
          {!isPasswordValid && isPasswordFocus === false && (
            <div className="alert alert-danger mt-2 p-2">
              Valid password must include 8 characters, 1 lowercase and
              uppercase letter, 1 symbol
            </div>
          )}
        </div>

        <button
          disabled={disableBtn && true}
          className="btn btn-primary"
          data-testid="submitBtn"
        >
          {form}
        </button>
        {status === "rejected" && (
          <div className="alert alert-danger mt-2 p-2">{message}</div>
        )}
      </div>
    </form>
  );
};

export default FormComponent;
