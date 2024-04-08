import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../../services/ProjectService';
import { formatDate, getStatusColor } from '../../utils/utils';
import '../../utils/utils.css';

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criterion, setCriterion] = useState('');
  const [originalProjects, setOriginalProjects] = useState([]);
  const userLogged = JSON.parse(localStorage.getItem('user')) || null;

  const listProjects = async () => {
    try {
      const response = await getProjects(userLogged?.id);
      if (Array.isArray(response)) {
        setProjects(response);
        setOriginalProjects(response);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const verifyIfAdmin = (project) => {
    if (!project) return false;

    if (project.creatorId === userLogged?.id) return true;

    const participantFound = project.participants?.find(participant => participant.userId === userLogged?.id);

    return participantFound && participantFound.roleId === 1;
  };

  const handleView = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditClick = (projectId) => {
    navigate(`/projects/form/${projectId}`);
  };

  const handleSearch = (event) => {
    const searchCriterion = event.target.value.toLowerCase();
    setCriterion(searchCriterion);
    const filteredList = originalProjects.filter(project => project.title.toLowerCase().includes(searchCriterion));
    setProjects(filteredList);
  };

  useEffect(() => {
    listProjects();
  }, []);

  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <h3>Tus proyectos</h3>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Buscar proyecto...' onChange={handleSearch} />
            <button className='btn btn-outline-secondary bi bi-search'></button>
          </div>
        </div>
        <div className='card-body d-flex justify-content-center'>
          {loading
            ? <div className='spinner-border text-warning'>
              <span className='visually-hidden'>Cargando...</span>
            </div>
            : projects.length === 0
              ? <div className='alert alert-warning'>
                No hay proyectos para mostrar que coincidan con el criterio: <strong>' {criterion} '</strong>
              </div>
              :
              <table className='table table-hover text-center align-middle'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Titulo</th>
                    <th>Fecha de creación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.title}</td>
                      <td>{formatDate(project.startDate)}</td>
                      <td><div className={getStatusColor(project.status)}></div></td>
                      <td>
                        <button className='btn btn-outline-warning bi bi-eye m-1' onClick={() => handleView(project.id)}></button>
                        {verifyIfAdmin(project) &&
                          <button className='btn btn-outline-light bi bi-pencil m-1' onClick={() => handleEditClick(project.id)}></button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
