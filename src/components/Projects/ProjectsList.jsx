import React, { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';
import * as ProjectService from '../../services/ProjectService';
import * as UserService from '../../services/UserService';
import { useAuth } from '../../context/AppContext';
import { getStatusColor, formatDate, getUserByIdAsync } from '../../utils/utils';
import '../../utils/utils.css';
import { Link } from 'react-router-dom';

export const ProjectsList = ({ onProjectSelect }) => {
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
          </div>
          <div className='card-body'>
            {
              projects.map((project) => {
                return <ProjectItem key={project.id} project={project} onSelect={handleProjectSelect} />
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
