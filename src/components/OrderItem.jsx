import React, { useState } from "react";
import { formatPrice } from "../helpers";
import { useUserContext } from "../context/User_Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeDate } from "../helpers";

const OrderItem = ({
  orderItems,
  deliveryFee,
  subtotal,
  total,
  status,
  _id,
  setLoading,
  value,
  updatedAt,
}) => {
  const {
    initiateUserReview,
    user_reviews,
    user,
    getUserOrders,
    storeOrderSecret,
  } = useUserContext();
  const navigate = useNavigate();
  const [cancelWindow, setCancelWindow] = useState(false);

  const items = orderItems.reduce((total, item) => {
    total += item.amount;
    return total;
  }, 0);

  const checkReview = (productId) => {
    const productReview = user_reviews.filter(
      (item) => item.product._id === productId
    );
    if (productReview.length > 0) {
      return true;
    }
    return false;
  };

  const payNow = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/orders/${_id}`);
      storeOrderSecret({ secret: data.order.clientSecret, orderId: _id });
      setLoading(false);
      navigate("/store/checkout");
    } catch (error) {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/v1/orders/${_id}`, {
        cancelOrder: true,
      });
      setLoading(false);
      getUserOrders();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="text-center shadow-md rounded flex flex-col justify-between m-5 self-start h-[650px] overflow-scroll border-[1px] border-green-200">
      <div>
        <div className="py-1">
          <h1>
            <span className="font-bold">id:</span>
            {_id}
          </h1>
          <h1
            className={`py-1 ${
              value === "paid"
                ? "text-green-500"
                : value === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            } text-base xs:text-lg font-bold font-heading`}
          >
            {status}
          </h1>
        </div>
        <hr />
      </div>
      <div className="text-left">
        <div className="flex justify-between px-5">
          <div className="text-left">
            <p>Items</p>
            <p>Subtotal</p>
            <p>Delivery Fee</p>
            <hr />
            <p className="font-bold">Total</p>
            <hr />
          </div>
          <div className="text-right">
            <p>{items}</p>
            <p>{formatPrice(subtotal)}</p>
            <p>{formatPrice(deliveryFee)}</p>
            <hr />
            <p className="font-bold">{formatPrice(total)}</p>
            <hr />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-heading">Basket</h1>
        <hr />
      </div>
      <div
        className={`grid ${
          orderItems.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } justify-center items-center gap-4 p-4`}
      >
        {orderItems.map((item, index) => {
          const { name, image, price, amount, color, size, product } = item;

          return (
            <div key={index} className="grid grid-rows-[1fr_1fr_auto]">
              <div className="flex justify-center">
                <img
                  className="w-[120px] h-[160px] rounded-md"
                  src={image}
                  alt={name}
                ></img>
              </div>
              <div className="flex flex-col items-center justify-evenly">
                <p className="capitalize font-heading text-xl">{name}</p>
                <div className="flex items-center">
                  <button
                    className="w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500"
                    style={{ backgroundColor: color }}
                  ></button>
                  <p className="text-sm">{size}</p>
                </div>
                <div>
                  <p className="text-sm">{formatPrice(price)}</p>
                </div>
                <div>
                  <p className="text-sm">Quantity: {amount}</p>
                </div>
                <div>
                  <p className="text-sm">
                    Subtotal: {formatPrice(price * amount)}
                  </p>
                </div>
              </div>
              <div>
                {status === "paid" && (
                  <div>
                    {checkReview(product) ? (
                      <button className="btn-disabled">Reviewed</button>
                    ) : (
                      <button
                        className="btn-standard"
                        onClick={() => {
                          initiateUserReview(name, product, color, size, image);
                          navigate("/user/account/writereview");
                        }}
                      >
                        Write Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}{" "}
        {status === "pending" && !cancelWindow && (
          <div className="flex justify-between">
            <button className="btn-standard !w-[80px]" onClick={payNow}>
              Pay Now
            </button>
            <button
              className="btn-cancel !w-[80px]"
              onClick={() => setCancelWindow(true)}
            >
              Cancel
            </button>
          </div>
        )}
        {status === "pending" && cancelWindow && (
          <div className="flex justify-between items-center bg-red-500 rounded-md">
            <button
              className="bg-black text-white rounded-md p-2 m-2 transition-all duration-500 hover:bg-white hover:text-black !w-[80px]"
              onClick={cancelOrder}
            >
              Yes
            </button>
            <h2 className="text-white">Cancel Order?</h2>
            <button
              className="bg-yellow-400 text-white rounded-md p-2 m-2 transition-all duration-500 hover:bg-yellow-200 hover:text-black !w-[80px]"
              onClick={() => setCancelWindow(false)}
            >
              No
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between p-2 text-sm">
        <p>buyer: {user.name}</p>
        <p>{makeDate(updatedAt)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
