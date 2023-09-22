import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1>404</h1>
      <h3>Sorry the page you tried cannot be found</h3>
      <button className="btn" onClick={() => navigate("home")}>
        Back Home
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
