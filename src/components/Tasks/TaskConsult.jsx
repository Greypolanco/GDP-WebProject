import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../../services/TaskService';
import { getProject } from '../../services/ProjectService';
import { formatDate, getStatusColor } from '../../utils/utils';
import '../../utils/utils.css';

const TaskConsult = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]); // Nuevo estado para almacenar las tareas originales [1]
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para almacenar si el usuario es administrador o no
  const userLogged = JSON.parse(localStorage.getItem('user')) || null;
  const [criterion, setCriterion] = useState('');

  const listTasks = async () => {
    try {
      const response = await getTasks(userLogged.id);
      if (Array.isArray(response)) {
        setTasks(response);
        setOriginalTasks(response);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  const handleView = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleSearch = (event) => {
    const searchCriterion = event.target.value.toLowerCase();
    setCriterion(searchCriterion);
    const filteredList = originalTasks.filter(task => task.title.toLowerCase().includes(searchCriterion));
    setTasks(filteredList);
  };

  const handleEditClick = (taskId) => {
    navigate(`/tasks/form/${taskId}`);
  };

  const isDarkTheme = () => {
    const darkMode = document.body.classList.contains('dark-mode');
    return darkMode ? 'light' : 'dark';
  }

  const verifyIfAdmin = (task) => {
    try {
      // Obtener el proyecto al que pertenece la tarea
      const project = tasks.find(task => task.projectId === task.id);

      // Verificar si el usuario es el creador del proyecto
      if (project.creatorId === userLogged.id) {
        return true;
      }

      // Verificar si el usuario es administrador del proyecto
      const participant = project.participants.find(participant => participant.userId === userLogged.id && participant.roleId === 1);
      if (participant) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false; // En caso de error, asumimos que el usuario no es administrador
    }
  };

  useEffect(() => {
    listTasks();
    isDarkTheme();
  }, []);


  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <h3>Tus Tareas</h3>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Buscar tarea...' onChange={handleSearch} />
            <button className='btn btn-secondary bi bi-search' type='button'></button>
          </div>
        </div>
        <div className='card-body'>
          {loading
            ?
            <div className='spinner-border text-warning' role='status'>
              <span className='visually-hidden'>Cargando...</span>
            </div>
            : tasks.length === 0
              ?
              <div className='alert alert-warning'>No hay tareas para mostrar con el criterio:
                <strong> '{criterion}'</strong>
              </div>
              :
              <table className='table'>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Proyecto</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de Fin</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.projectId}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{formatDate(task.endDate)}</td>
                      <td>
                        <div className='d-flex justify-content-center'>
                          <div className={getStatusColor(task.status)}></div>
                        </div>
                      </td>
                      <td>
                        <button className='btn btn-outline-warning bi bi-eye m-1' onClick={() => handleView(task.id)}></button>
                        {verifyIfAdmin(task) && (
                          <button className={`btn btn-outline-${isDarkTheme()} bi bi-pencil`} onClick={() => handleEditClick(task.id)}></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>
    </div>
  )
}

export default TaskConsult;
