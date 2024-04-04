import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';

export const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <button className='bi bi-box-arrow-right btn btn-outline-danger' onClick={handleLogout}></button>
  )
}

export default Logout
