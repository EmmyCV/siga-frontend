import React, { useState } from "react";
import { FaUserTie, FaUserGraduate, FaUserCog, FaEye, FaEyeSlash } from "react-icons/fa";
import FormularioActualizar from "./FormularioActualizar"; // Importar el componente de formulario modal

const Perfil: React.FC = () => {
  // Obtener los datos del usuario desde localStorage
  const storedData = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuario = JSON.parse(storedData.usuario || "{}"); // Parsear la cadena JSON anidada

  // Estados
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Función para actualizar datos en el perfil y en localStorage
  const actualizarPerfil = (datosActualizados: any) => {
    const nuevoUsuario = { ...usuario, ...datosActualizados };
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        usuario: JSON.stringify(nuevoUsuario), // Actualizar la cadena JSON anidada
      })
    );
    window.location.reload(); // Refrescar la página para mostrar los cambios
  };

  // Determinar el ícono según el tipo de usuario
  const obtenerIcono = (tipoUsuario: string) => {
    switch (tipoUsuario) {
      case "Estudiante":
        return <FaUserGraduate className="text-blue-500 w-24 h-24" />;
      case "Docente":
        return <FaUserTie className="text-green-500 w-24 h-24" />;
      case "Administrador":
        return <FaUserCog className="text-red-500 w-24 h-24" />;
      default:
        return <FaUserCog className="text-gray-500 w-24 h-24" />;
    }
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      {/* Ícono del Usuario */}
      <div className="mb-4 flex flex-col items-center">
        {obtenerIcono(usuario.tipousuario)}
        <p className="text-lg font-medium text-gray-600 mt-2 capitalize">
          {usuario.tipousuario}
        </p>
      </div>

      {/* Información del Usuario */}
      <div className="w-full bg-white rounded-lg shadow p-4 space-y-4">
        <div>
          <span className="font-bold text-gray-600">Nombre:</span>{" "}
          <span className="text-gray-800">{usuario.nombre}</span>
        </div>
        <div>
          <span className="font-bold text-gray-600">Apellido:</span>{" "}
          <span className="text-gray-800">{usuario.apellido}</span>
        </div>
        <div>
          <span className="font-bold text-gray-600">Número de Documento:</span>{" "}
          <span className="text-gray-800">{usuario.numerodocumento}</span>
        </div>
        <div>
          <span className="font-bold text-gray-600">Correo:</span>{" "}
          <span className="text-gray-800">{usuario.correo}</span>
        </div>
        <div>
          <span className="font-bold text-gray-600">Teléfono:</span>{" "}
          <span className="text-gray-800">{usuario.telefono}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-600">Contraseña:</span>{" "}
          <span className="text-gray-800 ml-2">
            {mostrarContrasena ? usuario.contrasena : "********"}
          </span>
          <button
            onClick={() => setMostrarContrasena(!mostrarContrasena)}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Botón para abrir el formulario */}
      <button
        onClick={() => setMostrarFormulario(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Actualizar Datos
      </button>

      {/* Formulario flotante */}
      {mostrarFormulario && (
        <FormularioActualizar
          usuario={usuario}
          onClose={() => setMostrarFormulario(false)}
          onUpdate={actualizarPerfil}
        />
      )}
    </div>
  );
};

export default Perfil;
