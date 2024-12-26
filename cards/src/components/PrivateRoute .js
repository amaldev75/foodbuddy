import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/hooks/hook"; // Assuming you're using context for auth

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext(); // Get user from context

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If user is logged in, render the child component
};

export default PrivateRoute;
