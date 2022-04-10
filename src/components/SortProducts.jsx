import React from "react";
import { useStoreContext } from "../context/Store_Context";

const SortProducts = () => {
  const { sort, updateSort } = useStoreContext();

  return (
    <div className="py-4">
      <form>
        <label htmlFor="sort" className="font-heading text-xl px-2">
          Sort:
        </label>
        <select
          name="sort"
          id="sort"
          value={sort}
          onChange={updateSort}
          className="border-2 border-green-200 rounded-sm"
        >
          <option value="price-lowest">price lowest</option>
          <option value="price-highest">price highest</option>
          <option value="rating-lowest">rating lowest</option>
          <option value="rating-highest">rating highest</option>
        </select>
      </form>
    </div>
  );
};

export default SortProducts;
