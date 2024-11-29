import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaGraduationCap,
  FaDollarSign,
  FaChalkboardTeacher,
  FaClipboardList,
  FaUserPlus,
  FaUsers,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";

interface MenuOption {
  name: string;
  icon: JSX.Element;
  section: string;
}

type MenuOptions = {
  Estudiante: MenuOption[];
  Docente: MenuOption[];
  Administrador: MenuOption[];
};

interface SidebarProps {
  setSeccion: (seccion: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSeccion }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("Inicio");

  const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuario = JSON.parse(storedData.usuario || "{}");
  const tipoUsuario: string = usuario.tipousuario || "";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuOptions: MenuOptions = {
    Estudiante: [
      { name: "Inicio", icon: <FaHome />, section: "Inicio" },
      { name: "Perfil", icon: <FaUser />, section: "Perfil" },
      { name: "Horario", icon: <FaCalendarAlt />, section: "Horario" },
      { name: "Materias", icon: <FaBook />, section: "Materias" },
      { name: "Pensum", icon: <FaClipboardList />, section: "Pensum" },
      { name: "Calificaciones", icon: <FaGraduationCap />, section: "Calificaciones" },
      { name: "Deudas", icon: <FaDollarSign />, section: "Deudas" },
    ],
    Docente: [
      { name: "Inicio", icon: <FaHome />, section: "Inicio" },
      { name: "Perfil", icon: <FaUser />, section: "Perfil" },
      { name: "Materias", icon: <FaChalkboardTeacher />, section: "Materias" },
    ],
    Administrador: [
      { name: "Inicio", icon: <FaHome />, section: "Inicio" },
      { name: "Perfil", icon: <FaUser />, section: "Perfil" },
      { name: "Usuarios", icon: <FaUsers />, section: "Usuarios" },
      { name: "Registrar", icon: <FaUserPlus />, section: "Registrar" },
    ],
  };

  const opciones: MenuOption[] = menuOptions[tipoUsuario as keyof MenuOptions] || [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white fixed h-screen top-0 left-0 z-50 transition-all duration-300`}
      >
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
          >
            {isOpen ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        <nav className="mt-6 flex-1 overflow-y-auto space-y-4">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => {
                setSeccion(opcion.section);
                setActiveSection(opcion.section);
              }}
              className={`flex items-center gap-4 px-4 py-2 hover:bg-gray-700 rounded transition-all duration-200 w-full text-left ${
                activeSection === opcion.section ? "bg-gray-700" : ""
              }`}
            >
              {opcion.icon}
              {isOpen && <span className="text-sm">{opcion.name}</span>}
            </button>
          ))}
        </nav>
        <div className="mb-4">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="flex items-center gap-4 px-4 py-2 hover:bg-red-600 bg-red-500 rounded transition-all duration-200 w-full justify-center"
          >
            {isOpen ? "Cerrar Sesión" : <FaUser />}
          </button>
        </div>
      </div>

      {/* Espacio reservado para el contenido */}
      <div
        className={`flex-1 ml-0 ${isOpen ? "md:ml-64" : "md:ml-16"} transition-all duration-300`}
      >
        <div className="p-6">
          {/* Aquí va el contenido */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
