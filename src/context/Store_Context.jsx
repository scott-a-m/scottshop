import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_END,
  GET_PRODUCTS_ERROR,
  GET_REVIEWS_START,
  GET_REVIEWS_END,
  GET_REVIEWS_ERROR,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  ADD_TO_BASKET,
  TOGGLE_AMOUNT,
  CALCULATE_TOTAL,
  REMOVE_ITEM,
  CLEAR_BASKET,
} from "../actions";

import storeReducer from "../reducers/store_reducer";

const getLocalStorage = () => {
  let basket = localStorage.getItem("basket");
  if (basket) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  reviews_loading: false,
  reviews_error: false,
  reviews: [],
  filtered_products: [],
  sort: "price-lowest",
  filters: {
    type: "all",
    color: "all",
    category: "all",
    size: "all",
    max_price: 0,
    min_price: 0,
    price: 0,
  },
  basket: getLocalStorage(),
  basket_items: 0,
  basket_total: 0,
  deliveryFee: 500,
};

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_START });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: GET_PRODUCTS_END, payload: data.products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  const getReviews = async (url) => {
    dispatch({ type: GET_REVIEWS_START });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: GET_REVIEWS_END, payload: data.reviews });
    } catch (error) {
      dispatch({ type: GET_REVIEWS_ERROR });
    }
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const updateFilters = (e, type = false) => {
    let value;
    let name;

    if (!type) {
      name = e.target.name;
      if (name === "price") {
        value = Number(e.target.value);
      }

      if (name === "type" || name === "category" || name === "size") {
        value = e.target.textContent;
      }

      if (name === "color") {
        value = e.target.dataset.color;
      }
    } else {
      name = type;
      value = e;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const addToBasket = (id, product, color, amount, size) => {
    dispatch({
      type: ADD_TO_BASKET,
      payload: { id, product, color, amount, size },
    });
  };

  const toggleAmount = (type, id) => {
    dispatch({ type: TOGGLE_AMOUNT, payload: { type, id } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  const clearBasket = () => {
    dispatch({ type: CLEAR_BASKET });
  };

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.products, state.sort, state.filters]);

  useEffect(() => {
    dispatch({ type: CALCULATE_TOTAL });
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]);

  useEffect(() => {
    getProducts("/api/v1/products");
  }, []);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        updateSort,
        updateFilters,
        clearFilters,
        addToBasket,
        toggleAmount,
        removeItem,
        getReviews,
        clearBasket,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
