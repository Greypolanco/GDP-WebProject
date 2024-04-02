import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { useAuth } from "../../context/AppContext";
import LogoutButton from '../Logout/LogoutButton';
import LoginButton from "../Login/LoginButton";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          @SingletonCoders
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
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/projects">
                  Proyectos
                </Link>
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
