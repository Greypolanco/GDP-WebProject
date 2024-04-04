import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  return <button className='bi bi-box-arrow-in-right btn btn-outline-warning' onClick={handleClick}></button>
}

export default LoginButton
