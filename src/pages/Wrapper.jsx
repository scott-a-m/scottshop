import React from "react";
import { useGeneralContext } from "../context/General_Context";
import { useStoreContext } from "../context/Store_Context";
import Loading from "../components/Loading";

const Wrapper = ({ children }) => {
  const { loading } = useGeneralContext();
  const { products_loading } = useStoreContext;

  if (loading) return <Loading />;

  if (products_loading) return <Loading />;

  return <>{children}</>;
};

export default Wrapper;
