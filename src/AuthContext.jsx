import React, { createContext, useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const login = (email,password) => {
    setIsAuthenticated(true);
    console.log("email:"+email + "  password:" + password)
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/prompt'); // 登录后跳转到主页面
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // 退出后返回登录页
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
