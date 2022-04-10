import {
  GET_USER_START,
  GET_USER_END,
  GET_USER_ERROR,
  LOGOUT_USER,
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
} from "../actions";
const user_reducer = (state, action) => {
  if (action.type === GET_USER_START) {
    return { ...state, user_loading: true, user_error: false };
  }
  if (action.type === GET_USER_END) {
    return {
      ...state,
      user: action.payload,
      user_loading: false,
    };
  }
  if (action.type === GET_USER_ERROR) {
    return {
      ...state,
      user_loading: false,
      user_error: true,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user_loading_complete: false,
      user: null,
      go_to_checkout: false,
    };
  }
  if (action.type === DISPLAY_MESSAGE) {
    const { show, type, msg } = action.payload;
    return {
      ...state,
      message: {
        show,
        type,
        msg,
      },
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    let status;

    if (action.payload === "open") {
      status = true;
    }
    if (action.payload === "close") {
      status = false;
    }
    return { ...state, is_sidebar_open: status };
  }
  if (action.type === GET_USER_ORDERS_START) {
    return { ...state, orders_loading: true };
  }
  if (action.type === GET_USER_ORDERS_END) {
    return { ...state, user_orders: action.payload, orders_loading: false };
  }
  if (action.type === GET_USER_ORDERS_ERROR) {
    return { ...state, orders_loading: false, orders_error: true };
  }
  if (action.type === GET_USER_REVIEWS_START) {
    return { ...state, reviews_loading: true };
  }
  if (action.type === GET_USER_REVIEWS_END) {
    return { ...state, user_reviews: action.payload, reviews_loading: false };
  }
  if (action.type === GET_USER_REVIEWS_ERROR) {
    return { ...state, reviews_loading: false, reviews_error: true };
  }
  if (action.type === CREATE_USER_REVIEW_START) {
    const { name, product, color, size, image } = action.payload;
    return {
      ...state,
      single_review_success: false,
      user_review: { ...state.user_review, name, product, color, size, image },
    };
  }
  if (action.type === CREATE_USER_REVIEW_PROCESS) {
    return {
      ...state,
      single_review_loading: true,
    };
  }
  if (action.type === CREATE_USER_REVIEW_END) {
    return {
      ...state,
      single_review_loading: false,
      single_review_success: true,
    };
  }
  if (action.type === CREATE_USER_REVIEW_ERROR) {
    return {
      ...state,
      single_review_loading: false,
      single_review_error: true,
    };
  }

  if (action.type === GO_TO_CHECKOUT) {
    return { ...state, go_to_checkout: action.payload };
  }

  if (action.type === STORE_SINGLE_ORDER_SECRET) {
    const { secret, orderId } = action.payload;
    return { ...state, single_order_secret: { secret, orderId } };
  }
  if (action.type === REMOVE_SINGLE_ORDER_SECRET) {
    return { ...state, single_order_secret: null };
  }
};
export default user_reducer;
