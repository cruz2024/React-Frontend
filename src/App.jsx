import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ModuleView from "./components/ModuleView";
import ControlFinanciero from "./components/ControlFinanciero"; 
import Ingreso from "./components/IngresoView";   // ✅ nombre correcto
import Egreso from "./components/EgresoView";     // ✅ nombre correcto
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <header className="top-bar">
            <h1>URACCAN</h1>
          </header>

          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Módulo principal */}
            <Route path="/control-financiero" element={<ControlFinanciero />} />

            {/* ✅ Subrutas de Control Financiero */}
            <Route path="/control-financiero/ingreso" element={<Ingreso />} />
            <Route path="/control-financiero/egreso" element={<Egreso />} />

            <Route path="/gestion-agropecuaria" element={<ModuleView module="Gestión Agropecuaria" />} />
            <Route path="/gestion-agricola" element={<ModuleView module="Gestión Agrícola" />} />
            <Route path="/practicas" element={<ModuleView module="Prácticas Estudiantiles" />} />
            <Route path="/configuracion" element={<ModuleView module="Configuración y Seguridad" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
