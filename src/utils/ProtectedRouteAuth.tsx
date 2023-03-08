import { useEffect, ReactNode, FC } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { useNavigate } from "react-router-dom";

const ProtectedRouteAuth: FC<any> = ({ children }) => {
  const { isAuth, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      // navigate("/notes");
    }
  }, [isAuth, navigate, status]);

  
  return children;
};

export default ProtectedRouteAuth;
