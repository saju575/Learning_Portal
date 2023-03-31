import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";

const PrivateAdminRoute = ({ children }) => {
  const isLoggedIn = useAdminAuth();

  return isLoggedIn ? children : <Navigate to="/admin" />;
};

export default PrivateAdminRoute;
