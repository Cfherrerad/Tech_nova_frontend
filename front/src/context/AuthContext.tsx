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
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormValuesType) => Promise<any>;
  register: (data: RegisterFormValuesType) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Cargar usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

const login = async (data: LoginFormValuesType) => {
  const res = await loginService(data);

  if (res?.user && res?.token) {
    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);

    // Actualizar estado
    setUser(res.user);

    // Redirigir al inicio
    router.push("/");
  }

  return res;
};

  const register = async (data: RegisterFormValuesType) => {
    const res = await registerService(data);
    return res;
  };

  const logout = () => {
    logoutService(); // limpia localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export { AuthContext };
