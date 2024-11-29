import React, { useState } from "react";
import { fetchUsuarios } from "../services/api";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError("");

    try {
      const usuarios = await fetchUsuarios();

      // Buscar el usuario por correo y contraseña
      const usuarioEncontrado = usuarios.find(
        (usuario: any) =>
          usuario.correo === correo && usuario.contrasena === contrasena
      );

      if (usuarioEncontrado) {
        // Guardar los datos del usuario en el formato correcto en localStorage
        localStorage.setItem(
          "usuario",
          JSON.stringify({
            usuario: JSON.stringify(usuarioEncontrado), // Guardar el usuario completo como cadena JSON
          })
        );

        // Redirigir según el tipo de usuario
        if (usuarioEncontrado.tipousuario === "Estudiante") {
          window.location.href = "/estudiante";
        } else if (usuarioEncontrado.tipousuario === "Docente") {
          window.location.href = "/docente";
        }else if (usuarioEncontrado.tipousuario === "Administrador") {
          window.location.href = "/administrador";
        } else {
          setMensajeError("Tipo de usuario no válido.");
        }
      } else {
        setMensajeError("Correo o contraseña incorrectos.");
      }
    } catch (error) {
      setMensajeError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu contraseña"
              required
            />
          </div>
          {mensajeError && (
            <p className="text-red-500 text-sm text-center">{mensajeError}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
