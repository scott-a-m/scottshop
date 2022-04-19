import React from "react";
import { Link } from "react-router-dom";
import { FaRoad } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="full-page">
      <div className="flex items-center flex-col">
        <FaRoad className="text-[10rem] text-white " />
        <h1 className="text-center text-4xl font-heading text-white text-shadow-lg">
          Oops! This is a dead end. <br />
          Back to{" "}
          <Link className="link" to="/store">
            Shop
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
