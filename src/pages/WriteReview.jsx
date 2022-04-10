import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/User_Context";
import ReviewStars from "../components/ReviewStars";
import { useNavigate } from "react-router-dom";

const WriteReview = () => {
  const {
    user_review: { name, color, size, image },
    createUserReview,
    single_review_loading,
    single_review_error,
    single_review_success,
  } = useUserContext();

  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    title: "",
    comment: "",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setReviewData((data) => {
      return { ...data, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserReview(reviewData);
  };

  useEffect(() => {
    if (!name) {
      navigate("/user/account");
    }
    if (single_review_success) {
      setTimeout(() => {
        navigate("/user/account");
      }, 5000);
    }
  }, [single_review_success]);

  return (
    <div className="full-page">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] md:w-[500px] lg:w-[600px] text-center p-4 bg-green-200 rounded-md"
      >
        <h1 className="font-heading text-2xl pb-4">Write Review</h1>
        <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
          <div>
            <div className="flex justify-center py-4">
              <img
                className="w-[120px] h-[160px] rounded-md"
                src={image}
                alt={name}
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-green-500 text-2xl font-bold font-heading">
                {name}
              </h1>
              <button
                className="w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500 cursor-default"
                style={{ backgroundColor: color }}
              ></button>
              <p className="text-sm">{size}</p>
            </div>
          </div>
          <div>
            <label htmlFor="title" className="block pt-2 font-heading">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full py-1 rounded-md"
              onChange={handleChange}
              value={reviewData.title}
            />
            <label htmlFor="comment" className="block pt-2 font-heading">
              Comments
            </label>
            <textarea
              type="text"
              name="comment"
              id="comment"
              onChange={handleChange}
              className="w-full min-h-[100px] max-h-[100px] rounded-md py-1"
              value={reviewData.comment}
            />
            <div className="flex justify-center items-center mt-3">
              <label htmlFor="rating" className="block px-3 font-heading">
                Rating
              </label>
              <select
                name="rating"
                id="rating"
                className="w-[50px] px-2"
                onChange={handleChange}
                value={reviewData.rating}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <div className="px-2">
                <ReviewStars stars={reviewData.rating} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={
              single_review_loading || single_review_success
                ? "btn-disabled"
                : "btn-standard"
            }
            disabled={
              single_review_loading || single_review_success ? true : false
            }
          >
            {single_review_loading
              ? "Processing..."
              : single_review_success
              ? "Review Complete"
              : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteReview;
