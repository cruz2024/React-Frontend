import React, { useState, useEffect } from "react";
import "../styles/IngresoView.css"; // Importa estilos exclusivos

export default function IngresoView() {
  const [ingresos, setIngresos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIngreso, setEditingIngreso] = useState(null);
  const [formData, setFormData] = useState({
    categoria: "",
    producto_servicio: "",
    cantidad: "",
    monto: "",
    fecha: "",
    descripcion: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/ingreso")
      .then(res => res.json())
      .then(setIngresos)
      .catch(console.error);
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editingIngreso ? "PUT" : "POST";
    const url = editingIngreso
      ? `http://localhost:8080/api/ingreso/${editingIngreso.id}`
      : "http://localhost:8080/api/ingreso";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();

    setIngresos(editingIngreso
      ? ingresos.map(i => (i.id === data.id ? data : i))
      : [...ingresos, data]);

    setShowForm(false);
    setEditingIngreso(null);
    setFormData({
      categoria: "",
      producto_servicio: "",
      cantidad: "",
      monto: "",
      fecha: "",
      descripcion: ""
    });
  };

  const handleDelete = id =>
    fetch(`http://localhost:8080/api/ingreso/${id}`, { method: "DELETE" })
      .then(() => setIngresos(ingresos.filter(i => i.id !== id)));

  return (
    <div className="ingreso-container">
      <div className="ingreso-header">
        <h2>Ingreso</h2>
        <button className="btn-nuevo-ingreso" onClick={() => { setShowForm(true); setEditingIngreso(null); }}>
          + Nuevo registro
        </button>
      </div>

      <table className="tabla-ingreso">
        <thead>
          <tr>
            <th>ID</th><th>Categoría</th><th>Producto/Servicio</th>
            <th>Cantidad</th><th>Monto (C$)</th><th>Fecha</th><th>Descripción</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td><td>{i.categoria}</td><td>{i.producto_servicio}</td>
              <td>{i.cantidad}</td><td>C${i.monto}</td><td>{i.fecha}</td><td>{i.descripcion}</td>
              <td>
                <button className="btn-editar-ingreso" onClick={() => { setEditingIngreso(i); setFormData(i); setShowForm(true); }}>✏️</button>
                <button className="btn-eliminar-ingreso" onClick={() => handleDelete(i.id)}>🤔</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-ingreso">
          <div className="modal-ingreso-content">
            <h3>{editingIngreso ? "Editar Ingreso" : "Nuevo Ingreso"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required />
              <input type="text" name="producto_servicio" placeholder="Producto/Servicio" value={formData.producto_servicio} onChange={handleChange} required />
              <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required min="1" />
              <input type="number" name="monto" placeholder="Monto (C$)" value={formData.monto} onChange={handleChange} required min="1" />
              <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
              <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
              <button type="submit">{editingIngreso ? "Actualizar" : "Guardar"}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
