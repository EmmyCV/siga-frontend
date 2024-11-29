import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Estudiante from "./pages/Estudiante";
import Docente from "./pages/Docente";
import Administrador from "./pages/Administrador";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta protegida para estudiantes */}
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute allowedType="Estudiante">
              <Estudiante />
            </ProtectedRoute>
          }
        />
        {/* Ruta protegida para docentes */}
        <Route
          path="/docente"
          element={
            <ProtectedRoute allowedType="Docente">
              <Docente />
            </ProtectedRoute>
          }
        />
        {/* Ruta protegida para administradores */}
        <Route
          path="/administrador"
          element={
            <ProtectedRoute allowedType="Administrador">
              <Administrador />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </Router>
  );
}

export default App;
