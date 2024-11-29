import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Perfil from "../components/Perfil";
import MateriasDocente from "../components/MateriasDocente"; 

const Docente: React.FC = () => {
  const [seccion, setSeccion] = useState<string>("Inicio");

  // Obtener el usuario desde localStorage para obtener el ID
  const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuario = JSON.parse(storedData.usuario || "{}"); // Parsear la cadena JSON anidada
  const usuarioId = usuario.usuarioid; // ID del docente

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
              {/* Nueva animación usando dotlottie-player */}
              <dotlottie-player
                src="https://lottie.host/b686a454-276f-484a-946d-0a8590bf0cac/C3B4X5sNhn.lottie"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
              ></dotlottie-player>
              <h1 className="text-3xl font-bold mt-6 text-gray-700 text-center">
                ¡Bienvenido al Apartado de Docente!
              </h1>
              <p className="mt-4 text-gray-500 text-center">
                Gestiona notas, materias, y más desde un solo lugar.
              </p>
            </div>
          )}
          {seccion === "Materias" && <MateriasDocente />}
          {seccion === "Perfil" && <Perfil />}
        </main>
      </div>
    </div>
  );
};

export default Docente;
