import React, { useState } from "react";
import { createUsuario } from "../services/api";

const RegistrarUsuario: React.FC = () => {
  const [formData, setFormData] = useState({
    tipodocumento: "",
    tipousuario: "",
    estadoconexion: "",
    autenticaciondospasos: false,
    nombre: "",
    apellido: "",
    numerodocumento: "",
    correo: "",
    telefono: "",
    contrasena: "",
    fecharegistro: "",
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nuevoUsuario = await createUsuario(formData);
      setMensaje(`Usuario ${nuevoUsuario.nombre} ${nuevoUsuario.apellido} registrado exitosamente.`);
      setFormData({
        tipodocumento: "",
        tipousuario: "",
        estadoconexion: "",
        autenticaciondospasos: false,
        nombre: "",
        apellido: "",
        numerodocumento: "",
        correo: "",
        telefono: "",
        contrasena: "",
        fecharegistro: "",
      }); // Reinicia el formulario
    } catch (error: any) {
      setMensaje("Error al registrar el usuario. Intenta nuevamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
          Registrar Usuario
        </h2>
        {mensaje && (
          <div className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4">
            {mensaje}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          {/* Tipo de Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              name="tipodocumento"
              value={formData.tipodocumento}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="PP">Pasaporte</option>
            </select>
          </div>
          {/* Número de Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              name="numerodocumento"
              value={formData.numerodocumento}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          {/* Tipo de Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
            <select
              name="tipousuario"
              value={formData.tipousuario}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Docente">Docente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          {/* Estado de Conexión */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado de Conexión</label>
            <select
              name="estadoconexion"
              value={formData.estadoconexion}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="En línea">En línea</option>
              <option value="Desconectado">Desconectado</option>
            </select>
          </div>
          {/* Autenticación en dos pasos */}
          <div className="col-span-2">
            <label className="inline-flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="autenticaciondospasos"
                checked={formData.autenticaciondospasos}
                onChange={handleCheckboxChange}
                className="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              Activar autenticación en dos pasos
            </label>
          </div>
          {/* Fecha de Registro */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Fecha de Registro</label>
            <input
              type="datetime-local"
              name="fecharegistro"
              value={formData.fecharegistro}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 text-sm"
            >
              Registrar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarUsuario;
