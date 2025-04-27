import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return isAuthenticated(token) ? (
    children
  ) : (
    <Navigate to="/not-authenticated" />
  );
};

export default PrivateRoute;
