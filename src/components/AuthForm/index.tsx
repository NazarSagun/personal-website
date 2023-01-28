import { FC, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { login, registration } from "../../redux/features/auth/authSlice";
import FormComponent from "./FormComponent";
import { useNavigate } from "react-router-dom";

const validator = require("validator");

export type InputCondition = boolean | null;
type AuthProp = {form: string};

const AuthForm: FC<AuthProp> = ({form}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<InputCondition>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<InputCondition>(null);
  const [isEmailFocus, setIsEmailFocus] = useState<InputCondition>(null);
  const [isPasswordFocus, setIsPasswordFocus] = useState<InputCondition>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {status, message} = useAppSelector(status => status.auth);

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
    if(form === "login") {
      dispatch(login({ email, password }));
    } else if(form === "register") {
      dispatch(registration({ email, password }));
      if(status === "idle") {
        navigate("/")
      }
    }
    setIsPasswordValid(true);
    setIsEmailValid(true);
    setEmail("");
    setPassword("");
  };

  return (
    <FormComponent
      email={email}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={submitHandler}
      onEmailFocus={onEmailFocus}
      onEmailBlur={onEmailBlur}
      onPasswordFocus={onPasswordFocus}
      onPasswordBlur={onPasswordBlur}
      isEmailValid={isEmailValid}
      isEmailFocus={isEmailFocus}
      isPasswordValid={isPasswordValid}
      isPasswordFocus={isPasswordFocus}
      btnText={form === "login" ? "Login" : "Register"}
      status={status}
      message={message}
    />
  );
};

export default AuthForm;
