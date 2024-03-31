import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Componentes
import { Navbar } from "./components/index.jsx"

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route exact path="/" element={<button className="btn btn-info">Test</button>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
