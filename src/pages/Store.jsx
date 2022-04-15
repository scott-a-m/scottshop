import React, { useState } from "react";
import Filters from "../components/Filters";
import ProductsList from "../components/ProductsList";
import { useStoreContext } from "../context/Store_Context";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { ImFilter } from "react-icons/im";

const Store = () => {
  const { products_loading, products_error } = useStoreContext();

  const [filters, setFilters] = useState(false);

  if (products_loading) return <Loading />;

  if (products_error) return <Error />;

  return (
    <main>
      <div className="mt-20 grid grid-cols-[auto_1fr] transition-all duration-500">
        <div className="md:bg-white">
          <button
            className={`fixed top-[70px] z-10 left-3 p-2 rounded-full transition duration-500 bg-green-500 text-white md:hidden hover:text-green-500 hover:bg-white ${
              filters ? "!hidden" : null
            }`}
            onClick={() => setFilters(!filters)}
          >
            <ImFilter className="text-2xl" />
          </button>
          <div
            className={`md:block md:w-full md:opacity-100 w-0 opacity-0 overflow-hidden rounded-br-lg md:rounded-none fixed top-[52px] md:sticky md:top-20  z-10 transition-all duration-500 ${
              filters ? "!block !opacity-100 !w-full" : null
            }`}
          >
            <Filters setFilters={setFilters} />
          </div>
        </div>
        <div>
          <ProductsList />
        </div>
      </div>
    </main>
  );
};

export default Store;
