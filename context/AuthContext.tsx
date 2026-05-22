"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextValue } from "@/types/auth";

const STORAGE_KEY = "smart-portal-admin";

const AdminCredentials = {
  email: "admin@gmail.com",
  password: "admin123",
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  const login = async (email: string, password: string) => {
    const success =
      email === AdminCredentials.email &&
      password === AdminCredentials.password;
    if (success && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsAdmin(true);
    }
    return success;
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
