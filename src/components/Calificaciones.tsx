import React, { useEffect, useState } from "react";
import { fetchCalificacionesEstudiante } from "../services/api";

interface Calificacion {
  materia_id: number;
  nombre_materia: string;
  nota_parcial: number;
  nota_final: number;
  fecha_registro: string;
}

const Calificaciones: React.FC = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarCalificaciones = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
        const usuario = JSON.parse(storedData.usuario || "{}");
        const idUsuario = usuario.usuarioid;

        if (!idUsuario) {
          throw new Error("No se encontró el ID del usuario en localStorage.");
        }

        const calificacionesData = await fetchCalificacionesEstudiante(idUsuario);
        setCalificaciones(calificacionesData.historico_notas);
        setLoading(false);
      } catch (error: any) {
        console.error("Error al cargar las calificaciones:", error);
        setError(
          error.message || "Error al cargar las calificaciones. Intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    cargarCalificaciones();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando calificaciones...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!calificaciones.length) {
    return <p className="text-center text-gray-500">No hay calificaciones registradas.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Historial de Calificaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Materia</th>
              <th className="border border-gray-300 px-4 py-2">Nota Parcial</th>
              <th className="border border-gray-300 px-4 py-2">Nota Final</th>
              <th className="border border-gray-300 px-4 py-2">Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {calificaciones.map((calificacion) => (
              <tr key={calificacion.materia_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {calificacion.nombre_materia}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {calificacion.nota_parcial.toFixed(1)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {calificacion.nota_final.toFixed(1)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {new Date(calificacion.fecha_registro).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calificaciones;
