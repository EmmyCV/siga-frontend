import React, { useEffect, useState } from "react";
import axios from "axios";

function InformacionAcademica({ estudianteId }) {
    const [informacionAcademica, setInformacionAcademica] = useState(null);

    useEffect(() => {
        // Solicitar información académica del estudiante al backend
        axios
            .get(`http://localhost:8000/academico/${estudianteId}/`)
            .then((response) => setInformacionAcademica(response.data))
            .catch((error) => console.error("Error al obtener la información académica:", error));
    }, [estudianteId]);

    if (!informacionAcademica) {
        return <p>Cargando información académica...</p>;
    }

    return (
        <div>
            <h1>Información Académica</h1>
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Semestre</th>
                        <th>Estado</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {informacionAcademica.materias.map((materia, index) => (
                        <tr key={index}>
                            <td>{materia.nombre}</td>
                            <td>{materia.semestre}</td>
                            <td>{materia.estado}</td>
                            <td>{materia.promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InformacionAcademica;
