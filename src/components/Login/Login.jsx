import React, { useState, useContext } from 'react';
import * as AuthService from '../../services/AuthService';
import { useAuth } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const userLogged = await AuthService.login(credentials);
      setUser(userLogged);
      console.log(userLogged);
      navigate('/projects');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <div>
        <label htmlFor="username">Usuario:</label>
        <input type="text" id="username" name="username" value={credentials.username} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={credentials.password} onChange={handleInputChange} />
      </div>
      {error && <div>{error}</div>}
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;