import React, { useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  errorMessage?: string;
}

const FormInput = ({
  label,
  value,
  onChange,
  type,
  required,
  errorMessage,
}: InputProps) => {

  const [touched, setTouched] = useState<null | boolean>(null)

  const showError = touched === false && errorMessage !== "";

  return (
    <div className="mb-3 mt-5">
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <div className="d-flex align-items-center">
        <input
          type={type}
          value={value}
          aria-label={label}
          onChange={(e) => {
            onChange(e.target.value);
            setTouched(true);
          }}
          onBlur={() => setTouched(false)}
          required={required}
          id={label}
          className="form-control me-2"
          aria-describedby="emailHelp"
          data-testid={type}
        />
        {!showError && touched === false && (
          <AiOutlineCheck data-testid="successCheck" size={20} color="green" />
        )}
      </div>
      {showError && (
        <div data-testid="emailWarning" aria-details="warning message" className="alert alert-danger mt-2 p-2">{errorMessage}</div>
      )}

      {label === "Email" && (
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      )}
    </div>
  );
};

export default FormInput;
