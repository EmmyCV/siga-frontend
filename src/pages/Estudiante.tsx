import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Horario from "../components/Horario";
import Perfil from "../components/Perfil";
import Pensum from "../components/Pensum";
import Deudas from "../components/Deudas";
import MateriasMatriculadas from "../components/MateriasMatriculadas";
import Calificaciones from "../components/Calificaciones";

const Estudiante: React.FC = () => {
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
              {/* Componente dotlottie-player */}
              <dotlottie-player
                src="https://lottie.host/de333b39-0606-4c31-aab8-ba6610931371/U9NtCj9nbT.lottie"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
              ></dotlottie-player>
              <h1 className="text-3xl font-bold mt-6 text-gray-700 text-center">
                ¡Bienvenido al Apartado de Estudiante!
              </h1>
              <p className="mt-4 text-gray-500 text-center">
                Explora tu horario, materias, calificaciones y mucho más.
              </p>
            </div>
          )}
          {seccion === "Horario" && <Horario />}
          {seccion === "Perfil" && <Perfil />}
          {seccion === "Pensum" && <Pensum />}
          {seccion === "Deudas" && <Deudas />}
          {seccion === "Materias" && <MateriasMatriculadas />}
          {seccion === "Calificaciones" && <Calificaciones />}
        </main>
      </div>
    </div>
  );
};

export default Estudiante;
