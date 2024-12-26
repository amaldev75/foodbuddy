import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Card from "./Card";
import Cardpage from "./Cardpage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Main from "./Main";
import PrivateRoute from "./PrivateRoute "; // Import PrivateRoute
import Profile from "./Profile";
import UpdatePassword from "./Updatepassword/UpdatePassword";
import CartPage from "./Cartpage/CartPage";
import AddressPage from "./AddressPage/AddressPage";
  


export default function AppRouter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading data

  useEffect(() => {
    const getUser = () => {
      axios
        .get("http://localhost:4000/api/data")
        .then((response) => {
          console.log("Success: Data transfer", response.data);
          setData(response.data);
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((err) => {
          console.log("Data Transfer Error:", err);
          setLoading(false);
        });
    };

    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="card" element={<Card data={data} />} />
        <Route
          path="/card/:id"
          element={
            <PrivateRoute>
              <Cardpage data={data} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/address" element={<AddressPage />} />
      </Routes>
    </>
  );
}
