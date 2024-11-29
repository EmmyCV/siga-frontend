export const API_URL = "http://127.0.0.1:8000/api";

// Función genérica para realizar peticiones a la API
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// Función específica para obtener usuarios
export async function fetchUsuarios() {
  return await apiRequest("usuarios");
}

// Obtener horario del estudiante
export async function fetchHorarioEstudiante(idEstudiante: number) {
  return await apiRequest(`horarios/horario-estudiante/${idEstudiante}/`);
}

// Función para actualizar datos del usuario
export async function updateUsuario(usuarioId: number, datosActualizados: any) {
  try {
    console.log("Datos enviados al servidor:", datosActualizados); // Debugging

    // Realizamos la petición PUT
    const response = await fetch(`${API_URL}/usuarios/${usuarioId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    // Manejo de errores del servidor
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error del servidor:", errorMessage);
      throw new Error(`Error del servidor: ${response.statusText}`);
    }

    // Retornamos los datos actualizados
    return await response.json();
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    throw error;
  }
}

//Obtener pensum del estudiante
export async function fetchPensumEstudiante(idEstudiante: number) {
  return await apiRequest(`pensums/pensum-estudiante/${idEstudiante}/`);
}

// Obtener deudas del estudiante
export async function fetchDeudasEstudiante(idEstudiante: number) {
  return await apiRequest(`deudas/deudas-estudiante/${idEstudiante}/`);
}

// Obtener materias matriculadas del estudiante
export async function fetchMateriasMatriculadas(idEstudiante: number) {
  return await apiRequest(`inscripciones/materias-estudiante/${idEstudiante}/`);
}

// Obtener el historial de calificaciones del estudiante
export async function fetchCalificacionesEstudiante(idEstudiante: number) {
  return await apiRequest(`calificaciones/historico-estudiante/${idEstudiante}/`);
}

// Registrar un nuevo usuario
export async function createUsuario(datosUsuario: any) {
  try {
    const response = await fetch(`${API_URL}/usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar el usuario:", errorMessage);
      throw new Error(`Error al registrar el usuario: ${response.statusText}`);
    }

    return await response.json(); // Devuelve el usuario creado
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
}

// Obtener materias dictadas por el docente basado en usuarioID
export async function fetchMateriasDocente(usuarioId: number) {
  return await apiRequest(`horarios/materias-docente/${usuarioId}`);
}




