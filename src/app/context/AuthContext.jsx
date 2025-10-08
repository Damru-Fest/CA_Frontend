"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState(false);
  const getMe = async () => {
    try {
      const response = await axios.get("/auth/me");
      if (response.data.data.user) {
        setUser(response.data.data.user);
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const caSubmit = async (data) => {
    try {
      const response = await axios.post("/auth/caForm", data);
      // Update app state to reflect successful submission
      setApp(true);
      return true;
    } catch (err) {
      console.error("Error submitting CA form:", err);
      return false;
    }
  };

  const caGet = async () => {
    try {
      const response = await axios.get("/auth/caForm");
      if (response?.data?.message === "Application found") {
        setApp(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await getMe();
        await caGet();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, caSubmit, app }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
