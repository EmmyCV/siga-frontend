import React, { useEffect, useState } from "react";
import { fetchDeudasEstudiante } from "../services/api";

interface Deuda {
  deuda_id: number;
  concepto: string;
  monto: number;
  estado: string;
  fecha_generacion: string;
}

const Deudas: React.FC = () => {
  const [deudas, setDeudas] = useState<Deuda[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDeudas = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
        const usuario = JSON.parse(storedData.usuario || "{}");
        const idUsuario = usuario.usuarioid;

        if (!idUsuario) {
          throw new Error("No se encontró el ID del usuario en localStorage.");
        }

        const deudasData = await fetchDeudasEstudiante(idUsuario);
        setDeudas(deudasData.deudas || []);
        setLoading(false);
      } catch (error: any) {
        console.error("Error al cargar las deudas:", error);
        setError(
          error.message || "Error al cargar las deudas. Intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    cargarDeudas();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando deudas...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (deudas.length === 0) {
    return <p className="text-center text-gray-500">No tienes deudas registradas.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Deudas del Estudiante</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2 text-center">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Concepto</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Monto</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Estado</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {deudas.map((deuda, index) => (
              <tr key={deuda.deuda_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-left">{deuda.concepto}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  ${deuda.monto.toLocaleString("es-CO")}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-center font-medium ${
                    deuda.estado === "Pagada" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {deuda.estado}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {new Date(deuda.fecha_generacion).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deudas;
