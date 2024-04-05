import React, { useState,useEffect } from 'react';
import * as TasksService from '../../services/TaskService';
import TaskItem from './TaskItem';

const TaskList = ({onTaskSelect}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    
    const listTasks = async () => {
        try {
          const response = await TasksService.getTasks(userLogged.id);
          if (Array.isArray(response)) {
            setTasks(response);
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
    };
    const handleTaskSelect = (task) => {
        onTaskSelect(task);
    };

    useEffect(() => {
        listTasks();
    }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando Tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No se encontraron tareas para este usuario {':('}</p>
      ) : (
        <div className='card'>
          <div className='card-header'>
            <h3>Tus Tareas</h3>
          </div>
          <div className='card-body'>
            {
              tasks.map((task) => {
                return <TaskItem key={task.id} task={task} onSelect={handleTaskSelect} />
              })
            }
          </div>
        </div>
      )}
    </div>
  )
};

export default TaskList;
