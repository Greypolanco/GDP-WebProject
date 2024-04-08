import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../../services/TaskService';
import { getProject } from '../../services/ProjectService';
import { formatDate, getStatusColor } from '../../utils/utils';
import '../../utils/utils.css';

const TaskConsult = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para almacenar si el usuario es administrador o no
  const userLogged = JSON.parse(localStorage.getItem('user')) || null;

  const listTasks = async () => {
    try {
      const response = await getTasks(userLogged.id);
      if (Array.isArray(response)) {
        setTasks(response);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const verifyIfAdmin = async (task) => {
    if (!task) return false;

    const projectFound = await getProject(task.projectId);
    if (!projectFound) return false;

    const participantFound = projectFound.participants?.find(participant => participant.userId === userLogged.id);
    if (!participantFound) return false;

    return participantFound.roleId === 1;
  };

  const handleView = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleSearch = (event) => {
    const searchCriterion = event.target.value.toLowerCase();
    const filteredList = tasks.filter(task => task.title.toLowerCase().includes(searchCriterion));
    setTasks(filteredList);
  };

  const handleEditClick = (taskId) => {
    navigate(`/tasks/form/${taskId}`);
  };

  useEffect(() => {
    listTasks();
  }, []);

  useEffect(() => {
    // Verificar si el usuario es administrador al cargar las tareas
    const checkAdminStatus = async () => {
      // Suponemos que el usuario no es administrador
      setIsAdmin(false);
      // Verificar la administración para la primera tarea en la lista
      if (tasks.length > 0) {
        const isAdmin = await verifyIfAdmin(tasks[0]); // Verificar si el usuario es administrador para la primera tarea
        setIsAdmin(isAdmin); // Actualizar el estado con el resultado
      }
    };

    checkAdminStatus();
  }, [tasks]);

  return (
    <div>
      <div className='card'>
        <div className='card-header'>
          <h3>Tasks</h3>
          <div>
            <input type='text' placeholder='Search' onChange={handleSearch} />
          </div>
        </div>
        <div className='card-body'>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Project</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.projectId}</td>
                  <td>{formatDate(task.startDate)}</td>
                  <td>{formatDate(task.endDate)}</td>
                  <td><div className={getStatusColor(task.status)}></div></td>
                  <td>
                    <button className='btn btn-outline-warning bi bi-eye' onClick={() => handleView(task.id)}></button>
                    {isAdmin && <button className='btn btn-outline-light bi bi-pencil' onClick={() => handleEditClick(task.id)}></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TaskConsult;
