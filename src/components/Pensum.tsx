import React, { useEffect, useState } from "react";
import { fetchPensumEstudiante } from "../services/api";

interface Materia {
  materiaid__materiaid: number;
  materiaid__nombremateria: string;
  materiaid__creditos: number;
}

interface PensumData {
  materias_obligatorias: Materia[];
  materias_electivas: Materia[];
}

const Pensum: React.FC = () => {
  const [pensum, setPensum] = useState<PensumData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarPensum = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
        const usuario = JSON.parse(storedData.usuario || "{}");
        const idUsuario = usuario.usuarioid;

        if (!idUsuario) {
          throw new Error("No se encontró el ID del usuario en localStorage.");
        }

        const pensumData = await fetchPensumEstudiante(idUsuario);
        setPensum(pensumData);
        setLoading(false);
      } catch (error: any) {
        console.error("Error al cargar el pensum:", error);
        setError(
          error.message || "Error al cargar el pensum. Intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    cargarPensum();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando pensum...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!pensum) {
    return <p className="text-center text-gray-500">No hay datos disponibles.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-600">
        Pensum del Estudiante
      </h2>
      <div className="space-y-10">
        {/* Materias obligatorias */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-700">
            Materias Obligatorias
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pensum.materias_obligatorias.map((materia) => (
              <div
                key={materia.materiaid__materiaid}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-300 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-bold text-lg text-gray-800">
                  {materia.materiaid__nombremateria}
                </h4>
                <p className="text-gray-600">Créditos: {materia.materiaid__creditos}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Materias electivas */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-700">
            Materias Electivas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pensum.materias_electivas.map((materia) => (
              <div
                key={materia.materiaid__materiaid}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-300 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-bold text-lg text-gray-800">
                  {materia.materiaid__nombremateria}
                </h4>
                <p className="text-gray-600">Créditos: {materia.materiaid__creditos}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pensum;
