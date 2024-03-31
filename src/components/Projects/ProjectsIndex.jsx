import React, { useState } from 'react'
import ProjectsList from './ProjectsList'
import ProjectDetail from './ProjectDetail'

export const ProjectsIndex = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

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
