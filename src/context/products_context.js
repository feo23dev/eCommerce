import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  CLEAR_CART,
} from "../actions";

const initialState = {
  isSidebarOpen: true,
  isError: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState("false");

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}`);

        const data = await response.json();
        if (!response.ok) {
          throw new Error("HTTP 404 Error");
        }
        dispatch({ type: GET_PRODUCTS_BEGIN, payload: data });
        dispatch({ type: GET_PRODUCTS_SUCCESS });
        setIsLoading(false);
      } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR });
      }
    }
    getProducts();
  }, []);

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  return (
    <ProductsContext.Provider
      value={{ ...state, closeSidebar, openSidebar, isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
