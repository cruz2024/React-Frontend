import React, { useState, useEffect } from "react";
import "../styles/IngresoView.css";

export default function IngresoView() {
    const [ingresos, setIngresos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingIngreso, setEditingIngreso] = useState(null);
    const [formData, setFormData] = useState({ nombre: "", cantidad: "", fecha: "" });

  // Cargar ingresos
    useEffect(() => {
    fetch("http://localhost:8080/api/ingreso")
    .then(res => res.json())
    .then(data => setIngresos(data));
}, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIngreso) {
      // Actualizar
    fetch(`http://localhost:8080/api/ingreso/${editingIngreso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
        setIngresos(ingresos.map(i => i.id === data.id ? data : i));
        setEditingIngreso(null);
        setShowForm(false);
        });
    } else {
      // Crear nuevo
    fetch("http://localhost:8080/api/ingreso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(data => {
        setIngresos([...ingresos, data]);
        setShowForm(false);
        });
    }
    setFormData({ nombre: "", cantidad: "", fecha: "" });
};

    const handleEdit = (ingreso) => {
    setEditingIngreso(ingreso);
    setFormData({ nombre: ingreso.nombre, cantidad: ingreso.cantidad, fecha: ingreso.fecha });
    setShowForm(true);
    };

    const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/ingreso/${id}`, { method: "DELETE" })
    .then(() => setIngresos(ingresos.filter(i => i.id !== id)));
};

    return (
    <div className="ingreso-container">
    <div className="ingreso-header">
        <h2>Gestión de Ingresos</h2>
        <button className="btn-nuevo" onClick={() => { setShowForm(true); setEditingIngreso(null); }}>
        + Nuevo Ingreso
        </button>
    </div>

    <table className="tabla-ingresos">
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {ingresos.map((i) => (
            <tr key={i.id}>
            <td>{i.nombre}</td>
            <td>{i.cantidad}</td>
            <td>{i.fecha}</td>
            <td>
                <button onClick={() => handleEdit(i)}>✏️ Editar</button>
                <button onClick={() => handleDelete(i.id)}>🗑️ Eliminar</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>

    {showForm && (
        <div className="modal">
        <div className="modal-content">
            <h3>{editingIngreso ? "Editar Ingreso" : "Nuevo Ingreso"}</h3>
            <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
            <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} />
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
            <button type="submit">{editingIngreso ? "Actualizar" : "Guardar"}</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </form>
        </div>
        </div>
    )}
    </div>
    );
}
