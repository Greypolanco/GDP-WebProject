import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, getStatusColor, getStatusText, getThumbnail } from '../../utils/utils';
import '../../utils/utils.css';
import './ProjectItem.css';

const ProjectItem = ({ project }) => {
  const navigate = useNavigate();
  const thumbnail = getThumbnail();

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

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
          </div>
          {getStatusText(project.status)}
        </div>
      </section>
    </div>
  );
};

export default ProjectItem;
