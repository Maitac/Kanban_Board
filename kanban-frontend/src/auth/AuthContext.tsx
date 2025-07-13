


import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; 

interface User {
  userId: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
     
      try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); 
          setUser({
              userId: decodedToken.sub,
              username: decodedToken.username,
              email: decodedToken.email
          });
      } catch (e) {
          console.error("Error decodificando el token:", e);
          setToken(null);
          localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signin`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser({
          userId: decodedToken.sub,
          username: decodedToken.username,
          email: decodedToken.email
      });
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, username });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser({
          userId: decodedToken.sub,
          username: decodedToken.username,
          email: decodedToken.email
      });
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};