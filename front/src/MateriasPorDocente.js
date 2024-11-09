import React, { useEffect, useState } from "react";
import axios from "axios";

function MateriasPorDocente() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al backend
    axios
      .get("http://localhost:8000/materias_por_docente/")
      .then((response) => setMaterias(response.data))
      .catch((error) =>
        console.error("Error al obtener las materias por docente:", error)
      );
  }, []);

  return (
    <div>
      <h1>Materias Dictadas por Docentes</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Nombre del Docente</th>
            <th>Tipo de Docente</th>
            <th>Nombre de Materia</th>
            <th>Código de Materia</th>
            <th>Número de Créditos</th>
            <th>Nombre de Grupo</th>
            <th>Horario</th>
            <th>Salón</th>
            <th>Semestre</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia, index) => (
            <tr key={index}>
              <td>{materia.nombre_docente}</td>
              <td>{materia.tipo_docente}</td>
              <td>{materia.nombre_materia}</td>
              <td>{materia.codigo_materia}</td>
              <td>{materia.numero_creditos}</td>
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

export default MateriasPorDocente;
