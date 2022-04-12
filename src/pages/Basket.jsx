import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBasket3 } from "react-icons/bs";
import { useStoreContext } from "../context/Store_Context";
import BasketItem from "../components/BasketItem";
import { formatPrice } from "../helpers";
import { useUserContext } from "../context/User_Context";
import { FaTrash } from "react-icons/fa";

const Basket = () => {
  const { basket, basket_total, basket_items, deliveryFee, clearBasket } =
    useStoreContext();
  const { setGoToCheckout, user } = useUserContext();
  const navigate = useNavigate();

  const checkout = () => {
    if (user) {
      navigate("/store/checkout");
    } else {
      setGoToCheckout(true);
      navigate("/login");
    }
  };

  if (basket.length < 1) {
    return (
      <div className="full-page">
        <div className="flex items-center flex-col">
          <h1 className="text-center text-4xl font-heading text-white text-shadow-lg">
            Looks like your basket is empty.
          </h1>
          <BsBasket3 className="text-[10rem] text-white inline-block my-8" />
          <button className="link text-white font-heading text-shadow-lg">
            <Link to="/store" className="text-3xl">
              Let's Shop
            </Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex !items-center flex-col-reverse md:grid lg:grid-cols-[1fr_500px] mt-20 mx-5 md:mx-20 md:grid-cols-[1fr_300px] !justify-center text-center relative">
        <div>
          <div>
            {basket.map((item) => (
              <BasketItem key={item.id} {...item} />
            ))}
          </div>
          <div className="flex justify-center my-5 text-sm">
            <button
              onClick={() => clearBasket()}
              className="flex items-center gap-2 p-2 rounded-md bg-red-500 text-white transition-all duration-500 hover:bg-red-700"
            >
              Clear Basket <FaTrash />
            </button>
          </div>
        </div>
        <div className="bg-white text-center w-full shadow-xl shadow-green-200 h-60 md:m-4 rounded flex flex-col justify-between self-start sticky top-12 md:top-20">
          <div>
            <h1 className="font-heading text-2xl py-3">Order Summary</h1>
            <hr />
          </div>
          <div className="flex justify-between lg:px-20 px-5">
            <div className="text-left">
              <p>Items</p>
              <p>Subtotal</p>
              <p>Delivery Fee</p>
              <hr />
              <p className="font-bold">Total</p>
            </div>
            <div className="text-right">
              <p>{basket_items}</p>
              <p>{formatPrice(basket_total)}</p>
              <p>{formatPrice(deliveryFee)}</p>
              <hr />
              <p className="font-bold">
                {formatPrice(deliveryFee + basket_total)}
              </p>
            </div>
          </div>
          <div>
            <button className="btn-standard" onClick={checkout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
