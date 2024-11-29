import React, { useState } from "react";
import { updateUsuario } from "../services/api";

interface FormularioActualizarProps {
  usuario: any;
  onClose: () => void; // Función para cerrar el formulario
  onUpdate: (updatedUser: any) => void; // Función para actualizar el perfil
}

const FormularioActualizar: React.FC<FormularioActualizarProps> = ({
  usuario,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    telefono: usuario.telefono,
    contrasena: usuario.contrasena,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Determinar el ID del usuario desde las props o desde localStorage
      const usuarioId = usuario.id || usuario.usuarioid;
  
      if (!usuarioId) {
        throw new Error("No se pudo determinar el ID del usuario.");
      }
  
      // Combinar los datos del usuario con los nuevos datos actualizados
      const datosCompletos = {
        ...usuario, // Datos actuales (propios del usuario recibido)
        ...formData, // Datos modificados desde el formulario
      };
  
      // Hacer la petición PUT para actualizar el usuario
      const datosActualizados = await updateUsuario(usuarioId, datosCompletos);
  
      // Actualizar el estado del usuario en el componente padre
      onUpdate(datosActualizados);
  
      // Actualizar localStorage solo si es el usuario logueado
      const usuarioLocalStorage = JSON.parse(
        JSON.parse(localStorage.getItem("usuario") || "{}").usuario || "{}"
      );
  
      if (usuarioId === usuarioLocalStorage.usuarioid) {
        localStorage.setItem(
          "usuario",
          JSON.stringify({ usuario: JSON.stringify(datosActualizados) })
        );
      }
  
      alert("Datos actualizados correctamente.");
    } catch (error: any) {
      console.error("Error al actualizar los datos:", error);
      alert(
        "Hubo un problema al actualizar los datos. Por favor, inténtalo nuevamente."
      );
    }
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Actualizar Datos</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioActualizar;