import React from 'react';
import './ProjectItem.css';
import { getStatusColor, formatDate, getStatusText } from '../../utils/utils';
import '../../utils/utils.css';

export const ProjectItem = ({ project, onSelect }) => {

  const handleClick = () => {
    onSelect(project);
  }

  return (
    <div className='item-container card m-2'>
      <div className='img-container'>
        <img src='https://placehold.co/200x200' width={200} height={200} alt={project.title} />
      </div>
      <section className='info-container p-2'>
        <h5>{project.title}</h5>
        <p><strong>Descripción:</strong> {project.description}</p>
        <p><strong>Fecha de inicio:</strong> {formatDate(project.startDate)}</p>
        <p className='d-flex'>
          <strong>Estado:</strong>
          <div className={`ms-1 mt-1 me-1 ${getStatusColor(project.status)}`}>
          </div>{getStatusText(project.status)}
        </p>
      </section>
    </div>
  );
};

export default ProjectItem;
