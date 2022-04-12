import React from "react";
import AmountButtons from "./AmountButtons";
import { formatPrice } from "../helpers";
import { FaTrash } from "react-icons/fa";
import { useStoreContext } from "../context/Store_Context";
import { Link } from "react-router-dom";

const BasketItem = ({
  id,
  image,
  productId,
  name,
  description,
  price,
  amount,
  color,
  size,
}) => {
  const { removeItem, toggleAmount } = useStoreContext();

  const increase = () => {
    toggleAmount("inc", id);
  };
  const decrease = () => {
    toggleAmount("dec", id);
  };

  return (
    <div>
      <hr />
      <div className="grid sm:grid-cols-[200px_200px_auto] py-4 items-center justify-evenly gap-4 text-center">
        <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[120px_80px] gap-4">
          <Link to={`/store/${productId}`}>
            <img
              className="w-full sm:h-[160px] h-[130px] rounded-md"
              src={image}
              alt={name}
            ></img>
          </Link>
          <div className="grid grid-rows-2 sm:flex sm:flex-col justify-evenly items-center sm:justify-evenly">
            <div className="flex sm:flex-col items-center justify-between">
              <p className="capitalize font-heading text-xl">{name}</p>
              <div className="flex items-center">
                <button
                  className="cursor-default w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500"
                  style={{ backgroundColor: color }}
                ></button>
                <p className="text-sm">{size}</p>
              </div>
              <div>
                <p className="text-sm">{formatPrice(price)}</p>
              </div>
            </div>
            <div className="sm:hidden flex items-center justify-center">
              <AmountButtons
                amount={amount}
                increase={increase}
                decrease={decrease}
              />

              <div className="sm:hidden w-[20px]">
                <button onClick={() => removeItem(id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="sm: hidden">
              <p>{formatPrice(price * amount)}</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-center justify-center">
          <AmountButtons
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
          <p>{formatPrice(price * amount)}</p>
        </div>
        <div className="hidden sm:block">
          <button onClick={() => removeItem(id)}>
            <FaTrash />
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default BasketItem;
