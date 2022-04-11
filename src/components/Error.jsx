import React from "react";
import { Link } from "react-router-dom";
import { ImConfused } from "react-icons/im";
const Error = () => {
  return (
    <div className="full-page">
      <div className="flex items-center flex-col">
        <h1 className="text-center text-4xl font-heading text-white text-shadow-lg">
          Oops! an error occured. <br />
          Take me{" "}
          <Link className="link" to="/">
            home
          </Link>
        </h1>
        <ImConfused className="text-[10rem] text-white inline-block my-4" />
      </div>
    </div>
  );
};

export default Error;
