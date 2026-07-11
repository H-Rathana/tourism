import {
  createContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode }
from "jwt-decode";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  // ✅ LOGIN
  const login = (data) => {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

  };
  // ✅ UPDATE USER
const updateUser = (updatedUser) => {

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  setUser(updatedUser);

};
  // ✅ LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/login";

  };

  // ✅ CHECK TOKEN ON APP START
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    const storedUser =
      localStorage.getItem(
        "user"
      );

    // ❌ NO TOKEN
    if (!token) return;

    try {

      // ✅ DECODE TOKEN
      const decoded =
        jwtDecode(token);

      const currentTime =
        Date.now() / 1000;

      // ❌ TOKEN EXPIRED
      if (
        decoded.exp <
        currentTime
      ) {

        logout();

      } else {

        setUser(
          JSON.parse(storedUser)
        );

      }

    } catch (error) {

      logout();

    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};