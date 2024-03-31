import React from 'react'

const ProjectDetail = ({ project }) => {
  if (!project) {
    return;
  }

  return (
    <div>
      <header>
        <h2>{project.title}</h2>
      </header>
      <section>
        <p>{project.description}</p>
        <p>{project.startDate} - {project.endDate}</p>
      </section>
    </div>
  );
}


export default ProjectDetail
