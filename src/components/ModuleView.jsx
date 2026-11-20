import React, { useEffect, useState } from "react";
import "../styles/ModuleView.css";

/**
 * Vista genérica para cualquier módulo.
 * Recibe el nombre del módulo como prop y carga datos desde el backend.
 */
export default function ModuleView({ module }) {
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
    let endpoint = "";
    if (module === "Control Financiero") endpoint = "/api/control-financiero";
    if (module === "Gestión Agropecuaria") endpoint = "/api/gestion-agropecuaria";
    if (module === "Gestión Agrícola") endpoint = "/api/gestion-agricola";
    if (module === "Prácticas Estudiantiles") endpoint = "/api/practicas";
    if (module === "Configuración y Seguridad") endpoint = "/api/configuracion";

    if (endpoint) {
    fetch(`http://localhost:8080${endpoint}`)
        .then(res => res.json())
        .then(setRegistros)
        .catch(err => console.error(err));
    }
    }, [module]);

    return (
    <div className="module-view">
        <h2>{module}</h2>
        {registros.length === 0 ? (
        <p>No hay datos disponibles aún.</p>
    ) : (
        <table>
        <thead>
            <tr>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            {registros.map((r) => (
            <tr key={r.id}>
                <td>{r.descripcion}</td>
                <td>C${r.monto}</td>
                <td>{r.fecha}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
}
