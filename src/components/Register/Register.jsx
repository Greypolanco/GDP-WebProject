import React, { useState, useContext, useEffect } from "react";
import { useAuth, AuthProvider } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../services/AuthService";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    id: 0,
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    projects: [],
    tasks: [],
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const userLogged = await AuthService.register(user);
      setUser(userLogged);
      localStorage.setItem("user", JSON.stringify(userLogged));
      navigate("/projects");
    } catch (error) {
      setError("Credenciales inválidas. Por favor, intenta de nuevo.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    try {
      navigate("/Login");
    } catch (error) {
      setError(" Favor, intenta de nuevo.");
    }
  };

  return (
    <div className="register">
      <h2>Crear Cuenta</h2>
      <div className="d-flex justify-content-center">
        <div className="user">
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Nombre"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="password">
          <label className="form-label" htmlFor="surname">
            Apellido
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Apellido"
            id="surname"
            name="surname"
            value={user.surname}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="user">
        <label className="form-label" htmlFor="username">
          Usuario
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Nombre de usuario"
          id="username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="user">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="password">
        <label className="form-label" htmlFor="password">
          Contraseña
        </label>
        <input
          className="form-control"
          type="password"
          placeholder="Contraseña"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </div>
      {error && <div>{error}</div>}
      <div className="d-flex justify-content-center">
        <button className="register-button" onClick={handleRegister}>
          Crear una cuenta
        </button>
      </div>
      <p class="p">
        ¿Tienes una cuenta?{" "}
        <span class="span" onClick={handleLogin}>
          Iniciar sesión
        </span>
      </p>
    </div>
  );
};

export default Register;
