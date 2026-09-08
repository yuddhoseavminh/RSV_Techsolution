"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiClient, ApiError, getStoredToken, setStoredToken } from "./api-client";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  avatar_url?: string | null;
  status: string;
  roles: string[];
  permissions?: string[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company?: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClient: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeRoles = (rawRoles: any): string[] => {
    if (!rawRoles) return [];
    if (Array.isArray(rawRoles)) {
      return rawRoles.map((r) => (typeof r === "string" ? r : r.name));
    }
    return [];
  };

  const refreshUser = useCallback(async () => {
    const currentToken = getStoredToken();
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiClient<{ data: any }>("/auth/me");
      const userData = res.data;
      if (userData) {
        setUser({
          ...userData,
          roles: normalizeRoles(userData.roles)
        });
        setToken(currentToken);
      } else {
        setUser(null);
        setToken(null);
        setStoredToken(null);
      }
    } catch {
      // If token expired or invalid, clear it
      setUser(null);
      setToken(null);
      setStoredToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient<{
        message: string;
        data: {
          token: string;
          user: any;
        };
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      const authToken = res.data.token;
      const rawUser = res.data.user;
      const parsedUser: AuthUser = {
        ...rawUser,
        roles: normalizeRoles(rawUser.roles)
      };

      setStoredToken(authToken);
      setToken(authToken);
      setUser(parsedUser);

      return { success: true, user: parsedUser };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : (err as Error).message || "Login failed";
      return { success: false, error: message };
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const res = await apiClient<{
        message: string;
        data: {
          token: string;
          user: any;
        };
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const authToken = res.data.token;
      const rawUser = res.data.user;
      const parsedUser: AuthUser = {
        ...rawUser,
        roles: normalizeRoles(rawUser.roles)
      };

      setStoredToken(authToken);
      setToken(authToken);
      setUser(parsedUser);

      return { success: true, user: parsedUser };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : (err as Error).message || "Registration failed";
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiClient("/auth/logout", { method: "POST" });
      }
    } catch {
      // ignore network errors on logout
    } finally {
      setStoredToken(null);
      setToken(null);
      setUser(null);
    }
  };

  const roles = user?.roles ?? [];
  const isAdmin = roles.includes("admin") || roles.includes("manager");
  const isClient = roles.includes("client");
  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        isAdmin,
        isClient,
        login,
        register,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
