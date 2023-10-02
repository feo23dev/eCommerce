import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext();

  if (filtered_products.length < 1) {
    return <h5>Sorry,No Products matched your search</h5>;
  }
  if (grid_view === false) {
    return <ListView filtered_products={filtered_products}></ListView>;
  }
  return (
    <GridView filtered_products={filtered_products}>product list</GridView>
  );
};

export default ProductList;
