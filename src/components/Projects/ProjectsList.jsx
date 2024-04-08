import React, { useEffect, useState } from 'react';
import * as ProjectService from '../../services/ProjectService';
import '../../utils/utils.css';
import ProjectItem from './ProjectItem';

export const ProjectsList = ({ onProjectSelect }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userLogged = JSON.parse(localStorage.getItem('user')) || null;

  const fetchProjects = async () => {
    if (!userLogged) {
      setError('Usuario no encontrado');
      setLoading(false);
      return;
    }

    try {
      const response = await ProjectService.getProjects(userLogged.id);
      if (Array.isArray(response)) {
        setProjects(response);
      } else {
        setError('Error al obtener proyectos');
      }
    } catch (error) {
      setError('Error de red');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (selectedProject) => {
    onProjectSelect(selectedProject);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Cargando proyectos...</p>;
  }
  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }
  if (projects.length === 0) {
    return <p>No se encontraron proyectos para este usuario {':('}</p>;
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>Tus proyectos</h3>
      </div>
      <div className='card-body'>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} onSelect={handleProjectSelect} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;