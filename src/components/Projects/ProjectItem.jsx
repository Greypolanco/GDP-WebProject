import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectItem.css';

export const ProjectItem = ({ project, onSelect }) => {
  const navigate = useNavigate();

  function getStatusColor(status) {
    switch (status) {
      case 1:
        return 'circle-progress';
      case 2:
        return 'circle-pending';
      case 3:
        return 'circle-completed';
      case 4:
        return 'circle-stopped';
      default:
        return 'circle-default';
    }
  }

  const handleClick = () => {
    onSelect(project);
  }

  return (
    <div className='project-item' onClick={handleClick}>
      <div className='id'>{project.id}</div>
      <div className='content'>
        <div className='title'>{project.title}</div>
        <div className='details'>
          <div className='date'>{project.startDate}</div>
          <div className={`status ${getStatusColor(project.status)}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
