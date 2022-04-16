import React, { useState, useEffect } from "react";
import { mission, categories } from "../data/nav-links";
import Footer from "../components/Footer";
import { useStoreContext } from "../context/Store_Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [index, setIndex] = useState(1);
  const { products, updateFilters } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    const lastIndex = products.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, products]);

  useEffect(() => {
    let imageSlider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(imageSlider);
    };
  }, [index]);

  return (
    <div className="mt-20">
      <div className="grid sm:grid-cols-[1fr_1fr_auto] items-center justify-center text-center">
        <div className="hidden sm:flex flex-col px-4">
          <h1 className="font-heading text-3xl sm:text-6xl sm:py-4">
            Scott Shop
          </h1>
          <div className="h-[2px] bg-green-200 w-1/2 m-[0_auto]"></div>
          <div>
            <h2 className="font-heading text-xl sm:text-3xl py-2">
              Quality Fashion
            </h2>
            <h2 className="font-heading text-xl sm:text-3xl py-2">
              No Stupid Prices
            </h2>
          </div>
        </div>

        <div className="w-full flex justify-center mb-2 sm:mb-10">
          <div className="shadow-lg relative h-[500px] w-[300px] xs:w-[400px] xs:h-[625px] sm:h-[500px] sm:w-[300px]  md:h-[600px] md:w-[400px] xl:h-[680px] xl:w-[500px] overflow-hidden rounded-md">
            {products.map((product, productIndex) => {
              let position = "translate-x-full";
              if (productIndex === index) {
                position = "!opacity-100";
              }
              if (
                productIndex === index - 1 ||
                (index === 0 && productIndex === products.length)
              ) {
                position = "-translate-x-full";
              }
              return (
                <article
                  key={productIndex}
                  className={`absolute opacity-0 top-0 left-0 w-full h-full transition-all duration-500 ${position} cursor-pointer`}
                  onClick={() => navigate(`/store/${product._id}`)}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </article>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-green-300  m-0 w-[280px] sm:w-[100px] lg:w-[150px] rounded-md p-3 sm:p-4 sm:ml-5 sm:mr-5 lg:mr-20 flex gap-4 sm:flex sm:flex-col sm:justify-center">
            {categories.map((item, index) => {
              return (
                <button
                  key={index}
                  name="type"
                  className="text-white flex flex-col items-center transition-all duration-500 hover:text-black cursor-pointer font-heading text-xl lg:text-2xl"
                  onClick={() => {
                    updateFilters(item.name, "type");
                    navigate("/store");
                  }}
                >
                  {item.name}
                  <p className="text-center text-5xl lg:text-6xl">
                    {item.icon}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center pt-8 pb-4 sm:pb-8">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl">Our Promise </h1>
          <div className="h-[2px] bg-green-200 w-full m-[0_auto]"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 text-center text-3xl gap-6 px-10 py-5 mb-10">
        {mission.map((item, index) => {
          const { icon, name, img } = item;
          return (
            <div key={index} className="bg-green-100 p-4 rounded-md shadow-md">
              <div className="flex pb-4 gap-2 justify-center text-lg xl:text-xl items-center">
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
      <Footer />
    </div>
  );
};

export default Home;
