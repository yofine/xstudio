import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from './layout/BaseLayout';
import Login from './pages/Login';
import routes from './routes';
import AuthWrapper from './AuthWrapper';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AuthWrapper />, // 包裹 AuthProvider 和 RouterProvider
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Layout />,
            children: routes,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
