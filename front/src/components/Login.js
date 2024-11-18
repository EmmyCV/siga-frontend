import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {  // Recibe la prop setIsAuthenticated
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar el error en caso de fallo de login
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpia el error antes de hacer una nueva solicitud
    setError("");

    // Llamada al backend para autenticar
    axios
      .post("http://localhost:8000/login", { username, password }) // Cambia esta URL según tu API
      .then((response) => {
        if (response.data.token) {
          // Si el login es exitoso, guarda el token y redirige
          localStorage.setItem("token", response.data.token); // Guarda el token en el almacenamiento local
          setIsAuthenticated(true);  // Actualiza el estado de autenticación en App.js
          navigate("/"); // Redirige a la página principal después de iniciar sesión
        }
      })
      .catch((error) => {
        // Verifica si el error es de autenticación y muestra un mensaje adecuado
        if (error.response && error.response.status === 401) {
          setError("Usuario o contraseña incorrectos");
        } else {
          setError("Hubo un problema al intentar conectarse al servidor");
        }
        console.error("Error al autenticar:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
