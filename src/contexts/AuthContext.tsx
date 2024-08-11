import React, { useState, useContext, createContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setLoggedUser: (_: User) => void;
  login: (token: string) => void;
  logout: () => void;
  setAccessToken: (_: string) => void;
  setNavigate: (_:any) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface User {
  username: string;
  permissions: any[];
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigate, setNavigate] = useState<((path: string) => void) | null>(null);


  useEffect(() => {
    console.log("useEffect AuthProvider")
    const token = getToken()
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [])


  const setLoggedUser = (user: User) => {
    setUser(user);
  };

  const setAccessToken = (token: string) => {
    setToken(token);
  };

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setToken(token);
    setIsLoggedIn(true);
    if (navigate) {
      navigate('/users');
    }
  };

  const logout = () => {
    console.log("logging out", {navigate})
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null)
    setIsLoggedIn(false);
    if (navigate) {
      navigate('/login');
    }
  };  

  return (
    <AuthContext.Provider value={{ loading, setNavigate, isLoggedIn, setLoggedUser, user, accessToken: token, setAccessToken, login, logout
     }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};