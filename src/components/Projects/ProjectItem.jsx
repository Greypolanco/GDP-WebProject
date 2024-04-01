import React from 'react';
import './ProjectItem.css';
import { getStatusColor, formatDate } from '../../utils/utils';
import '../../utils/utils.css';

export const ProjectItem = ({ project, onSelect }) => {

  const handleClick = () => {
    onSelect(project);
  }

  return (
    <div className='project-item' onClick={handleClick}>
      <div className='id'>{project.id}</div>
      <div className='content'>
        <div className='title'>{project.title}</div>
        <div className='details'>
          <div className='date'>{formatDate(project.startDate)}</div>
          <div className={`status ${getStatusColor(project.status)}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
