import React, { useEffect, useState } from "react";
import { useStoreContext } from "../context/Store_Context";
import { formatPrice } from "../helpers";
import SingleProduct from "../pages/SingleProduct";
import ReviewStars from "./ReviewStars";
import { makeDate } from "../helpers";
import { useUserContext } from "../context/User_Context";

const ReviewItem = ({
  rating,
  title,
  comment,
  product,
  size,
  _id,
  image,
  color,
  updatedAt,
}) => {
  const { user } = useUserContext();

  return (
    <div className="text-center shadow-md rounded flex flex-col justify-between m-5 self-start h-[400px] overflow-scroll border-[1px] border-green-200">
      <div>
        <div className="flex justify-between px-5 items-center">
          <div className="flex items-center">
            <h1 className="p-3 text-green-500 text-2xl font-bold font-heading">
              {product.name}
            </h1>
            <button
              className="w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500 cursor-default"
              style={{ backgroundColor: color }}
            ></button>
            <p className="text-sm">{size}</p>
          </div>

          <ReviewStars stars={rating} />
        </div>
        <hr />
      </div>
      <div>
        <h1 className="font-heading text-xl py-2">{title}</h1>
        <h1 className="py-2">{comment}</h1>
        <div></div>
      </div>
      <div className="flex justify-center py-4">
        <img
          className="w-[120px] h-[160px] rounded-md"
          src={image}
          alt={product.name}
        ></img>
      </div>
      <div className="flex justify-between p-2 text-sm">
        <p>buyer: {user.name}</p>
        <p>{makeDate(updatedAt)}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
