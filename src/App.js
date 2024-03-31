import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//Componentes
import { Navbar, ProjectsIndex } from "./components/index.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />
      <div className="container card my-4 p-3">
        <Routes>
          <Route exact path="/" element={<ProjectsIndex/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
