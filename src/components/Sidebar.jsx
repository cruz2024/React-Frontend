import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [showFinanciero, setShowFinanciero] = React.useState(false);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🏝️ FINCA</h2>
      <ul>
        <li><Link to="/dashboard"> 📊 Dashboard</Link></li>

        <li>
          <button
            className="submenu-toggle"
            onClick={() => setShowFinanciero(!showFinanciero)}
          >
            📈 Control Financiero
          </button>
          {showFinanciero && (
            <ul className="submenu">
              {/* ✅ rutas corregidas en singular */}
              <li><Link to="/control-financiero/ingreso">📈 Ingreso</Link></li>
              <li><Link to="/control-financiero/egreso">📉 Egreso</Link></li>
            </ul>
          )}
        </li>
        
        <li><Link to="/gestion-agropecuaria"> 🚜 Gestión Agropecuaria</Link></li>
        <li><Link to="/gestion-agricola"> 🌾 Gestión Agrícola</Link></li>
        <li><Link to="/practicas"> 📝 Prácticas Estudiantiles</Link></li>
        <li><Link to="/configuracion"> ⚙️ Configuración y Seguridad</Link></li>
      </ul>
    </aside>
  );
}
