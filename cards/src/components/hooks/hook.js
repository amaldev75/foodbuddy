import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCartContext } from "./CartContext";

const AuthContext = createContext({
  user: null,
  setUserFromStorage: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const { clearCart } = useCartContext();
  const [user, setUser] = useState(null);

  console.log("AuthProvider user::", user);
  console.log("clearCart function in AuthProvider:", clearCart);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser._id && parsedUser.email) {
          setUser(parsedUser);
        } else {
          console.warn("Invalid user data in localStorage. Clearing it.");
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const setUserFromStorage = (userData) => {
    if (userData && userData.email) {
      const normalizedUserData = { ...userData };
      setUser(normalizedUserData);
      localStorage.setItem("user", JSON.stringify(normalizedUserData));
    } else {
      console.error("Invalid user data provided:", userData);
    }
  };

  const logout = () => {
    setUser(null);
    if (clearCart) {
      clearCart(); // Clear cart on logout
    } else {
      console.warn("clearCart function is not available. Skipping cart cleanup.");
    }
    localStorage.removeItem("user");
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider value={{ user, setUserFromStorage, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
