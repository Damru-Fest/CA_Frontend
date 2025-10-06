"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMe = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,

        { withCredentials: true }
      );
      if (response.data.data.user) {
        setUser(response.data.data.user);
      }
      return true;
    } catch (err) {}
  };

  const caSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/caForm`,
        data,
        { withCredentials: true }
      );
      console.log(response);
      return true;
    } catch (err) {}
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        await getMe();
        setLoading(false);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, caSubmit }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
