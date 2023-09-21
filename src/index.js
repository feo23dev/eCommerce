import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//Navbar,Sidebar,Footer will be rendered in all pages
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  Root,
} from "./pages";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { Navbar, Sidebar, Footer } from "./components";
import Nav from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: [
      <Navbar key={1}></Navbar>,
      <Sidebar key={2}></Sidebar>,
      <Outlet key={4}></Outlet>,
      <Footer key={3}></Footer>,
    ],
    children: [
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "*",
        element: <Error></Error>,
      },
      {
        path: "products/:id",
        element: <SingleProduct></SingleProduct>,
      },
      {
        path: "private",
        element: <PrivateRoute></PrivateRoute>,
      },
    ],
  },
]);
root.render(
  <ProductsProvider>
    <RouterProvider router={router}>
      <App />{" "}
    </RouterProvider>
  </ProductsProvider>
);
