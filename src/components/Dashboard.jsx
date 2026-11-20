import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Line, Doughnut } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement );

export default function Dashboard() {
  const [data, setData] = useState(null);

  // Llamada al backend
  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard")
      .then(res => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error(err);
        // valores vacíos para que el dashboard se muestre
        setData({
          totalIngresos: 0,
          totalEgresos: 0,
          utilidadNeta: 0,
          animales: 0,
          cultivosActivos: 0,
          estudiantesMes: 0,
          comportamientoFinanciero: [],
          distribucionIngresos: []
        });
      });
  }, []);

  if (!data) return <p>Cargando datos...</p>;

  // Configuración del gráfico de líneas
  const lineData = {
    labels: data.comportamientoFinanciero.map(d => d.mes),
    datasets: [
      {
        label: "Ingresos",
        data: data.comportamientoFinanciero.map(d => d.ingresos),
        borderColor: "green",
        backgroundColor: "rgba(46, 125, 50, 0.2)",
        fill: true
      },
      {
        label: "Egresos",
        data: data.comportamientoFinanciero.map(d => d.egresos),
        borderColor: "red",
        backgroundColor: "rgba(183, 28, 28, 0.2)",
        fill: true
      }
    ]
  };

  // Configuración del gráfico circular
  const doughnutData = {
    labels: data.distribucionIngresos.map(d => d.categoria),
    datasets: [
      {
        data: data.distribucionIngresos.map(d => d.monto),
        backgroundColor: ["#2e7d32", "#66bb6a", "#a5d6a7"]
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h2>!Hola, Juan de la Cruz! 👋 </h2>

      {/* Tarjetas resumen */}
      <div className="cards">
        <div className="card green">Total Ingresos: C${data.totalIngresos}</div>
        <div className="card red">Total Egresos: C${data.totalEgresos}</div>
        <div className="card neutral">Utilidad Neta: C${data.utilidadNeta}</div>
        <div className="card">Animales: {data.animales}</div>
        <div className="card">Cultivos Activos: {data.cultivosActivos}</div>
        <div className="card">Estudiantes (Mes): {data.estudiantesMes}</div>
      </div>

      {/* Gráfico de comportamiento financiero */}
      <div className="charts">
        <div className="chart">
          <h3>Comportamiento Financiero Mensual</h3>
          {data.comportamientoFinanciero.length === 0 ? (
            <p>No hay datos disponibles aún.</p>
          ) : (
            <Line data={lineData} />
          )}
        </div>

        {/* Gráfico circular de distribución */}
        <div className="chart">
          <h3>Distribución de Ingresos</h3>
          {data.distribucionIngresos.length === 0 ? (
            <p>No hay datos disponibles aún.</p>
          ) : (
            <Doughnut data={doughnutData} />
          )}
        </div>
      </div>
    </div>
  );
}
