import { FC } from "react";
import FormComponent from "./FormComponent";
import { useLocation } from "react-router-dom";

export type InputCondition = boolean | null;

const AuthForm: FC = () => {
  
  const {pathname} = useLocation(); 

  return (
    <div>
      {pathname === "/login" && (
        <FormComponent form="Login" />
      )}
      {pathname === "/register" && (
        <FormComponent form="Sign Up" />
      )}
    </div>
  );
};

export default AuthForm;
