import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, updateStatus } from '../../services/ProjectService';
import { getUserById } from '../../services/UserService';
import { getStatusColor, getStatusText, formatDate } from '../../utils/utils';

export const ProjectView = () => {
  const initialState = { id: 0, title: 'Not Found', description: '', status: '', startDate: '', endDate: '', note: '', participants: [], tasks: [] };
  const { id } = useParams();
  const [project, setProject] = useState(initialState);
  const [participants, setParticipants] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userLogged = JSON.parse(localStorage.getItem('user'));

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    const statusInt = parseInt(status);
    console.log(statusInt);
    console.log(status);
    setProject({ ...project, status: statusInt });
    try {
      await updateStatus(project.id, statusInt);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyIfAdmin = () => {
    if (project.participants.length > 0) {
      project.participants.some(participant => participant.userId === userLogged.id && participant.roleId === 1) ? setIsAdmin(true) : setIsAdmin(false);
    };
  }

  const handleStatusClick = () => {
    if (editMode === true) {
      setEditMode(false);
    }
    else {
      setEditMode(true);
    }
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setProject(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const updatedParticipants = await Promise.all(
          project.participants.map(async (participant) => {
            const response = await getUserById(participant.userId);
            return response;
          })
        );
        setParticipants(updatedParticipants);
        verifyIfAdmin();
      } catch (error) {
        console.error(error);
      }
    };

    if (project.participants.length > 0) {
      fetchParticipants();
    }
  }, [project]);

  return (
    <div className='card'>
      <div className='card-header text-center'>
        <h3>{project.title}</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col'>
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>
          <div className='col'>
            <h5>Status</h5>
            <div className='d-flex'>
              {editMode
                ?
                <select value={project.status} onChange={handleStatusChange}>
                  <option value='1'>En progreso</option>
                  <option value='2'>Pendiente</option>
                  <option value='3'>Completado</option>
                  <option value='4'>Detenido</option>
                </select>
                :
                <div className='d-flex'>
                  <div className={`me-1 ${getStatusColor(project.status)}`}></div>
                  <p>{getStatusText(project.status)}</p>
                </div>
              }
              {
                isAdmin
                  ? <button className=
                    {`ms-2 ${editMode
                      ? 'btn btn-success bi bi-check-circle'
                      : 'btn btn-secondary bi bi-pencil'}`
                    } onClick={handleStatusClick}>
                  </button>
                  : null
              }
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h5>Start Date</h5>
            <p>{project.startDate}</p>
          </div>
          <div className='col'>
            <h5>End Date</h5>
            <p>{project.endDate}</p>
          </div>
        </div>
        <div className='col'>
          <h5>Note</h5>
          <p>{project.note === '' ? "-" : project.note}</p>
        </div>
        <div className='row text-center'>
          <div className='col-md-5 me-5'>
            <h5>Participantes</h5>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(participant => (
                  <tr key={participant.id}>
                    <td>{participant.id}</td>
                    <td>{participant.username}</td>
                    <td>{participant.name}</td>
                    <td>{participant.surname}</td>
                    <td>{participant.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-md-6'>
            <h5>Tareas</h5>
            <table className='table table-sm ms-5'>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Encargado</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.userId}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{formatDate(task.endDate)}</td>
                    <td>
                      <div className='d-flex justify-content-center'>
                        <div className={`me-1 ${getStatusColor(task.status)}`}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
