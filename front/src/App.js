import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css"; // Asegúrate de tener un archivo CSS

import PersonasTable from "./components/PersonasTable";
import Horario from "./components/Horario";
import MateriasMatriculadas from "./components/MateriasMatriculadas";
import MateriasDisponibles from "./components/MateriasDisponibles";
import MateriasPorDocente from "./components/MateriasPorDocente";
import RegistroHistoricoNotas from "./components/RegistroHistoricoNotas";
import Login from "./components/Login";

function App() {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si el usuario tiene un token en el localStorage al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    setIsAuthenticated(false); // Actualiza el estado de autenticación
  };

  // ID de estudiante, podría venir de un contexto o ser dinámico
  const estudianteId = 1;

  return (
    <Router>
      <div className="App">
        {/* Menú de navegación solo si está autenticado */}
        {isAuthenticated && (
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
                <Link to="/materias-por-docente">Materias Dictadas por Docente</Link>
              </li>
              <li>
                <Link to="/registro-historico-notas">Registro Histórico de Notas</Link>
              </li>
            </ul>
            {/* Botón de Logout */}
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}

        <Routes>
          {/* Ruta de login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" /> // Si ya está autenticado, redirige al inicio
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} /> // Pasa la función de setIsAuthenticated
              )
            }
          />
          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <PersonasTable />
              ) : (
                <Navigate to="/login" /> // Si no está autenticado, redirige al login
              )
            }
          />
          <Route
            path="/horario"
            element={
              isAuthenticated ? (
                <Horario />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/materias"
            element={
              isAuthenticated ? (
                <MateriasMatriculadas estudianteId={estudianteId} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/materias-disponibles"
            element={
              isAuthenticated ? (
                <MateriasDisponibles />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/materias-por-docente"
            element={
              isAuthenticated ? (
                <MateriasPorDocente />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/registro-historico-notas"
            element={
              isAuthenticated ? (
                <RegistroHistoricoNotas estudianteId={estudianteId} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
