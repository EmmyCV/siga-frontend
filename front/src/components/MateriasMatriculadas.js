import React, { useEffect, useState } from "react";
import axios from "axios";

function MateriasMatriculadas({ estudianteId }) {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al backend utilizando el ID del estudiante
    axios
      .get(`http://localhost:8000/materias_matriculadas/${estudianteId}/`)
      .then((response) => setMaterias(response.data))
      .catch((error) =>
        console.error("Error al obtener las materias matriculadas:", error)
      );
  }, [estudianteId]);

  return (
    <div>
      <h1>Materias Matriculadas</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre de la Materia</th>
            <th>Nombre del Grupo</th>
            <th>Horario</th>
            <th>Salón</th>
            <th>Semestre</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia, index) => (
            <tr key={index}>
              <td>{materia.codigo_materia}</td>
              <td>{materia.nombre_materia}</td>
              <td>{materia.nombre_grupo}</td>
              <td>{materia.horario}</td>
              <td>{materia.salon}</td>
              <td>{materia.semestre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MateriasMatriculadas;
