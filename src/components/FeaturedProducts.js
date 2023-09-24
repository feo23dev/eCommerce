import React, { useEffect } from "react";
import { useProductsContext } from "../context/products_context";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";
import { CLEAR_CART } from "../actions";

const FeaturedProducts = () => {
  const { products, isError, products_loading } = useProductsContext();

  const navigate = useNavigate();
  console.log("IsError", isError);

  let productsToFeature = [];
  let featuredProducts = [];
  if (products_loading) {
    return <h1>LOADINGGGGGG</h1>;
  }
  if (products) {
    products.map((product) => {
      if (product.featured === true) {
        featuredProducts.push(product);
      }
    });
    while (productsToFeature.length < 3) {
      const randomNumber = Math.floor(Math.random() * featuredProducts.length);
      const randomlySelectedItem = featuredProducts[randomNumber];
      if (!productsToFeature.includes(randomlySelectedItem)) {
        productsToFeature.push(randomlySelectedItem);
      }
    }
    console.log("FEATUREDPRODUCTS", featuredProducts);
  }

  return (
    <>
      {isError ? (
        <Error></Error>
      ) : (
        <Wrapper className="section">
          <div className="title">
            <h2>featured products</h2>
            <div className="underline"></div>
          </div>
          <div className="section-center featured">
            <div className="featured section-center">
              {productsToFeature &&
                productsToFeature.map((item) => {
                  return <Product key={item.id} {...item}></Product>;
                })}
            </div>
          </div>
          <button className="btn" onClick={() => navigate("/products")}>
            all products
          </button>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;

    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }

  @media (min-width: 576px) {
    .featured {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default FeaturedProducts;
