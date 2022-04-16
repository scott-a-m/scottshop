import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/User_Context";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { BsStarFill, BsStar } from "react-icons/bs";

const WriteReview = () => {
  const {
    user_review: { name, color, size, image },
    createUserReview,
    single_review_loading,
    single_review_error,
    single_review_success,
    getUserReviews,
  } = useUserContext();

  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    title: "",
    comment: "",
    rating: 5,
  });
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(5);

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
      getUserReviews();
      navigate("/user/account");
    }

    if (single_review_error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single_review_success, single_review_error]);

  useEffect(() => {
    setReviewData((data) => {
      return { ...data, rating };
    });
  }, [rating]);

  if (single_review_loading) return <Loading />;

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
                className="w-[120px] h-[160px] rounded-md object-cover"
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
              Review Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="E.g. Great design and fit"
              className="w-full py-1 rounded-md"
              onChange={handleChange}
              value={reviewData.title}
            />
            <label htmlFor="comment" className="block pt-2 font-heading">
              Review
            </label>
            <textarea
              type="text"
              name="comment"
              id="comment"
              onChange={handleChange}
              className="w-full min-h-[100px] max-h-[100px] rounded-md py-1"
              value={reviewData.comment}
            />
            <div className="flex justify-center gap-2 items-center">
              <h3 className="font-heading">Rating:</h3>
              <div className="flex text-2xl">
                <button
                  type="button"
                  className="text-yellow-500 transition-all duration-500 hover:text-yellow-300"
                  onClick={() => setRating(1)}
                >
                  <BsStarFill />
                </button>
                <button
                  type="button"
                  className="text-yellow-500 transition-all duration-500 hover:text-yellow-300"
                  onClick={() => setRating(2)}
                >
                  {rating >= 2 ? <BsStarFill /> : <BsStar />}
                </button>
                <button
                  type="button"
                  className="text-yellow-500 transition-all duration-500 hover:text-yellow-300"
                  onClick={() => setRating(3)}
                >
                  {rating >= 3 ? <BsStarFill /> : <BsStar />}
                </button>
                <button
                  type="button"
                  className="text-yellow-500 transition-all duration-500 hover:text-yellow-300"
                  onClick={() => setRating(4)}
                >
                  {rating >= 4 ? <BsStarFill /> : <BsStar />}
                </button>
                <button
                  type="button"
                  className="text-yellow-500 transition-all duration-500 hover:text-yellow-300"
                  onClick={() => setRating(5)}
                >
                  {rating === 5 ? <BsStarFill /> : <BsStar />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <p className="bg-white p-1 text-red-500 mt-3">
            Oops an error occured; please try again
          </p>
        )}
        <div className="mt-2 flex justify-between">
          <button type="submit" className="btn-standard">
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/user/account")}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteReview;
