import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, getStatusColor, getStatusText } from '../../utils/utils';
import '../../utils/utils.css';
import './TaskItem.css';

const TaskItem = ({task}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/tasks/${task.id}`);
    };

  return (
    <div className='item-container card m-2' onClick={handleClick}>
      <section className='info-container p-2'>
        <h2>{task.title}</h2>
        <p><strong>Descripción:</strong> {task.description}</p>
        <p><strong>Fecha de inicio:</strong> {formatDate(task.startDate)}</p>
        <div className='d-flex'>
          <strong>Estado:</strong>
          <div className={`ms-1 mt-1 me-1 ${getStatusColor(task.status)}`}>
          </div>{getStatusText(task.status)}
        </div>
      </section>
    </div>
  );
};

export default TaskItem
