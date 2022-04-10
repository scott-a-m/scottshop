import React from "react";
import { IoShirt } from "react-icons/io5";
const Loading = () => {
  return (
    <div className="full-page">
      <div className="flex items-center flex-col">
        <h1 className="text-center text-4xl font-heading pb-12 text-white text-shadow-lg">
          Loading
        </h1>
        <IoShirt className="text-white animate-bounce text-[8rem] " />
      </div>
    </div>
  );
};

export default Loading;
