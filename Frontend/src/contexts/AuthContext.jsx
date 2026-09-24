import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, setToken } from '../api/client';
import { userApi } from '../api/userApi';

const USER_KEY = 'campusflow_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setTokenState] = useState(() => getToken() || null);

  useEffect(() => {
    if (token) setToken(token);
    else setToken(null);
  }, [token]);

  const login = useCallback(async (credentials) => {
    const data = await userApi.login(credentials);
    setTokenState(data.token);
    setUser(data.payload);
    localStorage.setItem(USER_KEY, JSON.stringify(data.payload));
    return data;
  }, []);

  const logout = useCallback(() => {
    setTokenState(null);
    setToken(null);
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const updateUser = useCallback((next) => {
    setUser(next);
    localStorage.setItem(USER_KEY, JSON.stringify(next));
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token && user), login, logout, updateUser }),
    [user, token, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}