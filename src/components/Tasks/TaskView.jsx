import React, { useEffect, useState } from "react";
import * as TaskService from "../../services/TaskService";
import { useParams } from "react-router-dom";

const TaskView = () => {
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
      setTask(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTask();
  }, [task]);

  return (
    <div className="card">
      <div className="card-header text-center">
        <h3>{task.title}</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>
          <div className="col">
            <h5>Status</h5>
            <p>{task.status}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Start Date</h5>
            <p>{task.startDate}</p>
          </div>
          <div className="col">
            <h5>End Date</h5>
            <p>{task.endDate}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Note</h5>
            <p>{task.note === "" ? "-" : task.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
