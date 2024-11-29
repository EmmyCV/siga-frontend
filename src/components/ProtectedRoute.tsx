import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedType: string; // Tipo permitido (e.g., "Estudiante", "Docente")
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedType, children }) => {
  // Extraer los datos del usuario desde localStorage
  const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuario = JSON.parse(storedData.usuario || "{}"); // Parsear el objeto anidado

  if (!usuario || !usuario.tipousuario) {
    // Si no hay usuario autenticado, redirige al login
    return <Navigate to="/" />;
  }

  if (usuario.tipousuario !== allowedType) {
    // Redirigir a la página principal correspondiente al tipo de usuario
    return <Navigate to={`/${usuario.tipousuario.toLowerCase()}`} />;
  }

  // Si todo está bien, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
