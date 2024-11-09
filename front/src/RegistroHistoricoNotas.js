import React, { useEffect, useState } from "react";
import axios from "axios";

function RegistroHistoricoNotas({ estudianteId }) {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/registro_historico_notas/1/`)
      .then((response) => setNotas(response.data))
      .catch((error) =>
        console.error("Error al obtener el registro histórico de notas:", error)
      );
  }, [estudianteId]);

  return (
    <div>
      <h1>Registro Histórico de Notas</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Código</th>
            <th>Materia</th>
            <th>Código de Materia</th>
            <th>Nota</th>
            <th>Periodo Académico</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.nombre_estudiante}</td>
              <td>{nota.codigo_estudiante}</td>
              <td>{nota.nombre_materia}</td>
              <td>{nota.codigo_materia}</td>
              <td>{nota.nota}</td>
              <td>{nota.periodo_academico}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistroHistoricoNotas;
