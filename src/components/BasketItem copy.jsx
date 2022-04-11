import React from "react";
import AmountButtons from "./AmountButtons";
import { formatPrice } from "../helpers";
import { FaTrash } from "react-icons/fa";
import { useStoreContext } from "../context/Store_Context";

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
      <div className="grid xs:grid-cols-[200px_200px_auto] py-4 items-center justify-evenly gap-4 text-center">
        <div className="grid grid-cols-[90px_1fr] xs:grid-cols-[120px_80px] gap-4">
          <img
            className="w-full xs:h-[160px] h-[150px] rounded-md"
            src={image}
            alt={name}
          ></img>
          <div className="grid grid-rows-2 xs:flex xs:flex-col justify-center items-center xs:justify-evenly">
            <div className="flex xs:flex-col items-center justify-evenly">
              <p className="capitalize font-heading text-xl">{name}</p>
              <div className="flex items-center">
                <button
                  className="w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500"
                  style={{ backgroundColor: color }}
                ></button>
                <p className="text-sm">{size}</p>
              </div>
              <div>
                <p className="text-sm">{formatPrice(price)}</p>
              </div>
            </div>
            <div className="xs:hidden flex xs:flex-col items-center justify-center">
              <AmountButtons
                amount={amount}
                increase={increase}
                decrease={decrease}
              />
              <p>{formatPrice(price * amount)}</p>
            </div>
            <div className="xs:hidden">
              <button onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden xs:flex flex-col items-center justify-center">
          <AmountButtons
            amount={amount}
            increase={increase}
            decrease={decrease}
          />
          <p>{formatPrice(price * amount)}</p>
        </div>
        <div className="hidden xs:block">
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
