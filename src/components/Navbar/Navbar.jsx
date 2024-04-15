import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import LogoutButton from '../Logout/LogoutButton';
import LoginButton from "../Login/LoginButton";
import logonavbar from '../../Img/logonavbar.png';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [pjSubmenu, setPjSubmenu] = useState(false);
  const [tasksSubmenu, setTasksSubmenu] = useState(false);
  const { user, setUser } = useAuth();
  const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const dropdownRef = useRef(null);
  const tasksDropdownRef = useRef(null);

  const handleSubmenuClick = (submenu) => {
    if (submenu === 'projects') {
      setPjSubmenu(!pjSubmenu);
    } else if (submenu === 'tasks') {
      setTasksSubmenu(!tasksSubmenu);
    }
  }

  useEffect(() => {
    if (userLogged) {
      setUser(userLogged);
    }

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPjSubmenu(false);
      }
      if (tasksDropdownRef.current && !tasksDropdownRef.current.contains(event.target)) {
        setTasksSubmenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand important" to="#">
          {user ? `${user.name} ${user.surname}` : <img src={logonavbar} alt="logo" width={100}/>}
        </Link>
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown" ref={dropdownRef}>
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                onClick={() => handleSubmenuClick('projects')}
              >
                Proyectos
              </Link>
              <div className={`dropdown-menu ${pjSubmenu ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                <Link className="bi bi-database dropdown-item" to="/projects" onClick={() => handleSubmenuClick('projects')}> Vista general</Link>
                <Link className="bi bi-file-earmark-plus dropdown-item" to="/projects/form" onClick={() => handleSubmenuClick('projects')}> Registro</Link>
                <Link className="bi bi-list-stars dropdown-item" to="/projects/consult" onClick={() => handleSubmenuClick('projects')}> Consulta</Link>
              </div>
            </li>
            <li className="nav-item dropdown" ref={tasksDropdownRef}>
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="tasksDropdown"
                role="button"
                onClick={() => handleSubmenuClick('tasks')}
              >
                Tareas
              </Link>
              <div className={`dropdown-menu ${tasksSubmenu ? 'show' : ''}`} aria-labelledby="tasksDropdown">
                <Link className="bi bi-database dropdown-item" to="/tasks" onClick={() => handleSubmenuClick('tasks')}> Vista general</Link>
                <Link className="bi bi-file-earmark-plus dropdown-item" to="/tasks/form" onClick={() => handleSubmenuClick('tasks')}> Registro</Link>
                <Link className="bi bi-list-ul dropdown-item" to="/tasks/consult" onClick={() => handleSubmenuClick('tasks')}> Consultar tareas</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="ms-2 me-2">
        <div className="navbar-nav">
          {user ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
