import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";
import { AuthProvider } from './context/AppContext.jsx'
//Componentes
import {
  Navbar, ProjectsIndex, Login,
  ProjectConsult, ProjectView, TaskIndex,
  TaskView, ProjectForm, TaskConsult,
  TaskForm
} from "./components/index.jsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark-mode', newMode);
  };

  useEffect(() => {
    const localStorageMode = localStorage.getItem('darkMode');
    if (localStorageMode !== null) {
      setIsDarkMode(localStorageMode === 'true');
      document.body.classList.toggle('dark-mode', localStorageMode === 'true');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container my-4 p-3">
          <button
            className={`btn btn-${isDarkMode ? 'dark' : 'light'} bi bi-${isDarkMode ? 'sun' : 'moon'}`}
            onClick={toggleDarkMode}>
          </button>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            {/* Project routes */}
            <Route exact path="/projects" element={<ProjectsIndex />} />
            <Route exact path="/projects/:id" element={<ProjectView />} />
            <Route path="/projects/consult" element={<ProjectConsult />} />
            <Route path='/projects/form' element={<ProjectForm />} />
            <Route path='/projects/form/:id' element={<ProjectForm />} />
            {/* Task routes */}
            <Route path='/tasks' element={<TaskIndex />} />
            <Route path='/tasks/:id' element={<TaskView />} />
            <Route path='/tasks/consult' element={ <TaskConsult/> }/>
            <Route path='/tasks/form' element={<TaskForm />} />
            <Route path='tasks/form/:id' element={<TaskForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
