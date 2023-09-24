import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const {
    fetchSingleProduct,
    single_product_loading,
    single_product_error,
    single_product,
  } = useProductsContext();
  const { id } = useParams();

  const {
    name,
    price,
    description,
    stock,
    stars,
    review,
    sku,
    company,
    images,
  } = single_product;

  useEffect(() => {
    fetchSingleProduct(url, id);
    console.log("Fetch completed");
  }, []);
  console.log("IMAAAGESSS", images);

  if (single_product_error) {
    return <Error></Error>;
  }
  if (single_product_loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <Wrapper>
        <PageHero title={"products"} third={`/ ${name}`}></PageHero>

        {images && (
          <div className="section-center section page">
            <Link className="btn" to="/products">
              Back to products
            </Link>
            <div className="product-center">
              <ProductImages images={images}></ProductImages>
              <section className="content">
                <h2>{name}</h2>
                <Stars stars={stars} />
                <h5 className="price">{formatPrice(price)}</h5>
                <p className="desc">{description}</p>
                <p className="info">
                  <span>Available : </span>
                  {stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <p className="info">
                  <span>SKU : </span>
                  {id}
                </p>
                <p className="info">
                  <span>Brand : </span>
                  {company}
                </p>
                <hr></hr>
                {stock > 0 && <AddToCart></AddToCart>}
              </section>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
