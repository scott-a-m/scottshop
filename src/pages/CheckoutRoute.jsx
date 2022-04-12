import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User_Context";
import Loading from "../components/Loading";
import { useStoreContext } from "../context/Store_Context";

const CheckoutRoute = ({ children }) => {
  const { user_loading, user_error, user, single_order_secret } =
    useUserContext();
  const { products_loading, basket } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (basket.length < 1 && !single_order_secret) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user_loading || products_loading) return <Loading />;

  if (user_error) return <Navigate to="/" />;

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};
export default CheckoutRoute;
