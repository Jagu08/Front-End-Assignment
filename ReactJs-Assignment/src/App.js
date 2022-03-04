import React, { useState } from "react";
import "./App.css";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Productinformation from "./Component/Productinformation";
import "./css-design/Layout.css";
import "./css-design/Products.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "./Component/Order";
const App = () => {
  return (
    <div>
      <ToastContainer position="bottom-center" timeout="3000" />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
         <Route path="/cart" exact element={<ProtectedRoutes><Cart /></ProtectedRoutes> } />
          <Route path="/orders" exact element={<ProtectedRoutes><Order /></ProtectedRoutes> } />
          <Route
            path="/productinformation/:productid"
            exact
            element={<Productinformation />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
