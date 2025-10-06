/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loginUser as loginService,
  registerUser as registerService,
  logoutUser as logoutService,
} from "@/services/auth.services";
import type { LoginFormValuesType } from "@/validators/loginSchema";
import type { RegisterFormValuesType } from "@/validators/registerSchema";

type User = {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatar?: string;
  role?: string;
  status?: string;
  lastLogin?: string;
  [key: string]: any;
};

interface AuthContextType {
  user: User | null;
  token: string | null; // 👈 añadido
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormValuesType) => Promise<any>;
  register: (data: RegisterFormValuesType) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // 👈 añadido
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Cargar usuario y token desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);

    setLoading(false);
  }, []);

  // 🔹 Login
  const login = async (data: LoginFormValuesType) => {
    const res = await loginService(data);

    if (res?.user && res?.token) {
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);

      setUser(res.user);
      setToken(res.token);

      router.push("/");
    }

    return res;
  };

  // 🔹 Registro
  const register = async (data: RegisterFormValuesType) => {
    const res = await registerService(data);
    return res;
  };

  // 🔹 Logout
  const logout = () => {
    logoutService();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  // 🔹 Valor del contexto
  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export { AuthContext };
