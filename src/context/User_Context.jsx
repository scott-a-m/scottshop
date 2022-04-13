import axios from "axios";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import userReducer from "../reducers/user_reducer";
import {
  GET_USER_START,
  GET_USER_END,
  GET_USER_ERROR,
  GET_USER_ORDERS_START,
  GET_USER_ORDERS_END,
  GET_USER_ORDERS_ERROR,
  STORE_SINGLE_ORDER_SECRET,
  REMOVE_SINGLE_ORDER_SECRET,
  GET_USER_REVIEWS_START,
  GET_USER_REVIEWS_END,
  GET_USER_REVIEWS_ERROR,
  CREATE_USER_REVIEW_START,
  CREATE_USER_REVIEW_PROCESS,
  CREATE_USER_REVIEW_END,
  CREATE_USER_REVIEW_ERROR,
  DISPLAY_MESSAGE,
  TOGGLE_SIDEBAR,
  GO_TO_CHECKOUT,
  LOGOUT_USER,
} from "../actions";

const initialState = {
  user_loading: true,
  user_error: false,
  orders_loading: false,
  orders_error: false,
  single_order_secret: null,
  reviews_loading: false,
  reviews_error: false,
  single_review_loading: false,
  single_review_error: false,
  single_review_success: false,
  message: {
    show: false,
    msg: "",
    type: "",
  },
  is_sidebar_open: false,
  go_to_checkout: false,
  user: null,
  user_orders: [],
  user_reviews: [],
  user_review: {
    name: "",
    product: "",
    color: "",
    size: "",
    rating: "",
    comment: "",
    image: "",
  },
};

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const toggleSidebar = (type) => {
    dispatch({ type: TOGGLE_SIDEBAR, payload: type });
  };

  const polishName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1) + "'s";
  };

  const showMessage = useCallback((show = false, type = "", msg = "") => {
    dispatch({ type: DISPLAY_MESSAGE, payload: { show, type, msg } });
  }, []);

  const getUser = async () => {
    dispatch({ type: GET_USER_START });
    try {
      const { data } = await axios.get("/api/v1/users/showMe");
      dispatch({ type: GET_USER_END, payload: data.user });
    } catch (error) {
      dispatch({ type: GET_USER_ERROR });
    }
  };

  const getUserOrders = async () => {
    dispatch({ type: GET_USER_ORDERS_START });
    try {
      const { data } = await axios.get("/api/v1/orders/showAllMyOrders");
      dispatch({ type: GET_USER_ORDERS_END, payload: data.userOrders });
    } catch (error) {
      dispatch({ type: GET_USER_ORDERS_ERROR });
    }
  };
  const getUserReviews = async () => {
    dispatch({ type: GET_USER_REVIEWS_START });
    try {
      const { data } = await axios.get("/api/v1/reviews/user");
      dispatch({ type: GET_USER_REVIEWS_END, payload: data.reviews });
    } catch (error) {
      dispatch({ type: GET_USER_REVIEWS_ERROR });
    }
  };

  const initiateUserReview = (name, product, color, size, image) => {
    dispatch({
      type: CREATE_USER_REVIEW_START,
      payload: { name, product, color, size, image },
    });
  };

  const createUserReview = async (reviewData) => {
    const { title, comment, rating } = reviewData;
    const { color, product, size } = state.user_review;

    dispatch({ type: CREATE_USER_REVIEW_PROCESS });
    try {
      await axios.post("/api/v1/reviews", {
        product,
        size,
        color,
        title,
        rating,
        comment,
      });
      dispatch({ type: CREATE_USER_REVIEW_END });
    } catch (error) {
      dispatch({ type: CREATE_USER_REVIEW_ERROR });
    }
  };

  const setGoToCheckout = (type) => {
    dispatch({ type: GO_TO_CHECKOUT, payload: type });
  };

  const userLogout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  const storeOrderSecret = ({ secret, orderId }) => {
    dispatch({ type: STORE_SINGLE_ORDER_SECRET, payload: { secret, orderId } });
  };
  const removeOrderSecret = () => {
    dispatch({ type: REMOVE_SINGLE_ORDER_SECRET });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (state.user) {
      getUserOrders();
      getUserReviews();
    }
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        showMessage,
        getUser,
        polishName,
        toggleSidebar,
        setGoToCheckout,
        initiateUserReview,
        createUserReview,
        userLogout,
        storeOrderSecret,
        removeOrderSecret,
        getUserOrders,
        getUserReviews,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };
