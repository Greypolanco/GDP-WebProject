import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProjectItem = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div key={project.id} className='col-md-4 mb-4'>
      <div className='card'>
        <div className='card-header card-title'>
          <h5>{project.id}- {project.title}</h5>
        </div>
        <div className='card-body'>
          <p className='card-text'>{project.description}</p>
          <p className='card-text'><strong>{project.status}</strong></p>
          <p className='card-text'>{project.startDate} - {project.endDate}</p>
          <p className='card-text'>Note: {project.note ==='' ? '' : project.note}</p>
          <p className='card-text'>Participants:[ {project.participants.map(participant =>(
            <span key={participant.id}>{participant.id}  </span>
          ))}]</p>
        </div>
        <div className='card-footer d-flex justify-content-center'>
          <button className='btn btn-primary bi-eye' onClick={() => navigate(`/projects/update-project/${project.id}`)}>Ver</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem