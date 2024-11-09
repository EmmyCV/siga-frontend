import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css"; // Asegúrate de tener un archivo CSS

import PersonasTable from "./PersonasTable";
import Horario from "./Horario";
import MateriasMatriculadas from "./MateriasMatriculadas";
import MateriasDisponibles from "./MateriasDisponibles";
import MateriasPorDocente from "./MateriasPorDocente";
import RegistroHistoricoNotas from "./RegistroHistoricoNotas";

function App() {
  // ID de estudiante, podría venir de un contexto o ser dinámico
  const estudianteId = 1;

  return (
    <Router>
      <div className="App">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/">Personas Registradas</Link>
            </li>
            <li>
              <Link to="/horario">Horario</Link>
            </li>
            <li>
              <Link to="/materias">Materias Matriculadas</Link>
            </li>
            <li>
              <Link to="/materias-disponibles">Materias Disponibles</Link>
            </li>
            <li>
              <Link to="/materias-por-docente">
                Materias Dictadas por Docente
              </Link>
            </li>
            <li>
              <Link to="/registro-historico-notas">
                Registro Histórico de Notas
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PersonasTable />} />
          <Route path="/horario" element={<Horario />} />
          <Route
            path="/materias"
            element={<MateriasMatriculadas estudianteId={estudianteId} />}
          />
          <Route
            path="/materias-disponibles"
            element={<MateriasDisponibles />}
          />
          <Route
            path="/materias-por-docente"
            element={<MateriasPorDocente />}
          />
          <Route
            path="/registro-historico-notas"
            element={<RegistroHistoricoNotas estudianteId={estudianteId} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
