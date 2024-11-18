import React, { useEffect, useState } from "react";
import axios from "axios";

function Horario({ estudianteId }) {
  const [horario, setHorario] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al backend usando la URL correcta
    axios
      .get(`http://localhost:8000/horario_estudiante/1/`)
      .then((response) => setHorario(response.data))
      .catch((error) => console.error("Error al obtener el horario:", error));
  }, [estudianteId]);

  return (
    <div>
      <h1>Horario de Clases</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Horario</th>
            <th>Salón</th>
            <th>Semestre</th>
            <th>Docente</th>
          </tr>
        </thead>
        <tbody>
          {horario.map((clase, index) => (
            <tr key={index}>
              <td>{clase.nombre_materia}</td>
              <td>{clase.horario}</td>
              <td>{clase.salon}</td>
              <td>{clase.semestre}</td>
              <td>{clase.nombre_docente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Horario;
