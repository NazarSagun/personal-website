import { useState } from "react";

interface UseFormResult {
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  password: string;
  setPassword: (value: string) => void;
  passwordError: string;
  isEmailValid: boolean;
  isPasswordValid: boolean;
}

export const useForm = (): UseFormResult => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value) ||
      !/\d/.test(value)
    ) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const isEmailValid = !emailError;
  const isPasswordValid = !passwordError;

  return {
    email,
    setEmail: (value: string) => {
      setEmail(value);
      validateEmail(value);
    },
    emailError,
    password,
    setPassword: (value: string) => {
      setPassword(value);
      validatePassword(value);
    },
    passwordError,
    isEmailValid,
    isPasswordValid,
  };
};
