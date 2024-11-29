import React, { useEffect, useState } from "react";
import { fetchMateriasMatriculadas } from "../services/api";

interface Materia {
  materia_id: number;
  nombre_materia: string;
  creditos: number;
  estado: string;
  fecha_inscripcion: string;
}

const MateriasMatriculadas: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarMaterias = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
        const usuario = JSON.parse(storedData.usuario || "{}");
        const idUsuario = usuario.usuarioid;

        if (!idUsuario) {
          throw new Error("No se encontró el ID del usuario en localStorage.");
        }

        const materiasData = await fetchMateriasMatriculadas(idUsuario);
        setMaterias(materiasData.materias_matriculadas || []);
        setLoading(false);
      } catch (error: any) {
        console.error("Error al cargar las materias matriculadas:", error);
        setError(
          error.message || "Error al cargar las materias. Intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    cargarMaterias();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando materias matriculadas...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (materias.length === 0) {
    return <p className="text-center text-gray-500">No hay materias matriculadas.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Materias Matriculadas
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white text-base">
              <th className="border border-gray-300 px-4 py-2">Materia</th>
              <th className="border border-gray-300 px-4 py-2">Créditos</th>
              <th className="border border-gray-300 px-4 py-2">Estado</th>
              <th className="border border-gray-300 px-4 py-2">Fecha de Inscripción</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr
                key={materia.materia_id}
                className="hover:bg-gray-100 text-center"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {materia.nombre_materia}
                </td>
                <td className="border border-gray-300 px-4 py-2">{materia.creditos}</td>
                <td className="border border-gray-300 px-4 py-2">{materia.estado}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(materia.fecha_inscripcion).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MateriasMatriculadas;
