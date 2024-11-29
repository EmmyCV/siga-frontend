import React, { useEffect, useState } from "react";
import { fetchHorarioEstudiante } from "../services/api";

interface HorarioItem {
  materia: string;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  aula: string;
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const Horario: React.FC = () => {
  const [horario, setHorario] = useState<HorarioItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarHorario = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
        const usuario = JSON.parse(storedData.usuario || "{}"); // Parsear la cadena JSON anidada
        const horarioData = await fetchHorarioEstudiante(usuario.usuarioid);
        setHorario(horarioData);
      } catch (error) {
        setError("Error al cargar el horario. Intenta de nuevo más tarde.");
      }
    };

    cargarHorario();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const obtenerHoras = () => {
    const horas = horario.map((item) => `${item.hora_inicio}-${item.hora_fin}`);
    return Array.from(new Set(horas)).sort();
  };

  const horasUnicas = obtenerHoras();

  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Horario de Clases</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-xs shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white text-sm">
              <th className="border border-gray-300 px-2 py-1 text-center">Hora</th>
              {diasSemana.map((dia) => (
                <th key={dia} className="border border-gray-300 px-2 py-1 text-center">
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horasUnicas.map((hora, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-2 py-1 text-center bg-gray-100 font-medium">
                  {hora}
                </td>
                {diasSemana.map((dia) => (
                  <td
                    key={dia}
                    className="border border-gray-300 px-2 py-1 text-center align-top"
                  >
                    {horario
                      .filter(
                        (item) =>
                          `${item.hora_inicio}-${item.hora_fin}` === hora &&
                          item.dia === dia
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md p-2 mb-1 shadow-sm"
                        >
                          <div className="font-semibold text-sm">{item.materia}</div>
                          <div className="text-xs">
                            <span className="font-medium">Aula:</span> {item.aula}
                          </div>
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista para móviles */}
      <div className="md:hidden">
        {horasUnicas.map((hora, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="text-base font-bold mb-2 bg-gray-200 text-center py-1 rounded-md">
              {hora}
            </h3>
            {diasSemana.map((dia) => (
              <div key={dia} className="mb-2">
                <h4 className="text-xs font-semibold text-gray-600">{dia}</h4>
                {horario
                  .filter(
                    (item) =>
                      `${item.hora_inicio}-${item.hora_fin}` === hora && item.dia === dia
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 rounded-md p-2 shadow-sm mb-1 text-xs"
                    >
                      <div className="font-bold text-blue-800">{item.materia}</div>
                      <div className="text-gray-700">
                        <span className="font-medium">Aula:</span> {item.aula}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Horario;
