import React from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/Store_Context";
import { formatPrice } from "../helpers";
import ReviewStars from "./ReviewStars";
const ProductsList = () => {
  const { filtered_products: products } = useStoreContext();
  const navigate = useNavigate();

  if (products.length < 1)
    return (
      <h1 className="mt-20 text-center">No products match your selection</h1>
    );

  return (
    <div>
      {/* <h1 className="py-4">
        {products.length === 1 ? `1 Item` : `${products.length} Items`}
      </h1> */}

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4">
        {products.map((product) => {
          const { image, name, _id, price, numOfReviews, averageRating } =
            product;
          return (
            <div
              key={_id}
              className="relative cursor-pointer transition-all duration-500 hover:text-green-500 hover:shadow-xl hover:shadow-green-200 rounded-lg shadow-green-200 shadow-sm"
              onClick={() => navigate(`/store/${_id}`)}
            >
              <img
                src={image}
                alt={name}
                className="h-[20rem] w-full object-cover rounded-t-lg"
              />
              <p className="font-heading text-xl text-center">{name}</p>
              <p className="absolute top-0 left-0 text-center m-2 p-1 bg-green-200 rounded-lg">
                {formatPrice(price)}
              </p>
              <ReviewStars stars={averageRating} reviews={numOfReviews} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
