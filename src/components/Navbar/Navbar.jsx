import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { useAuth } from "../../context/AppContext";
import LogoutButton from '../Logout/LogoutButton';
import LoginButton from "../Login/LoginButton";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [pjSubmenu, setPjSubmenu] = useState(false);
  const { user, setUser } = useAuth();
  const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const dropdownRef = useRef(null);

  const handleSubmenuClick = () => {
    setPjSubmenu(!pjSubmenu);
  }

  useEffect(() => {
    if (userLogged) {
      setUser(userLogged);
    }

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPjSubmenu(false);
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
          {user ? `${user.name} ${user.surname}` : '@SingletonCoders'}
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
        <Collapse in={open}>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item dropdown" ref={dropdownRef}>
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  onClick={handleSubmenuClick}
                >
                  Proyectos
                </Link>
                <div className={`dropdown-menu ${pjSubmenu ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                  <Link className="bi bi-bag-plus dropdown-item" to="/projects" onClick={handleSubmenuClick}> Vista general</Link>
                  <Link className="bi bi-list-stars dropdown-item" to="/projects/consult" onClick={handleSubmenuClick}> Consulta</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/tasks">
                  Tareas
                </Link>
              </li>
            </ul>
          </div>
        </Collapse>
        <div className="justify-content-end">
          <div className="navbar-nav">
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
