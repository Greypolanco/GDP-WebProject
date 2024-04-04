import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";
import { AuthProvider } from './context/AppContext.jsx'
//Componentes
import { Navbar, ProjectsIndex, Login } from "./components/index.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container my-4 p-3">
          <Routes>
            <Route exact path="/projects" element={<ProjectsIndex />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
