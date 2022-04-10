import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = new URLSearchParams(useLocation().search);

  const verifyUserToken = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      return verifyUserToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="form-wrapper">
        <div className="form-box">
          <h1>Verify Email</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-wrapper">
        ={" "}
        <div className="form-box">
          <h1>Verify Email</h1>
          <p>Ooops, an error occured, please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-box">
        <h1>Verify Email</h1>
        <p>Account Verified!</p>
        <Link to="/login" className="text-link">
          Please login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
