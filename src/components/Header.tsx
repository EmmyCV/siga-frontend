import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Obtener los datos del usuario desde localStorage
  const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuario = JSON.parse(storedData.usuario || "{}"); // Parsear la cadena JSON anidada

  const handleLogout = () => {
    // Limpiar localStorage y redirigir al login
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8 relative">
        {/* Espaciador izquierdo para centrar el título */}
        <div className="flex-1"></div>

        {/* Título centrado con animación progresiva */}
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide absolute left-1/2 transform -translate-x-1/2 flex space-x-2">
          <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] delay-[0.1s]">S</span>
          <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] delay-[0.2s]">I</span>
          <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] delay-[0.3s]">G</span>
          <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite] delay-[0.4s]">A</span>
        </h1>

        {/* Información del usuario y botón de logout */}
        <div className="flex items-center space-x-4">
          <span className="hidden sm:block text-sm md:text-base font-medium">
            {usuario.nombre}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm md:text-base font-semibold shadow-lg"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;