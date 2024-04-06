import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import * as ProjectService from '../../services/ProjectService';
import { getUserById } from '../../services/UserService';
import { getStatusColor } from '../../utils/utils';
import { getUsers } from '../../services/UserService';

export const ProjectForm = () => {
  const [participants, setParticipants] = useState([]);
  const [tasks, setTasks] = useState([]);
  const initialState = { id: 0, title: '', description: '', status: '', startDate: '', endDate: '', note: '', participants: [], tasks: [] }
  const [project, setProject] = useState(initialState);
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  // Manejar cambio en los inputs
  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: [e.target.value] });
  }

  const getProject = async () => {
    try {
      const response = await ProjectService.getProject(id);
      setProject(response);
      setTasks(response.tasks);
      getParticipants();
    } catch (error) {
      console.error(error);
    }
  }
  const getUsersAsync = async () => {
    try{
      const response = await getUsers();
      setUsers(response);
    }catch(error){
      console.error(error);
    }
  }
  

  const getParticipants = async () => {
    try {
      const updatedParticipants = await Promise.all(project.participants.map(async (participant) => {
        const response = await getUserById(participant.userId);
        return response;
      }));
      setParticipants(updatedParticipants);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProject();
    getUsersAsync();
  }, [id]);

  useEffect(() => {
    if (Object.keys(project).length !== 0) {
      console.log('sss');
      getParticipants();
    }
  }, [project]);
  

  return (
    <div className='card'>
      <div className='card-header text-center'>
        <h3>Crear proyecto</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-5'>
            <label className='form-label' htmlFor='title'>Título</label>
            <input value={project.title} onChange={onInputChange} type='text' className='form-control' id='title' name='title' />
          </div>

          <div className='col'>
            <label className='form-label' htmlFor='description'>Descripción</label>
            <textarea value={project.description} onChange={onInputChange} className='form-control' id='description' name='description'></textarea>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-5'>
            <label className='form-label' htmlFor='status'>Estado:</label>
            <select value={project.status} onChange={onInputChange} className='form-select' id='status' name='status'>
              <option value='0' hidden>Selecciona un estado</option>
              <option value='1'>En progreso</option>
              <option value='2'>Pendiente</option>
              <option value='3'>Completado</option>
              <option value='4'>Detenido</option>
            </select>
          </div>
          <div className='col'>
            <label className='form-label' htmlFor='note'>Nota</label>
            <textarea value={project.note} onChange={onInputChange} className='form-control' id='note' name='note'></textarea>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-2'>
            <label className='form-label' htmlFor='startDate'>Fecha de inicio</label>
            <input type='date' value={project.startDate} onChange={onInputChange} className='form-control' id='startDate' name='startDate' />
          </div>
          <div className='col-md-2'>
            <label className='form-label' htmlFor='endDate'>Fecha de fin</label>
            <input type='date' value={project.endDate} onChange={onInputChange} className='form-control' id='endDate' name='endDate' />
          </div>
          <div className=''>
            <label className='form-label' htmlFor='participant'>Participantes</label>
            <select className='form-select' id='participant'>
              <option value='0' hidden>Selecciona un participante</option>
              {users.map(user => {
                return <option key={user.id} value={user.id}>{user.username}</option>
              })}
            </select>
          </div>
        </div>
      </div>
      <div className='card-header mt-3 text-center'>
        <h3>Detalle del proyecto</h3>
      </div>
      <div className='card-body text-center'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>Participantes del proyecto</h4>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Tareas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(participant => (
                  <tr key={participant.id}>
                    <td>{participant.username}</td>
                    <td>{participant.email}</td>
                    <td>
                      {participant.tasks
                        .filter(task => task.projectId === project.id)
                        .map(task => task.id)
                        .join(', ')
                      }
                    </td>

                    <td><i className='bi bi-trash' onClick={() => alert('Participante [' + participant.id + '] eliminado.')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-md-6'>
            <h4>Tareas del proyecto</h4>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td><div className='d-flex justify-content-center'><div className={getStatusColor(task.status)}/></div></td>
                    <td><i className='bi bi-trash' onClick={() => alert('Task [' + task.id + '] eliminada.')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectForm
