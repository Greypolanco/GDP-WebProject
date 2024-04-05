import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";
import { AuthProvider } from './context/AppContext.jsx'
//Componentes
import { Navbar, ProjectsIndex, Login, ProjectConsult, ProjectView } from "./components/index.jsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const localStorageMode = localStorage.getItem('darkMode');
    if (localStorageMode) {
      setIsDarkMode(localStorageMode === 'true');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

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
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
