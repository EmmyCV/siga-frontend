import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const getHorarioEstudiante = async (estudianteId) => {
    const response = await axios.get(`${API_URL}obtener_horario_estudiante/${estudianteId}/`);
    return response.data;
};

export const getMateriasMatriculadas = async (estudianteId) => {
    const response = await axios.get(`${API_URL}obtener_materias_matriculadas/${estudianteId}/`);
    return response.data;
};

export const getMateriasDisponibles = async () => {
    const response = await axios.get(`${API_URL}obtener_materias_disponibles/`);
    return response.data;
};
