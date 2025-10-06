"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signupUser = async ({ name, email, pass, pass2, terms }) => {
    setLoading(true);
    const errors = [];
    if (!terms) errors.push("Accept the terms.");

    if (!pass) errors.push("Password is required.");
    else if (pass.length < 8)
      errors.push("Password must be at least 8 characters.");
    else if (!/[A-Z]/.test(pass))
      errors.push("Password must include at least one uppercase letter.");
    else if (!/[0-9]/.test(pass))
      errors.push("Password must include at least one number.");

    if (!pass2) errors.push("Please confirm your password.");
    else if (pass !== pass2) errors.push("Passwords do not match.");

    if (errors.length > 0) {
      setLoading(false);
      throw new Error(errors[0]);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        { name, email, pass },
        { withCredentials: true }
      );
      return true;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || err.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await getMe();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
