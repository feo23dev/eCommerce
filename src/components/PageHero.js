import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PageHero = ({ title, third = "" }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          {/* /home=> absolute path.  home => relative. slash sız yazarsan about/home a götürür */}
          <Link to="/home">Home</Link>/ {title} {third}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
