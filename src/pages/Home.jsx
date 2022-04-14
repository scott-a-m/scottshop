import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { mission } from "../data/nav-links";
import Footer from "../components/Footer";
import { useStoreContext } from "../context/Store_Context";
const Home = () => {
  const [image, setImage] = useState();
  const [index, setIndex] = useState();
  const { products } = useStoreContext();
  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <div className="flex flex-col">
          {products.slice(0.5).map((product, index) => {
            return (
              <img
                className="h-[700px] w-[500px] object-cover"
                src={product.image}
                alt={product.name}
              />
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2  xl:grid-cols-4 text-center text-3xl gap-6 px-10 py-5">
        {mission.map((item, index) => {
          const { icon, name, img } = item;
          return (
            <div key={index} className="bg-green-100 p-4 rounded-md shadow-md">
              <div className="flex pb-4 gap-2 justify-center font-heading text-3xl items-center">
                <p>{name}</p>
                <p>{icon}</p>
              </div>
              <img
                src={img}
                alt={name}
                className="h-[10rem] lg:h-[15rem] object-cover w-full rounded-md"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center m-10 pb-5">
        <button className="btn-shop">
          <Link to="/store" className="flex gap-4 items-center">
            <p className="font-heading text-2xl">Start Shopping</p>
            <GiShoppingBag className="text-4xl" />
          </Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
