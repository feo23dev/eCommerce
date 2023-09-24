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
  products_loading: false,
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("State", state);

  useEffect(() => {
    async function getProducts() {
      try {
        dispatch({ type: GET_PRODUCTS_BEGIN });
        const response = await fetch(`${url}`);

        const data = await response.json();
        if (!response.ok) {
          throw new Error("HTTP 404 Error");
        }

        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR });
      }
    }
    getProducts();
  }, []);

  const fetchSingleProduct = async (url, id) => {
    console.log("FetchingSİngleProduct is Running!");
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    console.log("ID IM FETCHING IS ", id);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error fetching the Single Product");
      }
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        closeSidebar,
        openSidebar,
        dispatch,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
