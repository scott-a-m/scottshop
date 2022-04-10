import React from "react";
import SortProducts from "./SortProducts";
import { getUniqueValues } from "../helpers";
import { useStoreContext } from "../context/Store_Context";
import { formatPrice } from "../helpers";
import { FaTimes } from "react-icons/fa";

const Filters = ({ setFilters }) => {
  const { products, updateFilters, clearFilters, filters } = useStoreContext();

  const { type, color, category, price, min_price, max_price, size } = filters;

  const types = getUniqueValues(products, "type");
  const colors = getUniqueValues(products, "colors");
  const categories = getUniqueValues(products, "category");
  const sizes = getUniqueValues(products, "sizes");

  return (
    <div className="md:px-4 bg-green-50 md:bg-white text-center">
      <h1 className="font-heading hidden md:block text-2xl text-green-500">
        Options
      </h1>

      <div className="flex justify-between md:justify-center items-center">
        <SortProducts />
        <button
          className="transition-all duration-500 p-1 m-2 rounded-full text-white bg-green-500 hover:bg-green-600 block md:hidden"
          onClick={() => setFilters(!filters)}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <div className="py-1 hidden md:block">
        <h3 className="font-heading text-xl py-1">category</h3>
        <hr className="py-1" />
        <div className="flex flex-col justify-center">
          {categories.map((item, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                className={`px-4 ${
                  item === category ? "text-green-500 underline" : null
                }`}
                onClick={updateFilters}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-2 gap-3">
        <div className="py-1 md:hidden">
          <h3 className="font-heading text-xl py-1">category</h3>
          <hr className="py-1" />
          <div className="flex flex-col justify-center">
            {categories.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  name="category"
                  className={`px-4 ${
                    item === category ? "text-green-500 underline" : null
                  }`}
                  onClick={updateFilters}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="py-1">
          <h3 className="font-heading text-xl py-1">type</h3>
          <hr className="py-1" />
          <div className="grid grid-cols-2">
            {types.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  name="type"
                  className={`${
                    item === type ? "text-green-500 underline" : null
                  }`}
                  onClick={updateFilters}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="py-1">
          <h3 className="font-heading text-xl py-1">size</h3>
          <hr className="py-1" />
          <div className="grid grid-cols-3">
            {sizes.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  name="size"
                  className={`${
                    item === size ? "text-green-500 underline" : null
                  }`}
                  onClick={updateFilters}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-1">
        <h3 className="font-heading text-xl py-1">colors</h3>
        <hr className="py-1" />
        <div className="flex justify-center">
          <div className="grid grid-cols-9 items-center">
            {colors.map((item, index) => {
              if (item === "all") {
                return (
                  <button
                    className={`w-5 h-5  m-1 transition-all duration-500 hover:text-green-500 ${
                      color === item ? "text-green-500 underline" : null
                    }`}
                    key={index}
                    onClick={updateFilters}
                    data-color={item}
                    name="color"
                  >
                    {item}
                  </button>
                );
              }
              return (
                <button
                  className={`w-5 h-5 border-2 border-black m-1 rounded-md transition-all duration-500 hover:border-green-500 ${
                    color === item ? "border-green-500" : null
                  }`}
                  key={index}
                  style={{ backgroundColor: item }}
                  onClick={updateFilters}
                  data-color={item}
                  name="color"
                ></button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly md:block">
        <div className="py-1">
          <h3 className="font-heading text-xl">price</h3>
          <hr />
          <p>{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            onChange={updateFilters}
            min={min_price}
            max={max_price}
            value={price}
          />
        </div>
        <div>
          <button className="btn-standard" onClick={clearFilters}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
