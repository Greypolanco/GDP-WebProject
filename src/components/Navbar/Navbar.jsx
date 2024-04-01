import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { useAuth } from "../../context/AppContext";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const userLogged = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          @SingletonCoders
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Collapse in={open}>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="nav-link" aria-current="page" to="/projects">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link className="nav-link" aria-current="page" to="/tasks">
                  Tareas
                </Link>
              </li>
            </ul>
          </div>
        </Collapse>
      </div>
    </nav>
  );
};

export default Navbar;
