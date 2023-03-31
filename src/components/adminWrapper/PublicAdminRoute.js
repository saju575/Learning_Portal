import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../../hooks/useAdminAuth";

const PublicAdminRoute = ({ children }) => {
  const isAdminLoggedIn = useAdminAuth();
  return !isAdminLoggedIn ? children : <Navigate to={`/admin/dashboard`} />;
};

export default PublicAdminRoute;
