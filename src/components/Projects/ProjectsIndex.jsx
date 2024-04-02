import React, { useEffect, useState } from 'react'
import ProjectsList from './ProjectsList'
import ProjectDetail from './ProjectDetail'
import { useNavigate } from 'react-router-dom'

export const ProjectsIndex = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };
  
  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <header className='mb-3 card-header'>
        <h3>Tus proyectos</h3>
      </header>
      <section className='card-body'>
        <div className='row'>
          <div className='col-md-3'>
            <ProjectsList onProjectSelect={handleProjectSelect} />
          </div>
          <div className='col'>
            <ProjectDetail project={selectedProject}/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsIndex
