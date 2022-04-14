import React from "react";
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";

import { mission } from "../data/nav-links";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <div className="pt-20 md:pt-28 px-1 md:px-10 text-center grid md:grid-cols-2 gap-2 items-center justify-center">
        <div className="flex justify-center flex-col">
          <h1 className="font-heading text-6xl py-4">Scott Shop</h1>
          <div className="h-[2px] bg-green-200 w-1/2 m-[0_auto]"></div>
          <div>
            <h2 className="font-heading text-3xl py-2">Quality Fashion</h2>
            <h2 className="font-heading text-3xl py-2">
              Bye-bye Stupid Prices!
            </h2>
          </div>
          <div className="hidden md:block mt-10">
            <button className="btn-shop">
              <Link to="/store" className="flex flex-col items-center">
                <p className="font-heading text-4xl">Let's Shop</p>
                <GiShoppingBag className="text-5xl" />
              </Link>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/img/background.jpg"
            alt="main"
            className="object-cover h-[300px]  md:h-[400px] lg:h-[500px] rounded-md shadow-lg shadow-green-200"
          />
        </div>
      </div>
      <div className="text-center py-8 mt-4">
        <button className="md:hidden btn-shop">
          <Link to="/store" className="flex flex-col items-center">
            <p className="font-heading text-2xl">Let's Shop</p>
            <GiShoppingBag className="text-4xl" />
          </Link>
        </button>
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
