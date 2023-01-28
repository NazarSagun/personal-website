import { FC, FormEvent, ChangeEvent } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { InputCondition } from "./";

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type FormProps = {
  onSubmit: (e: SubmitEvent) => void;
  onEmailChange: (e: InputEvent) => void;
  onPasswordChange: (e: InputEvent) => void;
  onEmailFocus: () => void;
  onEmailBlur: () => void;
  onPasswordFocus: () => void;
  onPasswordBlur: () => void;
  email: string;
  password: string;
  isEmailFocus: InputCondition;
  isPasswordFocus: InputCondition;
  isEmailValid: InputCondition;
  isPasswordValid: InputCondition;
  btnText: string;
  status: string;
  message: string;
};

const FormComponent: FC<FormProps> = ({
  isPasswordFocus,
  onPasswordFocus,
  onPasswordBlur,
  isEmailValid,
  isPasswordValid,
  isEmailFocus,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  email,
  password,
  onEmailFocus,
  onEmailBlur,
  btnText,
  status,
  message,
}) => {

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="container-sm mt-5">
        <div className="mb-3">
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
              className="form-control me-2"
              id="email"
              aria-describedby="emailHelp"
            />
            {isEmailValid && isEmailFocus === false && (
              <AiOutlineCheck size={20} color="green" />
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
          disabled={status === "pending" && true}
          className="btn btn-primary"
        >
          {btnText}
        </button>
        {status === "rejected" && (
          <div className="alert alert-danger mt-2 p-2">{message}</div>
        )}
      </div>
    </form>
  );
};

export default FormComponent;
