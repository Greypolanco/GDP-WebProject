import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  return <button className='btn btn-outline-warning' onClick={handleClick}>Login</button>
}

export default LoginButton
