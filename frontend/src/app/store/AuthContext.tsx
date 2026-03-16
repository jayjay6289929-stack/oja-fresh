import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialise from localStorage so auth persists across page refreshes
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("oja_fresh_token")
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem("oja_fresh_user");
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  });

  const persist = (tok: string, usr: AuthUser) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem("oja_fresh_token", tok);
    localStorage.setItem("oja_fresh_user", JSON.stringify(usr));
  };

  const clear = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("oja_fresh_token");
    localStorage.removeItem("oja_fresh_user");
  };

  const authFetch = async (path: string, body: object) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Request failed" }));
      throw new Error(err.detail ?? "Request failed");
    }
    return res.json();
  };

  const login = useCallback(async (email: string, password: string) => {
    const data = await authFetch("/auth/login", { email, password });
    persist(data.access_token, data.user);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const data = await authFetch("/auth/register", { email, password });
    persist(data.access_token, data.user);
  }, []);

  const logout = useCallback(() => clear(), []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};