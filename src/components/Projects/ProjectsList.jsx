import React, { useState, useEffect } from 'react'
import ProjectItem from './ProjectItem'
import * as ProjectService from '../../services/ProjectService'

export const ProjectsList = ({ onProjectSelect }) => {
  const [projects, setProjects] = useState([]);

  const listProjects = async () => {
    try {
      const response = await ProjectService.getProjects();
      setProjects(response);
    } catch (e) {
      console.log(e);
    }
  }

  const handleProjectSelect = (selectedProject) => {
    onProjectSelect(selectedProject);
  };

  useEffect(() => {
    listProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} onSelect={handleProjectSelect} />
      ))}
    </div>
  );
}

export default ProjectsList