import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreContext } from "../context/Store_Context";
import { formatPrice } from "../helpers";
import AmountButtons from "../components/AmountButtons";
import Loading from "../components/Loading";
import Error from "../components/Error";
import NotFound from "./NotFound";
import ReviewStars from "../components/ReviewStars";
import { makeDate, getTime } from "../helpers";

const SingleProduct = () => {
  const {
    products_loading,
    reviews_loading,
    products_error,
    reviews_error,
    products,
    addToBasket,
    getReviews,
    reviews,
  } = useStoreContext();
  const { id } = useParams();
  const [mainColor, setMainColor] = useState(null);
  const [mainSize, setMainSize] = useState(null);
  const [amount, setAmount] = useState(1);
  const [singleProduct, setSingleProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const increase = () => {
    if (amount > singleProduct.inventory) return;
    setAmount(amount + 1);
  };
  const decrease = () => {
    if (amount === 1) return;
    setAmount(amount - 1);
  };

  const checkBasket = () => {
    if (!mainColor || !mainSize) {
      setMessage("Please Select Both Color and Size");
      return;
    }
    addToBasket(singleProduct._id, singleProduct, mainColor, amount, mainSize);
    navigate("/store/basket");
  };

  useEffect(() => {
    if (products.length > 0) {
      const product = products.filter((p) => p._id === id);
      if (product.length > 0) {
        setSingleProduct(product[0]);
        getReviews(`/api/v1/products/${id}/reviews`);
      }
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, products.length]);

  useEffect(() => {
    if (message) {
      const errorMsgTimeout = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => {
        clearTimeout(errorMsgTimeout);
      };
    }
  }, [message]);

  if (products_loading || reviews_loading || loading) return <Loading />;

  if (products_error || reviews_error) return <Error />;

  if (singleProduct)
    return (
      <div className="mt-20 text-center">
        <div className="grid sm:grid-cols-[auto_1fr] lg:grid-cols-2 mx-5 mt-20 md:mx-20 md:gap-5 lg:gap-20 text-center items-start">
          <div className="flex flex-col justify-center items-center">
            <div className="sm:hidden">
              <h4 className="font-heading text-3xl text-center">
                {singleProduct.name}
              </h4>
              <div className="pt-2">
                <ReviewStars stars={singleProduct.averageRating} />
              </div>
              <hr className="m-4" />
            </div>
            <div className="h-[20rem] w-[15rem] md:h-[30rem] md:w-[25rem] lg:h-[40rem] lg:w-full cursor-pointer shadow-lg rounded-lg">
              <img
                src={singleProduct.image}
                alt={singleProduct.name}
                className="h-[20rem] w-[15rem] md:h-[30rem] md:w-[25rem] lg:h-[40rem] lg:w-full object-cover rounded-lg "
              />
            </div>
          </div>
          <div className="!text-center">
            <div className="hidden sm:block">
              <h4 className="font-heading text-3xl text-center">
                {singleProduct.name}
              </h4>
              <div className="pt-2">
                <ReviewStars stars={singleProduct.averageRating} />
              </div>
              <hr className="m-4" />
            </div>
            <div className="m-4">
              <h2>{formatPrice(singleProduct.price)}</h2>
            </div>
            <div className="m-4">
              <h4 className="font-heading text-2xl underline">Colors</h4>
              <div className="flex justify-center">
                {singleProduct.colors.map((color, index) => {
                  return (
                    <button
                      className={`w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500 hover:border-green-500 ${
                        mainColor === color ? "border-green-500" : null
                      }`}
                      key={index}
                      style={{ backgroundColor: color }}
                      onClick={() => setMainColor(color)}
                    ></button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-heading text-2xl underline">Sizes</h4>
              <div className="flex justify-center">
                {singleProduct.sizes.map((size, index) => {
                  return (
                    <button
                      type="button"
                      className={`m-1 transition-all duration-500 hover:text-green-500 ${
                        mainSize === size ? "text-green-500" : null
                      }`}
                      key={index}
                      onClick={() => setMainSize(size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            {singleProduct.inventory > 0 && (
              <div className="flex justify-center">
                <div className="w-[250px]">
                  <h5 className="text-green-500 h-5">{message}</h5>
                  <AmountButtons
                    increase={increase}
                    decrease={decrease}
                    amount={amount}
                  />
                  <button
                    type="button"
                    className="btn-standard"
                    onClick={() => checkBasket()}
                  >
                    Add to Basket
                  </button>
                </div>
              </div>
            )}
            <div className="hidden lg:flex flex-col justify-center items-center py-4">
              <div className="w-[500px] max-h-[232px] overflow-scroll bg-green-100 p-4 rounded-lg mb-4">
                <h1 className="font-heading text-2xl underline pb-4">
                  Reviews ({reviews.length})
                </h1>
                {reviews
                  .sort((a, b) => {
                    a.updatedAt = getTime(a.updatedAt);
                    b.updatedAt = getTime(b.updatedAt);
                    return b.updatedAt - a.updatedAt;
                  })
                  .map((review, index) => {
                    const date = new Date(review.createdAt);
                    return (
                      <div
                        key={index}
                        className={`p-4 ${
                          index % 2 === 0 ? "bg-white" : "bg-green-50"
                        }`}
                      >
                        <div className="flex justify-between pt-2">
                          <h1 className="font-heading text-xl">
                            {review.title}
                          </h1>
                          <ReviewStars stars={review.rating} />
                        </div>

                        <p className="text-left py-4">{review.comment}</p>
                        <div className="flex justify-between items-center text-sm">
                          <h3>by: {review.user.substring(0, 3) + "*****"}</h3>

                          <h3>{date.toLocaleDateString()}</h3>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="my-8 mx-3 sm:mx-10 md:mx-20">
          <div className="lg:hidden flex flex-col justify-center items-center">
            <div className="w-full px-4 max-h-[400px] overflow-scroll bg-green-100 py-4 rounded-lg">
              <h1 className="font-heading text-2xl underline pb-4">
                Reviews ({reviews.length})
              </h1>
              {reviews
                .sort((a, b) => {
                  a.updatedAt = getTime(a.updatedAt);
                  b.updatedAt = getTime(b.updatedAt);
                  return b.updatedAt - a.updatedAt;
                })
                .map((review, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-4 ${
                        index % 2 === 0 ? "bg-white" : "bg-green-50"
                      }`}
                    >
                      <div className="flex justify-between pt-2">
                        <h1 className="font-heading text-xl">{review.title}</h1>
                        <ReviewStars stars={review.rating} />
                      </div>

                      <p className="text-left py-4">{review.comment}</p>
                      <div className="flex justify-between items-center text-sm">
                        <h3>by: {review.user.substring(0, 3) + "*****"}</h3>

                        <h3>{makeDate(review.createdAt)}</h3>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );

  return <NotFound />;
};

export default SingleProduct;
