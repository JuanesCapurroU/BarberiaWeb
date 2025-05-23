import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAdmin = !!localStorage.getItem('admin');
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
