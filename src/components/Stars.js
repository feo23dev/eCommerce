import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useState } from "react";
const Stars = ({ stars, reviews }) => {
  console.log("REVIEWSSS", reviews);
  const starArray = Array.from({ length: 5 }, (_, index) => {
    if (stars > index + 1) {
      return <BsStarFill></BsStarFill>;
    } else if (stars < index + 1 && stars > index) {
      return <BsStarHalf></BsStarHalf>;
    } else {
      return <BsStar></BsStar>;
    }
  });

  return (
    <Wrapper>
      {starArray} {` (${reviews} customer reviews)`}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
