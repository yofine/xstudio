import React from 'react';
import { AuthProvider } from './AuthContext';
import { Outlet } from 'react-router-dom';

const AuthWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthWrapper;
