import React from 'react';
import './ProjectItem.css';
import { getStatusColor, formatDate } from '../../utils/utils';
import '../../utils/utils.css';

export const ProjectItem = ({ project, onSelect }) => {

  const handleClick = () => {
    onSelect(project);
  }

  return (
    <div className='card mb-3'>
      <div className='card-header'>
        <h3>{project.title}</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-3'>
            <img src='https://placehold.co/200x200' alt={project.title} className='' />
          </div>
          <div className='col-12 col-md-6'>
            <p><strong>Descripción:</strong> {project.description}</p>
            <p><strong>Fecha de creación:</strong> {formatDate(project.created_at)}</p>
            <p><strong>Estado:</strong> <span className={`badge ${getStatusColor(project.status)}`}>{project.status}</span></p>
          </div>
        </div>
        <div className='card-footer'>
          <button className='btn btn-outline-primary bi bi-eye m-1' onClick={handleClick}></button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
