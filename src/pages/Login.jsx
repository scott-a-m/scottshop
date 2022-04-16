import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import Message from "../components/Message";
import { useUserContext } from "../context/User_Context";

const Login = () => {
  const {
    showMessage,
    message,
    user,
    getUser,
    go_to_checkout,
    setGoToCheckout,
  } = useUserContext();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Login",
    disabled: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      text: "loading",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/auth/login`, loginData);
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      getUser();
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "login",
        disabled: false,
      }));
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));

      if (err.response.data.msg)
        return showMessage(true, "error-msg", err.response.data.msg);

      return showMessage(
        true,
        "error-msg",
        "Ooops, an error occured, please try again"
      );
    }
  };

  const handleChange = (e) => {
    setLoginData((regData) => ({
      ...regData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      if (go_to_checkout) {
        setGoToCheckout(false);
        return navigate("/store/checkout");
      }
      return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  return (
    <div>
      <div className="form-container">
        <div className="form-box">
          <h1 className="font-heading text-3xl p-4">Login</h1>
          {message.show && <Message />}
          {go_to_checkout && (
            <p className="py-2 mb-2 bg-green-500 text-white rounded-md">
              Please first login before checking out
            </p>
          )}
          <form onSubmit={handleLogin}>
            <FormRow
              name="email"
              type="email"
              value={loginData.email}
              onChangeFunc={handleChange}
            />
            <FormRow
              name="password"
              type="password"
              value={loginData.password}
              onChangeFunc={handleChange}
            />
            <button
              className={`!w-[100px] !my-4 sm:!my-6 ${
                btnStatus.disabled ? "btn-disabled" : "btn-standard"
              }`}
              disabled={btnStatus.disabled}
              type="submit"
            >
              {btnStatus.text}
            </button>
            <p className="text-sm sm:text-base">
              Don't have an account? Please{" "}
              <Link to="/register" className="text-link">
                register
              </Link>
              .
              <br />
              Forgot your password?{" "}
              <Link to="/user/forgot-password" className="text-link">
                Reset password
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
