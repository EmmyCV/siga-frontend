import React, { useEffect, useState } from "react";
import { fetchUsuarios, updateUsuario } from "../services/api";
import FormularioActualizar from "./FormularioActualizar";

interface Usuario {
  id: number;
  tipodocumento: string;
  tipousuario: string;
  nombre: string;
  apellido: string;
  numerodocumento: string;
  correo: string;
  telefono: string;
  estadoconexion: string;
  autenticaciondospasos: boolean;
  fecharegistro: string;
}

const ListarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await fetchUsuarios();
        setUsuarios(data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error al cargar los usuarios:", error);
        setError("Hubo un problema al cargar los usuarios. Intenta nuevamente.");
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  const handleCloseFormulario = () => {
    setUsuarioSeleccionado(null);
  };

  const handleActualizarUsuario = async (updatedUser: Usuario) => {
    try {
      // Realizar la actualización en la API
      const usuarioActualizado = await updateUsuario(updatedUser.id, updatedUser);

      // Actualizar el estado con el usuario modificado
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === updatedUser.id ? usuarioActualizado : usuario
        )
      );
      setUsuarioSeleccionado(null);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar el usuario. Intenta nuevamente.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (usuarios.length === 0) {
    return <p className="text-center text-gray-500">No hay usuarios registrados.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Gestión de Usuarios</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            onClick={() => setUsuarioSeleccionado(usuario)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {usuario.nombre} {usuario.apellido}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  usuario.estadoconexion === "En línea"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {usuario.estadoconexion}
              </span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Documento: {usuario.tipodocumento}</p>
            <p className="text-gray-600 text-sm">Número: {usuario.numerodocumento}</p>
            <p className="text-gray-600 text-sm">Correo: {usuario.correo}</p>
            <p className="text-gray-600 text-sm">Teléfono: {usuario.telefono}</p>
            <p className="text-gray-600 text-sm mt-2">
              Registro:{" "}
              {new Date(usuario.fecharegistro).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* FormularioActualizar */}
      {usuarioSeleccionado && (
        <FormularioActualizar
          usuario={usuarioSeleccionado}
          onClose={handleCloseFormulario}
          onUpdate={handleActualizarUsuario}
        />
      )}
    </div>
  );
};

export default ListarUsuarios;
