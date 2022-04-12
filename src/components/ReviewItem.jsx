import React, { useState } from "react";
import ReviewStars from "./ReviewStars";
import { makeDate } from "../helpers";
import { useUserContext } from "../context/User_Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  setLoading,
}) => {
  const { user, getUserReviews, initiateUserReview } = useUserContext();
  const [cancelWindow, setCancelWindow] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const deleteReview = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/v1/reviews/${_id}`);
      setLoading(false);
      getUserReviews();
    } catch (error) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  return (
    <div className="relative text-center shadow-md rounded flex flex-col justify-between m-5 self-start h-[450px] overflow-scroll border-[1px] border-green-200">
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
      <div className="flex justify-center py-4 mb-8">
        <img
          className="w-[120px] h-[160px] rounded-md"
          src={image}
          alt={product.name}
        ></img>
      </div>
      <div className="absolute bottom-8 w-full">
        {!cancelWindow && (
          <div className="flex justify-between">
            <button
              className="btn-standard !w-[80px]"
              onClick={() => {
                initiateUserReview(
                  product.name,
                  product._id,
                  color,
                  size,
                  image
                );
                navigate(`/user/account/review/${product._id}`);
              }}
            >
              Edit
            </button>
            <button
              className="btn-cancel !w-[80px]"
              onClick={() => setCancelWindow(true)}
            >
              Delete
            </button>
          </div>
        )}
        {cancelWindow && !error && (
          <div className="flex justify-between items-center bg-red-500 rounded-md">
            <button
              className="bg-black text-white rounded-md p-2 m-2 transition-all duration-500 hover:bg-white hover:text-black !w-[80px]"
              onClick={() => deleteReview(product._id)}
            >
              Yes
            </button>
            <h2 className="text-white">Delete Review?</h2>
            <button
              className="btn-standard !w-[80px]"
              onClick={() => setCancelWindow(false)}
            >
              No
            </button>
          </div>
        )}
        {cancelWindow && error && (
          <div className="p-2 m-2 bg-red-500 text-white rounded-md">
            <p>Oops an error occured; please try again</p>
          </div>
        )}
      </div>
      <div className="flex justify-between p-2 text-sm">
        <p>buyer: {user.name}</p>
        <p>{makeDate(updatedAt)}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
