import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import Message from "../components/Message";
import { useUserContext } from "../context/User_Context";

const Login = () => {
  const { showMessage, message, user, getUser, go_to_checkout } =
    useUserContext();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Login",
    disabled: false,
    opacity: 1,
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      text: "loading",
      disabled: true,
      opacity: 0.5,
    }));

    try {
      await axios.post(`/api/v1/auth/login`, loginData);
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      showMessage(true, "success-msg", "Login successful. Loading...");
      getUser();
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "login",
        disabled: false,
        opacity: 1,
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

  // useEffect(() => {
  //   if (user) {
  //     if (go_to_checkout) {
  //       return navigate("/store/checkout");
  //     }
  //     return navigate("/");
  //   }
  // }, [navigate, user]);

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
              Please login to proceed to checkout
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
            <button className="btn" disabled={btnStatus.disabled} type="submit">
              {btnStatus.text}
            </button>
            <p>
              Don't have an account, please{" "}
              <Link to="/register" className="text-link">
                register
              </Link>
              .
              <br />
              Forgot your password, please{" "}
              <Link to="/user/forgot-password" className="text-link">
                reset password
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
