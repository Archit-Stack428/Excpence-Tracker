import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Default value null rakhna zyada safe hai
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data);
    return response.data;
  };

  const signup = async (name, email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Value object explicitly define kar diya hai
  const value = { user, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) { // Null check zyada reliable hai
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};