import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as TaskService from '../../services/TaskService'
import * as ProjectService from '../../services/ProjectService'
import { getUserById, getUsers } from '../../services/UserService'

const TasksForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const initialState = {
    id: 0,
    projectId: 0,
    userId: 0,
    title: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    note: ''
  }
  const [task, setTask] = useState(initialState)
  const userLogged = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null)
  const [projectList, setProjectList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(0);

  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  const getTask = async () => {
    try {
      const response = await TaskService.getTask(id)
      const formattedTask = {
        ...response,
        startDate: response.startDate ? new Date(response.startDate).toISOString().split('T')[0] : '',
        endDate: response.endDate ? new Date(response.endDate).toISOString().split('T')[0] : ''
      };
      userLogged.id === response.userId ? setTask(formattedTask) : navigate('/tasks')
    } catch (error) {
      console.error(error)
    }
  }

  const getProjects = async () => {
    try {
      const response = await ProjectService.getProjects(userLogged.id);
      const projectsAllowed = response.filter(
        project => project.creatorId === userLogged.id
          ||
          project.participants.some(participant => participant.userId === userLogged.id && participant.roleId === 1)
      );
      setProjectList(projectsAllowed);
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleProjectSelect = async (projectId) => {
    setProjectSelected(projectId);
    const selectedProject = projectList.find(project => project.id === parseInt(projectId));
    if (selectedProject) {
      const participants = selectedProject.participants.map(participant => participant.userId);
      const usersPromises = participants.map(userId => getUserById(userId));
      const users = await Promise.all(usersPromises);
      setUsersList(users);
    }
  }
  
  
  const saveTask = async () => {
    try {
      task.title = task.title.toString();
      task.description = task.description ? task.description.toString() : ' ';
      task.status = parseInt(task.status);
      task.startDate = task.startDate.toString();
      task.endDate = task.endDate.toString();
      task.note = task.note ? task.note.toString() : ' ';
      task.userId = task.userId ? parseInt(task.userId) : userLogged.id;
      task.projectId = projectSelected ? parseInt(projectSelected) : 0;
      task.id = parseInt(task.id);
      console.log(task)
      if (id) {
        await TaskService.updateTask(task)
      } else {
        await TaskService.postTask(task)
      }
      setTask(initialState)
      navigate('/tasks/consult')
    } catch (error) {
      console.error(error)
    }
  }

  const cancelEvent = () => {
    setTask(initialState);
    navigate('/tasks/consult');
  }

  useEffect(() => {
    if (id){
      getTask();
      setProjectSelected(task.projectId);
    }
  }, [id])

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <div className='card'>
      <div className='card-header text-center'>
        {id ? <h3>Editar tarea</h3> : <h3>Crear tarea</h3>}
      </div>
      <div className='card-body'>
        <label className='form-label'>Título</label>
        <input type='text' className='form-control' value={task.title} onChange={onInputChange} name='title' />

        <label className='form-label'>Descripción</label>
        <textarea className='form-control' value={task.description} onChange={onInputChange} name='description' />

        <div className='row'>
          <div className="col-md-3">
            <label className='form-label'>Estado</label>
            <select className='form-select' value={task.status} onChange={onInputChange} name='status'>
              <option value='' hidden>Seleccione un estado</option>
              <option value='1'>En progreso</option>
              <option value='2'>Pendiente</option>
              <option value='3'>Completado</option>
              <option value='4'>Detenido</option>
            </select>
          </div>
          <div className="col-md-3">

          </div>
        </div>

        <div className='row'>
          <div className="col-md-2">
            <label className='form-label'>Fecha de inicio</label>
            <input type='date' className='form-control' value={task.startDate} onChange={onInputChange} name='startDate' />
          </div>
          <div className="col-md-2">
            <label className='form-label'>Fecha de fin</label>
            <input type='date' className='form-control' value={task.endDate} onChange={onInputChange} name='endDate' />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-5'>
            <label className='form-label'>Proyecto</label>
            <select className='form-select' value={projectSelected} onChange={(e) => handleProjectSelect(e.target.value)} name='projectId'>
              <option value='' hidden>Seleccione un proyecto</option>
              {
                projectList.map(project => (
                  <option key={project.id} value={project.id}>{project.title}</option>
                ))
              }
            </select>
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Participantes</label>
            <select className='form-select' value={task.userId} onChange={onInputChange} name='userId'>
              <option value='' hidden>Seleccione un participante</option>
              {
                usersList.map(user => (
                  <option key={user.id} value={user.id}>{user.username}</option>
                ))
              }
            </select>
          </div>
        </div>

        <label className='form-label'>Nota</label>
        <textarea className='form-control' value={task.note} onChange={onInputChange} name='note' />
      </div>
      <div className='card-footer d-flex justify-content-center'>
        <button className='btn btn-outline-warning me-2' onClick={saveTask}>Guardar</button>
        <button className='btn btn-outline-danger ms-2' onClick={cancelEvent}>Cancelar</button>
      </div>
    </div>
  )
}

export default TasksForm
