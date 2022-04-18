import React, { useState, useEffect } from "react";
import { mission, categories } from "../data/nav-links";
import Footer from "../components/Footer";
import { useStoreContext } from "../context/Store_Context";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const [index, setIndex] = useState(1);
  const { products, updateFilters, clearFilters, products_loading } =
    useStoreContext();
  const navigate = useNavigate();
  const [mens, setMens] = useState(true);
  const [womens, setWomens] = useState(false);

  const toggleCategory = (cat = "womens") => {
    if (cat === "mens") {
      setMens(true);
      setWomens(false);
      return;
    }
    setMens(false);
    setWomens(true);
  };

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

  if (products_loading) return <Loading />;

  return (
    <div className="mt-20">
      <div className="grid sm:grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr] items-center lg:items-start justify-center text-center">
        <div className="hidden sm:block self-center px-3 md:px-8 xl:px-20">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="font-heading text-3xl sm:text-6xl sm:py-4">
              Scott
              <br />
              Shop
            </h1>
            <div className="h-[2px] bg-green-200 w-full m-[0_auto]"></div>
            <div>
              <h2 className="font-heading text-xl sm:text-3xl py-2">
                Quality Fashion
              </h2>
              <h2 className="font-heading text-xl sm:text-3xl py-2">
                Bargain Prices
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mb-2 sm:mb-10">
          <div className="shadow-lg relative h-[500px] w-[300px] xs:w-[400px] xs:h-[625px] sm:h-[500px] sm:w-[300px]  md:h-[630px] md:w-[400px] xxl:h-[720px] xl:w-[500px] overflow-hidden rounded-md">
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
        <div className="flex justify-center">
          <div className="lg:hidden shadow-lg bg-green-300  m-0 w-[280px] sm:w-[100px] lg:w-[150px] rounded-md p-3 sm:p-4 sm:ml-5 sm:mr-5 lg:mr-20 flex gap-4 sm:flex sm:flex-col sm:justify-center">
            {categories.map((item, index) => {
              return (
                <button
                  key={index}
                  name="type"
                  className="text-white flex flex-col items-center transition-all duration-500 hover:text-black cursor-pointer font-heading text-xl lg:text-xl"
                  onClick={() => {
                    clearFilters();
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
          <div className="relative self-start hidden lg:flex flex-col p-2 bg-green-200 rounded-md h-[632px] xxl:h-[722px] w-[336px] xl:w-[376px] shadow-lg overflow-hidden">
            <div className="flex w-full">
              <button
                className={`w-1/2 transition-all duration-500 py-1 bg-white hover:bg-green-500 hover:text-white rounded-tl-md ${
                  mens ? "!bg-green-600 text-white" : null
                }`}
                onMouseOver={() => toggleCategory("mens")}
                onClick={() => toggleCategory("mens")}
              >
                Mens
              </button>
              <button
                className={`w-1/2 transition-all duration-500 py-1 bg-white hover:bg-green-500 hover:text-white rounded-tr-md ${
                  womens ? "!bg-green-600 text-white" : null
                }`}
                onMouseOver={toggleCategory}
                onClick={toggleCategory}
              >
                Womens
              </button>
            </div>

            <div
              className={`absolute top-10 grid grid-cols-2 opacity-0 transition-all duration-500 translate-x-full ${
                mens ? "!opacity-100 !translate-x-0" : null
              }`}
            >
              {products
                .filter((product) => {
                  return (
                    product.featured === true && product.category === "mens"
                  );
                })
                .sort((a, b) => b.name.localeCompare(a.name))
                .map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer transition-all duration-1000 hover:opacity-70"
                      onClick={() => {
                        clearFilters();
                        updateFilters(product.type, product.category);
                        navigate("/store");
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-[255px] w-[160px] xxl:h-[300px] xl:w-[180px] object-cover"
                      />
                      <p
                        className={`font-heading text-xl ${
                          index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                        }  py-1`}
                      >
                        {product.type}
                      </p>
                    </div>
                  );
                })}
            </div>

            <div
              className={`absolute top-10 grid grid-cols-2 opacity-0 transition-all duration-500 translate-x-full ${
                womens ? "!opacity-100 !translate-x-0" : null
              }`}
            >
              {products
                .filter((product) => {
                  return (
                    product.featured === true && product.category === "womens"
                  );
                })
                .sort((a, b) => b.name.localeCompare(a.name))
                .map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer transition-all duration-500 hover:opacity-70"
                      onClick={() => {
                        updateFilters(product.type, product.category);
                        navigate("/store");
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-[255px] w-[160px] xxl:h-[300px] xl:w-[180px] object-cover"
                      />
                      <p
                        className={`font-heading text-xl ${
                          index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                        }  py-1`}
                      >
                        {product.type}
                      </p>
                    </div>
                  );
                })}
            </div>
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
