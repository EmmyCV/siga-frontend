import React, { useEffect, useState } from "react";
import axios from "axios";

function PersonasTable() {
  const [personas, setPersonas] = useState([]);

  // Usamos useEffect para obtener los datos del backend cuando el componente se monta
  useEffect(() => {
    axios
      .get("http://localhost:8000/persona/") // Cambia la URL si tu API está en otro lugar
      .then((response) => {
        setPersonas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Personas Registradas</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo Documento</th>
            <th>Numero Documento</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.id}</td>
              <td>{persona.nombre}</td>
              <td>{persona.correo}</td>
              <td>{persona.tipodocumento}</td>
              <td>{persona.numerodocumento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonasTable;
