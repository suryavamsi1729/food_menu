import { createContext, useState, useCallback, useMemo } from 'react';
import { STORAGE_KEYS } from '@/config/storage';
import { loginUser } from '@/services/authService';

const AuthContext = createContext(null);

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    return {
      token: null,
      user: null,
    };
  }
};

export const AuthProvider = ({ children }) => {
  const storedAuth = getStoredAuth();

  const [user, setUser] = useState(storedAuth.user);
  const [token, setToken] = useState(storedAuth.token);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);

      const response = await loginUser(email, password);

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      setToken(token);
      setUser(user);

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);

    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,

      loading,

      login,
      logout,

      isAuthenticated: !!token,
    }),
    [user, token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
