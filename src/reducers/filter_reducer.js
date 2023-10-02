import { act } from "react-dom/test-utils";
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      console.log("Max Price", maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let temppProducts = [...all_products];
      //filtering
      //text
      if (text) {
        temppProducts = temppProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      //category
      if (category !== "all") {
        temppProducts = temppProducts.filter((p) => p.category === category);
      }
      //company
      if (company !== "all") {
        temppProducts = temppProducts.filter((p) => p.company === company);
      }

      //colors
      //p.colors is an array so we have 1 additional method (find)
      if (color !== "all") {
        temppProducts = temppProducts.filter((p) => {
          return p.colors.find((c) => c === color);
        });
      }
      //price
      if (price !== "all") {
        temppProducts = temppProducts.filter((p) => p.price <= price);
      }

      //shipping
      if (shipping) {
        temppProducts = temppProducts.filter((p) => p.shipping === true);
      }

      return { ...state, filtered_products: temppProducts };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",

          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      return state;
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
