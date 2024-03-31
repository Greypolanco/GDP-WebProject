import React, { useState, useEffect } from 'react'
import ProjectItem from './ProjectItem'
import * as ProjectService from '../../services/ProjectService'

export const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  const listProjects = async () =>{
    try{
        const response = await ProjectService.getProjects();
        setProjects(response);
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    listProjects();
  }, []);

  return (
    <div className='row'>
      {projects.map((project) =>(
        <ProjectItem key={project.id} project={project} listProjects={listProjects}/>
      ))}
    </div>
  );
}

export default ProjectsList