// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verificamos si el token está presente en el localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, redirigimos al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, mostramos las rutas hijas (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
