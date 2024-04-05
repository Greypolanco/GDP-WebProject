import React, { useEffect, useState } from 'react'
import ProjectsList from './ProjectsList'
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
      <header>
        asopdjk
      </header>
      <section>
        <ProjectsList onProjectSelect={handleProjectSelect} />
      </section>
    </div>
  )
}

export default ProjectsIndex
