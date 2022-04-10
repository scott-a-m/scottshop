import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/User_Context";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user_loading, user_error, user } = useUserContext();

  if (user_loading) return <Loading />;

  if (user_error) return <Navigate to="/" />;

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};
export default ProtectedRoute;
