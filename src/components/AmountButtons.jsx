import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({ amount, increase, decrease }) => {
  return (
    <div className="text-center">
      <div className="grid grid-cols-3 justify-items-center items-center p-2">
        <button type="button" onClick={decrease} className="mx-4">
          <FaMinus />
        </button>
        <h2 className="font-heading text-xl">{amount}</h2>
        <button type="button" onClick={increase} className="mx-4">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default AmountButtons;
