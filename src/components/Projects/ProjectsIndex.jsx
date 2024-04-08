import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectsList from './ProjectsList';

const ProjectsIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <header>

      </header>
      <section>
        <ProjectsList />
      </section>
    </div>
  );
};

export default ProjectsIndex;
