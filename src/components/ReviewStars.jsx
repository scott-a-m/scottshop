import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const ReviewStars = ({ reviews, stars }) => {
  const numberOfStars = Array.from({ length: 5 }, (_, index) => {
    const fullNumber = index + 1;
    const halfNumber = index + 0.5;
    return (
      <span key={index} className="text-yellow-500">
        {stars >= fullNumber ? (
          <BsStarFill />
        ) : stars >= halfNumber ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <div>
      <div className="flex justify-center">{numberOfStars}</div>
    </div>
  );
};

export default ReviewStars;
