import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useUserContext } from "../context/User_Context";
import Message from "../components/Message";

const Register = () => {
  const { showMessage, message, user } = useUserContext();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Register",
    disabled: false,
    opacity: 1,
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setbtnStatus({
      text: "Processing",
      disabled: true,
      opacity: 0.5,
    });

    if (registerData.name.length < 3) {
      showMessage(
        true,
        "error-msg",
        "please make sure username has three or more characters"
      );
      setbtnStatus({
        text: "Register",
        disabled: false,
        opacity: 1,
      });
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      return;
    }

    if (registerData.password.length < 6) {
      showMessage(
        true,
        "error-msg",
        "please make sure password has six or more characters"
      );
      setbtnStatus({
        text: "Register",
        disabled: false,
        opacity: 1,
      });
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      return;
    }

    try {
      await axios.post(`/api/v1/auth/register`, registerData);
      showMessage(
        true,
        "success-msg",
        "Success, please check Email for verification link"
      );
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      setbtnStatus((btnData) => ({
        opacity: 0.5,
        text: "Submitted",
        disabled: true,
      }));
    } catch (err) {
      setbtnStatus((btnData) => ({
        opacity: 1,
        text: "Register",
        disabled: false,
      }));
      setRegisterData(() => ({
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
    setRegisterData((regData) => ({
      ...regData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  return (
    <div>
      <div className="form-container">
        <div className="form-box">
          <h1 className="font-heading text-3xl p-4">Register</h1>
          {message.show && <Message />}
          <form className="" onSubmit={handleRegister}>
            <FormRow
              name="name"
              type="text"
              value={registerData.name}
              onChangeFunc={handleChange}
            />
            <FormRow
              name="email"
              type="email"
              value={registerData.email}
              onChangeFunc={handleChange}
            />
            <FormRow
              name="password"
              type="password"
              value={registerData.password}
              onChangeFunc={handleChange}
            />
            <button
              className="btn-standard !w-[100px] !my-4 sm:!my-6"
              disabled={btnStatus.disabled}
              style={{ opacity: btnStatus.opacity }}
            >
              {btnStatus.text}
            </button>
            <p className="text-sm sm:text-base">
              Already have an account? Please{" "}
              <Link to="/login" className="text-link">
                login
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
