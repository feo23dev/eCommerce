import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useState } from "react";
const Stars = ({ stars }) => {
  const [starState, setStarState] = useState(stars);
  const starArray = Array.from({ length: 5 }, (_, index) => {
    if (starState > index + 1) {
      return <BsStarFill></BsStarFill>;
    } else if (starState < index + 1 && starState > index) {
      return <BsStarHalf></BsStarHalf>;
    } else {
      return <BsStar></BsStar>;
    }
  });

  return (
    <Wrapper>
      <h4>Stars: {stars}</h4>
      {starArray}
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
