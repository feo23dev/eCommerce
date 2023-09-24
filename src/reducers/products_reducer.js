import { act } from "react-dom/test-utils";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case "SIDEBAR_OPEN":
      return { ...state, isSidebarOpen: true };
    case "SIDEBAR_CLOSE":
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_ERROR:
      return { ...state, isError: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload, products_loading: false };

    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, single_product_loading: true };
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, single_product_error: true };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product: action.payload,
        single_product_loading: false,
        single_product_error: false,
      };
    default:
      throw new Error("Unknown action");
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
