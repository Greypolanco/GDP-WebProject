import React, { useEffect, useState } from "react";
import * as TaskService from "../../services/TaskService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatDate, getStatusColor, getStatusText } from "../../utils/utils";

const TaskView = () => {
  const userLogged = JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const initialState = {
    id: 0,
    title: "Not Found",
    description: "",
    status: "",
    startDate: "",
    endDate: "",
    note: "",
  };
  const [task, setTask] = useState(initialState);
  const { id } = useParams();

  const getTask = async () => {
    try {
      const response = await TaskService.getTask(id);
      userLogged.id === response.userId ? setTask(response) : navigate('/tasks')
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    const statusInt = parseInt(status);
    const newTask = { ...task, status: statusInt };
    setTask(newTask);
    try {
      await TaskService.updateTask(newTask);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusClick = () => {
    if (editMode === true) {
      setEditMode(false);
    }
    else {
      setEditMode(true);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="card">
      <div className="card-header text-center">
        <h3>{task.title}</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h3>Descripción</h3>
            <p>{task.description}</p>
          </div>
          <div className="col">
            <div className="d-flex">
              <h5>Estado</h5>
            </div>
            <div className="d-flex">
              {editMode
                ?
                <select value={task.status} onChange={handleStatusChange}>
                  <option value='1'>En progreso</option>
                  <option value='2'>Pendiente</option>
                  <option value='3'>Completado</option>
                  <option value='4'>Detenido</option>
                </select>
                :
                <div className="d-flex">
                  <div className={`me-1 ${getStatusColor(task.status)}`}></div>
                  <p>{getStatusText(task.status)}</p>
                </div>
              }
              <button className=
                {`ms-2 ${editMode
                  ? 'btn btn-success bi bi-check-circle'
                  : 'btn btn-secondary bi bi-pencil'}`
                } onClick={handleStatusClick}>
              </button>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Fecha de inicio</h5>
            <p>{formatDate(task.startDate)}</p>
          </div>
          <div className="col">
            <h5>Fecha de fin</h5>
            <p>{formatDate(task.endDate)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Nota</h5>
            <p>{task.note === "" ? "-" : task.note}</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TaskView;
