import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <button className='btn btn-outline-warning' onClick={handleLogout}>Logout</button>
  )
}

export default Logout
