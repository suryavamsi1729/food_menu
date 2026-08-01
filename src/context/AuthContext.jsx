import { createContext, useState, useEffect } from "react";
import { STORAGE_KEYS } from "@/config/storage";
import { loginUser } from "@/services/authService";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
        setLoading(true);

        const response = await loginUser(email, password);

        const token = response.token;
        const user = response.user;

        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

        setToken(token);
        setUser(user);

    } 
    catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
    finally{
        setLoading(false);
    }
  };

  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

  };

  const value = {
    user,
    token,

    loading,

    login,
    logout,

    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};