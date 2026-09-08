"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { apiClient, clearStoredToken, getStoredToken, setStoredToken } from "@/lib/api-client";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  status?: string;
  roles?: string[];
  permissions?: string[];
};

type AuthPayload = {
  user: AuthUser;
  token: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (payload: Record<string, string>) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
  setUser: (user: AuthUser) => void;
  hasAnyRole: (roles: string[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentToken = getStoredToken();

    if (!currentToken) {
      setToken(null);
      setUserState(null);
      setIsLoading(false);
      return null;
    }

    try {
      setToken(currentToken);
      const nextUser = await apiClient<AuthUser>("/auth/me");
      setUserState(nextUser);
      return nextUser;
    } catch {
      clearStoredToken();
      setToken(null);
      setUserState(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const payload = await apiClient<AuthPayload>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    setStoredToken(payload.token);
    setToken(payload.token);
    setUserState(payload.user);
    return payload.user;
  }, []);

  const register = useCallback(async (payload: Record<string, string>) => {
    const response = await apiClient<AuthPayload>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    setStoredToken(response.token);
    setToken(response.token);
    setUserState(response.user);
    return response.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      if (getStoredToken()) {
        await apiClient<null>("/auth/logout", { method: "POST" });
      }
    } finally {
      clearStoredToken();
      setToken(null);
      setUserState(null);
    }
  }, []);

  const setUser = useCallback((nextUser: AuthUser) => {
    setUserState(nextUser);
  }, []);

  const hasAnyRole = useCallback(
    (roles: string[]) => {
      const currentRoles = user?.roles ?? [];
      return roles.some((role) => currentRoles.includes(role));
    },
    [user]
  );

  const value = useMemo(
    () => ({ user, token, isLoading, login, register, logout, refreshUser, setUser, hasAnyRole }),
    [user, token, isLoading, login, register, logout, refreshUser, setUser, hasAnyRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export function RequireAuth({
  children,
  roles,
  redirectTo = "/login"
}: {
  children: React.ReactNode;
  roles?: string[];
  redirectTo?: string;
}) {
  const { user, isLoading, hasAnyRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (roles?.length && !hasAnyRole(roles)) {
      router.replace("/portal/dashboard");
    }
  }, [hasAnyRole, isLoading, pathname, redirectTo, roles, router, user]);

  if (isLoading || !user || (roles?.length && !hasAnyRole(roles))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-medium text-slate-600">
        Loading account...
      </div>
    );
  }

  return children;
}
