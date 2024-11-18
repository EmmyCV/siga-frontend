import React, { useEffect, useState } from "react";
import axios from "axios";

function MateriasDisponibles() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al backend
    axios
      .get("http://localhost:8000/materias_disponibles/")
      .then((response) => setMaterias(response.data))
      .catch((error) =>
        console.error("Error al obtener las materias disponibles:", error)
      );
  }, []);

  return (
    <div>
      <h1>Materias Disponibles</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Código de Materia</th>
            <th>Nombre de Materia</th>
            <th>Nombre de Grupo</th>
            <th>Cupo Disponible</th>
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
              <td>{materia.cupo_disponible}</td>
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

export default MateriasDisponibles;
