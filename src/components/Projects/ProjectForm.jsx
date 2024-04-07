import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as ProjectService from '../../services/ProjectService';
import { getUserById, getUsers } from '../../services/UserService';
import { getStatusColor } from '../../utils/utils';

export const ProjectForm = () => {
  const [participants, setParticipants] = useState([]);
  const [tasks, setTasks] = useState([]);
  const initialState = { id: 0, title: '', description: '', status: '', startDate: '', endDate: '', note: '', participants: [], tasks: [] }
  const [project, setProject] = useState(initialState);
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedRole, setSelectedRole] = useState(0);
  const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const navigate = useNavigate();


  // Manejar cambio en los inputs
  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: [e.target.value] });
  }

  const handleUserSelect = async (userId) => {
    try {
      const userIdInt = parseInt(userId);
      setSelectedUser(userIdInt)
    } catch (error) {
      console.error(error);
    }
  }

  const handleRoleSelect = async (roleId) => {
    try {
      const roleIdInt = parseInt(roleId);
      setSelectedRole(roleIdInt)
    } catch (error) {
      console.error(error);
    }
  }

  const postProject = async () => {
    try {
      project.creatorId = userLogged.id;
      project.title = project.title.toString();
      project.description = project.description ? project.description.toString() : '';
      project.startDate = project.startDate.toString();
      project.endDate = project.endDate.toString();
      project.note = project.note.toString();
      project.status = parseInt(project.status);
      project.tasks = [];
      console.log(project);
      const response = await ProjectService.postProject(project, userLogged.id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const addParticipant = async () => {
    if (selectedUser && selectedRole) {
      if (!participants.find(participant => participant.id === userLogged.id)) {
        const newParticipant = { projectId: project.id, userId: userLogged.id, roleId: 1 };
        setParticipants([...participants, newParticipant]);

        setProject(prevProject => ({
          ...prevProject,
          participants: [...prevProject.participants, newParticipant]
        }));
      }

      if (participants.find(participant => participant.id === selectedUser)) {
        alert('El usuario ya es parte del proyecto.');
        return;
      }

      const newParticipant = { projectId: project.id, userId: selectedUser, roleId: selectedRole };
      setParticipants([...participants, newParticipant]);

      setProject(prevProject => ({
        ...prevProject,
        participants: [...prevProject.participants, newParticipant]
      }));
    }
  }

  const removeParticipant = async (userId) => {
    if (userId === project.creatorId) {
      alert('No puedes eliminar al creador del proyecto');
      return;
    }

    const participantToRemove = project.participants.find(participant => participant.userId === userId);
    if (participantToRemove.roleId === 1 && userLogged.id !== project.creatorId) {
      alert('No puedes eliminar a otro administrador del proyecto');
      return;
    }

    try {
      // Remove the participant from the database
      await ProjectService.removeParticipant(project.id, userId);

      // Update local state to reflect the removed participant
      const updatedParticipants = participants.filter(participant => participant.id !== userId);
      setParticipants(updatedParticipants);

      // Update project state to reflect the removed participant
      setProject(prevProject => ({
        ...prevProject,
        participants: prevProject.participants.filter(participant => participant.userId !== userId)
      }));

      alert('Participante eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el participante:', error);
      alert('Error al eliminar el participante. Intente nuevamente');
    }
  };


  const getProject = async () => {
    try {
      const response = await ProjectService.getProject(id);
      setProject(response);
      setTasks(response.tasks);
    } catch (error) {
      console.error(error);
    }
  }

  const getUsersAsync = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
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


  const verifyAccess = async () => {
    console.log('Verificando si tiene un id válido');
    if (id <= 0 || !id) {
      console.log('No hay ID, abriendo en modo creación.')
      return false;
    }
    console.log('Hay ID, abriendo en modo edicion.')

    console.log('Verificando acceso');
    if (!userLogged) {
      console.log('No hay usuario logueado');
      navigate('/login');
      return false;
    }

    try {
      const projectFound = await ProjectService.getProject(id);

      if (projectFound.creatorId === userLogged.id) {
        console.log(projectFound.creatorId, userLogged.id)
        console.log('Es el creador del proyecto')
        return true;
      }

      const participant = projectFound.participants.find(participant => participant.userId === userLogged.id);

      if (!participant) {
        navigate('/projects');
        return false;
      }

      if (participant.roleId === 1) {
        return true;
      }

      navigate('/projects');
      return false;
    } catch (error) {
      console.error('Error al obtener el proyecto:', error);
      return false;
    }
  }


  useEffect(() => {
    const loadData = async () => {
      if (id) {
        await getProject();
      } else {
        setProject(initialState);
        setTasks([]); //Limpiar tareas cuando es un nuevo formulario.
      }

      await getUsersAsync();
    };

    loadData();
  }, [id]);

  useEffect(() => {
    if (Object.keys(project).length !== 0) {
      getParticipants();
    }
  }, [project]);

  useEffect(() => {
    verifyAccess();
  }, [project, userLogged]);


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
          <div className='col-md-5'>
            <div className="card-footer mt-3 d-flex justify-content-center">
              <button className='btn btn-outline-warning m-2' onClick={postProject}>Guardar</button>
              <button className='btn btn-outline-danger m-2'>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className='card-header mt-3 text-center'>
        <h3>Detalle del proyecto</h3>
      </div>
      <div className='card-body text-center'>
        <div className='row mb-4'>
          <div className='col-md-5'>
            <label className='form-label' htmlFor='participant'>Participantes</label>
            <div className='input-group'>
              <select onChange={(e) => handleUserSelect(e.target.value)} className='form-select' id='participant'>
                <option value='0' hidden>Selecciona un participante</option>
                {users.map(user => {
                  return <option key={user.id} value={user.id}>{user.username}</option>
                })}
              </select>
              <button className='btn btn-outline-warning' onClick={addParticipant}>Agregar</button>
            </div>
          </div>
          <div className='col-md-3'>
            <label className='form-label' htmlFor='role'>Rol</label>
            <select onChange={(e) => handleRoleSelect(e.target.value)} className='form-select' id='role'>
              <option value='0' hidden>Seleccione un rol</option>
              <option value='1'>Administrador</option>
              <option value='2'>Colaborador</option>
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <h4>Participantes del proyecto</h4>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(participant => {
                  const projectParticipant = project.participants.find(p => p.userId === participant.id);
                  return (
                    <tr key={participant.id}>
                      <td>{participant.id}</td>
                      <td>{participant.username}</td>
                      <td>{projectParticipant.roleId}</td>
                      <td><i className='bi bi-trash' onClick={() => removeParticipant(participant.id)} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className='col-md-6'>
            <h4>Tareas del proyecto</h4>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Título</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td><div className='d-flex justify-content-center'><div className={getStatusColor(task.status)} /></div></td>
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
