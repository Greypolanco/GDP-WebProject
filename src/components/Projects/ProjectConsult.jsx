import React, { useState, useEffect } from 'react';
import * as ProjectService from '../../services/ProjectService';
import { getStatusColor, formatDate } from '../../utils/utils';
import '../../utils/utils.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ProjectsList = ({ onProjectSelect }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const listProjects = async () => {
    try {
      const response = await ProjectService.getProjects(userLogged.id);
      if (Array.isArray(response)) {
        setProjects(response);
      } else {

      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleProjectSelect = (selectedProject) => {
    onProjectSelect(selectedProject);
  };
  const handleView = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  useEffect(() => {
    listProjects();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <p>No se encontraron proyectos para este usuario {':('}</p>
      ) : (
        <div className='card'>
          <div className='card-header'>
            <h3>Tus proyectos</h3>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Buscar proyecto...' />
              <button className='btn btn-outline-secondary bi bi-search'></button>
            </div>
          </div>
          <div className='card-body'>
            <table className='table table-hover text-center'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Titulo</th>
                  <th>Descripción</th>
                  <th>Fecha de creación</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{formatDate(project.startDate)}</td>
                    <td><div className={getStatusColor(project.status)}></div></td>
                    <td>
                      <button className='btn btn-outline-warning bi bi-eye m-1' onClick={() => handleView(project.id)}></button>
                      <button className='btn btn-outline-primary bi bi-pencil m-1'></button>
                      <button className='btn btn-outline-danger bi bi-trash m-1'></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProjectsList;
