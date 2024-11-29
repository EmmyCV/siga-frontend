import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Perfil from "../components/Perfil"; // Importación del componente Perfil
import Registrar from "../components/RegistrarUsuario";
import ListarUsuarios from "../components/ListarUsuarios";

const Administrador: React.FC = () => {
  const [seccion, setSeccion] = useState<string>("Inicio");

  return (
    <div className="flex h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar setSeccion={setSeccion} />

      {/* Contenido principal */}
      <div className="flex-1">
        <Header />
        <main className="p-6">
          {seccion === "Inicio" && (
            <div className="flex flex-col items-center justify-center h-full">
              {/* Animación usando dotlottie-player */}
              <dotlottie-player
                src="https://lottie.host/9c7193ad-3bd0-407e-8d47-47b0181640f4/CVlKL0pVMz.lottie"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
              ></dotlottie-player>
              <h1 className="text-3xl font-bold mt-6 text-gray-700 text-center">
                ¡Bienvenido al Apartado de Administrador!
              </h1>
              <p className="mt-4 text-gray-500 text-center">
                Gestiona usuarios, materias, y más desde un solo lugar.
              </p>
            </div>
          )}
          {seccion === "Usuarios" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-700">Gestión de Usuarios</h2>
              {/* Aquí iría el contenido de la gestión de usuarios */}
            </div>
          )}
          {seccion === "Materias" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-700">Gestión de Materias</h2>
              {/* Aquí iría el contenido de la gestión de materias */}
            </div>
          )}
          {seccion === "Perfil" && <Perfil />} {/* Nueva sección para el perfil */}
          {seccion === "Registrar" && <Registrar />}
          {seccion === "Usuarios" && <ListarUsuarios />}
        </main>
      </div>
    </div>
  );
};

export default Administrador;
