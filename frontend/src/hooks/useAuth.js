import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = Cookies.get("accessToken");

    if (storedUser && token) {
      checkAuth();
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem("user", JSON.stringify(userData));

    Cookies.set("accessToken", accessToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("lastPage");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await axios.get("/auth/token/verify", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.message === "Token is valid") {
        setIsAuthenticated(true);
      } else if (response.data.message === "No token provided") {
        console.error(response.data.message);
        alert("Please Sign in or Sign up first!");
      } else {
        console.error(response.data.message);
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // If there's an error (e.g., invalid token or expired token), log out the user
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
};

export default useAuth;
