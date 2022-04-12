import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/User_Context";
import ReviewStars from "../components/ReviewStars";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import NotFound from "./NotFound";
import axios from "axios";

const EditReview = () => {
  const {
    user_review: { name, color, size, image },
    reviews_loading,
    reviews_error,
    user_reviews,
  } = useUserContext();

  const navigate = useNavigate();

  const { id } = useParams();

  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReviewData((data) => {
      return { ...data, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`/api/v1/reviews/${reviewData.id}`, reviewData);
      setLoading(false);
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (user_reviews.length > 0) {
      const singleReview = user_reviews.filter(
        (review) => review.product._id === id
      );
      setReviewData({
        title: singleReview[0].title,
        comment: singleReview[0].comment,
        rating: singleReview[0].rating,
        id: singleReview[0]._id,
      });
      setLoading(false);
    }
  }, [user_reviews, id]);

  useEffect(() => {
    if (!name) {
      navigate("/user/account");
    }
    if (updateSuccess) {
      navigate("/user/account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  if (reviews_loading || loading) return <Loading />;

  if (reviews_error) return <Error />;

  if (!reviewData) return <NotFound />;

  return (
    <div className="full-page">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] md:w-[500px] lg:w-[600px] text-center p-4 bg-green-200 rounded-md"
      >
        <h1 className="font-heading text-2xl pb-4">Edit Review</h1>
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

export default EditReview;
