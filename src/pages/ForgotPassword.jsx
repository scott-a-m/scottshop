import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import FormRow from "../components/FormRow";
import Message from "../components/Message";
import { useUserContext } from "../context/User_Context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { showMessage, message } = useUserContext();

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
    opacity: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
      opacity: 0.5,
    }));

    try {
      await axios.post(`/api/v1/auth/forgot-password`, { email });
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Submitted",
      }));
      setEmail("");
      showMessage(
        true,
        "success-msg",
        "Submitted. Please check your email for reset password link."
      );
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
        opacity: 1,
      }));
      setEmail("");
      if (err.response.data.msg)
        return showMessage(true, "error-msg", err.response.data.msg);

      showMessage(true, "error-msg", "Error: Please try again");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  return (
    <div>
      <div className="form-container">
        <div className="form-box">
          <h1 className="font-heading text-3xl p-4">Forgot Password</h1>
          {message.show && <Message />}
          <form onSubmit={handleSubmit}>
            <FormRow
              name="email"
              type="email"
              value={email}
              onChangeFunc={handleChange}
            />

            <button
              className="btn"
              disabled={btnStatus.disabled}
              type="submit"
              style={{ opacity: btnStatus.opacity }}
            >
              {btnStatus.text}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
