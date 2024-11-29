import React, { useEffect, useState } from "react";
import { fetchMateriasDocente } from "../services/api";

interface Materia {
  materia_id: number;
  nombre_materia: string;
  horario: {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    aula: string;
  };
  estudiantes: { estudiante_id: number; nombre_completo: string }[];
}

const MateriasDocente: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [expandedMateria, setExpandedMateria] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarMaterias = async () => {
      try {
        // Obtener el usuario desde localStorage
        console.log("Obteniendo usuario desde localStorage...");
        const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
        console.log("Datos almacenados:", storedData);

        const usuario = JSON.parse(storedData.usuario || "{}");
        console.log("Usuario parseado:", usuario);

        const usuarioId = usuario.usuarioid;
        console.log("Usuario ID:", usuarioId);

        if (!usuarioId) {
          throw new Error("Usuario ID no encontrado en los datos.");
        }

        // Obtener las materias usando el usuarioID
        console.log("Obteniendo materias para usuarioId...");
        const data = await fetchMateriasDocente(usuarioId);
        console.log("Materias obtenidas:", data);

        setMaterias(data.materias_dictadas);
        setLoading(false);
      } catch (error: any) {
        console.error("Error al cargar las materias:", error);
        setError("Hubo un problema al cargar las materias. Intenta nuevamente.");
        setLoading(false);
      }
    };

    cargarMaterias();
  }, []);

  const toggleExpand = (materiaId: number) => {
    setExpandedMateria(expandedMateria === materiaId ? null : materiaId);
    console.log(`Materia ${materiaId} expandida:`, expandedMateria === materiaId ? "No" : "Sí");
  };

  if (loading) {
    console.log("Cargando materias...");
    return <p className="text-center text-gray-500">Cargando materias...</p>;
  }

  if (error) {
    console.log("Error encontrado:", error);
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (materias.length === 0) {
    console.log("No hay materias asignadas.");
    return <p className="text-center text-gray-500">No tienes materias asignadas.</p>;
  }

  console.log("Renderizando materias...");

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Materias Asignadas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((materia) => (
          <div
            key={materia.materia_id}
            className="bg-white shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
            onClick={() => toggleExpand(materia.materia_id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {materia.nombre_materia}
              </h3>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  expandedMateria === materia.materia_id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {expandedMateria === materia.materia_id ? "Colapsar" : "Expandir"}
              </span>
            </div>
            {expandedMateria === materia.materia_id && (
              <div className="mt-4 space-y-4">
                <div className="text-gray-600">
                  <strong>Horario:</strong>{" "}
                  {materia.horario.dia}, de {materia.horario.hora_inicio} a{" "}
                  {materia.horario.hora_fin} ({materia.horario.aula})
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-700">
                    Estudiantes:
                  </h4>
                  <ul className="space-y-1">
                    {materia.estudiantes.map((estudiante) => (
                      <li
                        key={estudiante.estudiante_id}
                        className="text-sm bg-gray-100 rounded p-2 text-gray-700"
                      >
                        {estudiante.nombre_completo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MateriasDocente;
