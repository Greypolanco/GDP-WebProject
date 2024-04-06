import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";

const TaskIndex = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <header>
        <h1>Tareas</h1>
      </header>
      <section>
        <TaskList onTaskSelect={handleTaskSelect} />
      </section>
    </div>
  );
};

export default TaskIndex;
