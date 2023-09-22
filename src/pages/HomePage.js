import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import { Outlet } from "react-router-dom";
const HomePage = () => {
  return (
    <main>
      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>
      <Services></Services>
      <Contact></Contact>
    </main>
  );
};

export default HomePage;
