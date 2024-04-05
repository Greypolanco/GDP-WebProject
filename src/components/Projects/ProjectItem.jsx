import React from 'react';
import './ProjectItem.css';
import { getStatusColor, formatDate, getStatusText, getThumbnail } from '../../utils/utils';
import '../../utils/utils.css';
import { useNavigate } from 'react-router-dom';

export const ProjectItem = ({ project, onSelect }) => {
  const navigate = useNavigate();
  const thumbnail = getThumbnail();

  const handleClick = () => {
    navigate(`/projects/${project.id}`)
    //onSelect(project);
  }

  return (
    <div className='item-container card m-2' onClick={handleClick}>
      <div className='img-container'>
        <img src={thumbnail} width={200} height={200} alt={project.title} />
      </div>
      <section className='info-container p-2'>
        <h2>{project.title}</h2>
        <p><strong>Descripción:</strong> {project.description}</p>
        <p><strong>Fecha de inicio:</strong> {formatDate(project.startDate)}</p>
        <div className='d-flex'>
          <strong>Estado:</strong>
          <div className={`ms-1 mt-1 me-1 ${getStatusColor(project.status)}`}>
          </div>{getStatusText(project.status)}
        </div>
      </section>
    </div>
  );
};

export default ProjectItem;
