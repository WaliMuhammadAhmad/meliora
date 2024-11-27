import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = "http://localhost:3001";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAccessTokenExpired = (token) => {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

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
      httpOnly: true,
    });

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const refreshResponse = await axios.post("/auth/token/verify", {
        token: refreshToken,
      });

      if (
        refreshResponse.status === 200 &&
        refreshResponse.data.message === "Token is valid"
      ) {
        if (isAccessTokenExpired(accessToken)) {
          const newTokenResponse = await axios.post("/auth/token/refresh", {
            token: refreshToken,
          });

          const newAccessToken = newTokenResponse.data.accessToken;
          Cookies.set("accessToken", newAccessToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      logout();
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
