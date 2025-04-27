import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getSubFromToken } from "../../auth/auth";
import { useEffect, useState } from "react";

const PrivateRouteForCurrentUser = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const params = useParams();
  const [currentUsername, setCurrentUsername] = useState(null);

  useEffect(() => {
    setCurrentUsername(getSubFromToken(token, navigate));
  }, [token, navigate]);

  return params.username === currentUsername ? (
    children
  ) : (
    <Navigate to="/not-found" />
  );
};

export default PrivateRouteForCurrentUser;
