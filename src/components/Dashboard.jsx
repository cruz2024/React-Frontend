import React, { useState } from "react";
import "../styles/Dashboard.css";
import Menu from "./Menu";
import IngresoView from "./IngresoView";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>GetFin</h1>
        <Menu onToggle={toggleMenu} />
      </header>

      {menuOpen && (
        <aside className="dashboard-sidebar">
          <ul>
            <li onClick={() => setActiveModule("Ingreso")}>Ingreso</li>
            <li onClick={() => setActiveModule("Egreso")}>Egreso</li>
            <li onClick={() => setActiveModule("Cultivo")}>Cultivo</li>
            <li onClick={() => setActiveModule("Animales")}>Animales</li>
            <li onClick={() => setActiveModule("Estudiante")}>Estudiante</li>
            <li onClick={() => setActiveModule("Informe")}>Informe</li>
          </ul>
        </aside>
      )}

      <main className="dashboard-content">
        {activeModule === "Ingreso" ? (
          <IngresoView />
        ) : (
          <>
            <h2>Bienvenido al sistema</h2>
            <p>Selecciona un módulo del menú para comenzar.</p>
          </>
        )}
      </main>
    </div>
  );
}
