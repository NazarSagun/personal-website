import { useEffect } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { useNavigate } from "react-router-dom";

const ProtectedRouteNotes = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  
  return children;
};

export default ProtectedRouteNotes;
