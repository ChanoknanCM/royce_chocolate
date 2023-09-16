import React from "react";
import Information from "./project/Information";
import Login from "./project/Login";
import Signup from './project/Signup';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/auth";
import Product from "./project/Product";
import Home from "./project/Home";
import Layout from "./project/Layout";
import Payment from "./project/Payment";
import Receipt from "./project/Receipt";


const router = createBrowserRouter([
{
  element:<Layout/>,
  children:[
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/main",
      element: <Information />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/product",
      element: <Product/>,
    },
    {
      path: "/payment",
      element: <Payment/>,
    },
    {
      path: "/receipt",
      element: <Receipt/>,
    }
  ]
}
]);

function App() {
  return (
    <>
    <AuthContextProvider>
      <RouterProvider router={router} />;
    </AuthContextProvider>
    </>
  );
}

export default App;
