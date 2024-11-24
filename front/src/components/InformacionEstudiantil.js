import React, { useEffect, useState } from "react";
import axios from "axios";

function InformacionEstudiantil({ estudianteId }) {
    const [informacion, setInformacion] = useState(null);

    useEffect(() => {
        // Solicitar información del estudiante al backend
        axios
            .get(`http://localhost:8000/estudiante/${estudianteId}/`)
            .then((response) => setInformacion(response.data))
            .catch((error) => console.error("Error al obtener la información:", error));
    }, [estudianteId]);

    if (!informacion) {
        return <p>Cargando información del estudiante...</p>;
    }

    return (
        <div>
            <h1>Información Estudiantil</h1>
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <tbody>
                    <tr>
                        <td><strong>Nombre:</strong></td>
                        <td>{informacion.nombre}</td>
                    </tr>
                    <tr>
                        <td><strong>Apellido:</strong></td>
                        <td>{informacion.apellido}</td>
                    </tr>
                    <tr>
                        <td><strong>Identificación:</strong></td>
                        <td>{informacion.identificacion}</td>
                    </tr>
                    <tr>
                        <td><strong>Correo Electrónico:</strong></td>
                        <td>{informacion.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InformacionEstudiantil;
