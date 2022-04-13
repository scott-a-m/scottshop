import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/User_Context";
import Loading from "../components/Loading";
import { useStoreContext } from "../context/Store_Context";

const ProtectedRoute = ({ children }) => {
  const { user_loading, user_error, user, orders_loading, reviews_loading } =
    useUserContext();
  const { products_loading } = useStoreContext();

  if (user_loading || products_loading || orders_loading || reviews_loading)
    return <Loading />;

  if (user_error) return <Navigate to="/" />;

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};
export default ProtectedRoute;
