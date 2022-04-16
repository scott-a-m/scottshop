import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import { useStoreContext } from "../context/Store_Context";
import { useUserContext } from "../context/User_Context";
import { formatPrice } from "../helpers";
import axios from "axios";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { ImSpinner3 } from "react-icons/im";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

const CheckoutForm = () => {
  const { basket, deliveryFee, clearBasket } = useStoreContext();
  const { user, single_order_secret, removeOrderSecret, getUserOrders } =
    useUserContext();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [total, setTotal] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/orders", {
        basket,
        deliveryFee,
      });
      if (!data.clientSecret) {
        setCheckoutError(true);
      }
      setClientSecret(data.clientSecret);
      setTotal(data.order.total);
      setOrderId(data.order._id);
      getUserOrders();
      clearBasket();
      setLoading(false);
    } catch (error) {
      setCheckoutError(true);
      setLoading(false);
    }
  };
  const reactivatePaymentIntent = async (stripeClientSecret, orderId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/orders/${orderId}`);
      setClientSecret(stripeClientSecret);
      setTotal(data.order.total);
      setOrderId(orderId);
      removeOrderSecret();
      clearBasket();
      setLoading(false);
    } catch (error) {
      setCheckoutError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (single_order_secret) {
      return reactivatePaymentIntent(
        single_order_secret.secret,
        single_order_secret.orderId
      );
    }
    return createPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      try {
        await axios.patch(`/api/v1/orders/${orderId}`, {
          paymentIntentId: payload.paymentIntent.id,
        });
        setError(null);
        getUserOrders();
      } catch (error) {
        setError(
          "Payment was successful but an error occured in our order system; it will be rectified shortly."
        );
      }
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        navigate("/user/account");
      }, 5000);
    }
  };

  if (checkoutError) return <Error />;

  if (loading) return <Loading />;

  return (
    <div className="form-container">
      <div className="form-box">
        <h1 className="font-heading text-3xl py-1 md:py-3">Scott Shop</h1>
        {succeeded ? (
          <article>
            <h4>
              Thank you,{" "}
              <span className="capitalize font-bold">{user && user.name}</span>.
            </h4>
            <h4>Your payment was successful</h4>
            <div className="flex items-center justify-center gap-1">
              <h4>Redirecting to your account portal</h4>
              <ImSpinner3 className="animate-spin text-xl" />
            </div>
          </article>
        ) : (
          <article>
            <p className="py-2">
              Hello,{" "}
              <span className="capitalize font-bold">{user && user.name}</span>.
              Your total for order <span className="text-sm">#{orderId}</span>{" "}
              is{" "}
              <span className="font-bold">{total && formatPrice(total)}</span>
            </p>
            <p className="py-1 md:py-2 pb-3 md:pb-6 text-sm">
              Scott Shop was built as a personal coding project.
              <span className="font-bold">Do not use a real card number</span>.
              Use the test card number below. Choose any future expiry date, CVC
              and ZIP no. Payments are processed by{" "}
              <a
                href="https://stripe.com/"
                target="_blank"
                className="link"
                rel="noreferrer"
              >
                Stripe
              </a>
              .
            </p>
            <p className="py-1 bg-green-100 italic">
              Test Card Number: 4242 4242 4242 4242
            </p>
          </article>
        )}
        <form
          id="payment-form"
          onSubmit={handleSubmit}
          className="mt-4 md:mt-8"
        >
          <CardElement
            id="card-element"
            onChange={handleChange}
            className="bg-white py-4 rounded-md shadow-lg"
          />

          <button
            disabled={processing || disabled || succeeded}
            id="submit"
            className={`mt-6 bg-white rounded-md p-2 m-2 transition-all duration-500 w-1/2 ${
              processing || disabled || succeeded
                ? "opacity-50"
                : "hover:bg-green-400 hover:text-white"
            }`}
          >
            <span id="button-text">
              {processing ? "Processing" : succeeded ? "Paid" : "Pay"}
            </span>
          </button>
          {error && (
            <div role="alert" className="text-red-600">
              {error}
            </div>
          )}
          {succeeded && (
            <p className="text-green-500 p-1 bg-white rounded-md mt-4">
              Payment Successful
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <div>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
