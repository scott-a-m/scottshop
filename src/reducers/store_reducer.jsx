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

const store_reducer = (state, action) => {
  if (action.type === GET_PRODUCTS_START) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_END) {
    let maxPrice = action.payload.map((item) => item.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      products: action.payload,
      filtered_products: action.payload,
      products_loading: false,
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  if (action.type === GET_REVIEWS_START) {
    return { ...state, reviews_loading: true };
  }
  if (action.type === GET_REVIEWS_END) {
    return {
      ...state,
      reviews: action.payload,
      reviews_loading: false,
    };
  }
  if (action.type === GET_REVIEWS_ERROR) {
    return { ...state, reviews_loading: false, reviews_error: true };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let sortedProducts = [...filtered_products];

    if (sort === "price-lowest") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "rating-lowest") {
      sortedProducts = sortedProducts.sort(
        (a, b) => a.averageRating - b.averageRating
      );
    }
    if (sort === "rating-highest") {
      sortedProducts = sortedProducts.sort(
        (a, b) => b.averageRating - a.averageRating
      );
    }

    return { ...state, filtered_products: sortedProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    if (action.payload.nameOne) {
      const { nameOne, valueOne, nameTwo, valueTwo } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [nameOne]: valueOne, [nameTwo]: valueTwo },
      };
    }
    const { value, name } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { type, color, category, price, size } = state.filters;
    let filteredProducts = [...state.products];

    if (type !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.type === type
      );
    }

    if (color !== "all") {
      filteredProducts = filteredProducts.filter((product) => {
        return product.colors.find((item) => item === color);
      });
    }

    if (category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }
    if (size !== "all") {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.find((item) => item === size)
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) => product.price <= price
    );

    return { ...state, filtered_products: filteredProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      sort: "price-lowest",
      filters: {
        ...state.filters,
        type: "all",
        color: "all",
        category: "all",
        size: "all",
        price: state.filters.max_price,
      },
    };
  }

  if (action.type === ADD_TO_BASKET) {
    const { color, size, amount, id, product } = action.payload;

    const tempItem = state.basket.find(
      (basketItem) => basketItem.id === id + size + color
    );

    if (tempItem) {
      const tempBasket = state.basket.map((basketItem) => {
        if (basketItem.id === id + size + color) {
          let newAmount = basketItem.amount + amount;
          if (newAmount > basketItem.inventory) {
            newAmount = basketItem.inventory;
          }
          return { ...basketItem, amount: newAmount };
        } else {
          return basketItem;
        }
      });
      return { ...state, basket: tempBasket };
    } else {
      const newBasketItem = {
        id: id + size + color,
        productId: product._id,
        name: product.name,
        description: product.description,
        color,
        size,
        amount,
        image: product.image,
        price: product.price,
        inventory: product.inventory,
      };
      return { ...state, basket: [...state.basket, newBasketItem] };
    }
  }

  if (action.type === REMOVE_ITEM) {
    const tempBasket = state.basket.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, basket: tempBasket };
  }

  if (action.type === TOGGLE_AMOUNT) {
    const { id, type } = action.payload;
    const tempBasket = state.basket.map((basketItem) => {
      if (basketItem.id === id) {
        if (type === "inc") {
          let newAmount = basketItem.amount + 1;
          if (basketItem.amount === basketItem.inventory) {
            newAmount = basketItem.inventory;
          }
          return { ...basketItem, amount: newAmount };
        }
        if (type === "dec") {
          let newAmount = basketItem.amount - 1;
          if (basketItem.amount === 1) {
            newAmount = 1;
          }
          return { ...basketItem, amount: newAmount };
        }
      }
      return basketItem;
    });

    return { ...state, basket: tempBasket };
  }

  if (action.type === CALCULATE_TOTAL) {
    const { basketAmount, basketTotal } = state.basket.reduce(
      (basket, basketItem) => {
        const { price, amount } = basketItem;
        basket.basketAmount += amount;
        basket.basketTotal += amount * price;

        return basket;
      },
      {
        basketAmount: 0,
        basketTotal: 0,
      }
    );
    return {
      ...state,
      basket_items: basketAmount,
      basket_total: basketTotal,
    };
  }

  if (action.type === CLEAR_BASKET) {
    return { ...state, basket: [] };
  }
};

export default store_reducer;
