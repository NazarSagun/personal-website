import { useEffect, ReactNode, FC } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { useNavigate } from "react-router-dom";

const ProtectedRouteAuth: FC<any> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      console.log(isAuth)
      navigate("/notes");
    }
  }, [isAuth, navigate]);

  
  return children;
};

export default ProtectedRouteAuth;
