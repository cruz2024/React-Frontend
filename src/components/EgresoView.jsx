import React, { useState, useEffect } from "react";
import "../styles/EgresoView.css"; // Estilos exclusivos para Egreso

export default function EgresoView() {
  const [egresos, setEgresos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEgreso, setEditingEgreso] = useState(null);
  const [formData, setFormData] = useState({
    categoria: "",
    producto_servicio: "",
    cantidad: "",
    monto: "",
    fecha: "",
    descripcion: ""
  });

  // Cargar egresos al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/api/egreso")
      .then(res => res.json())
      .then(setEgresos)
      .catch(console.error);
  }, []);

  // Actualizar formulario
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Guardar o actualizar egreso
  const handleSubmit = async e => {
    e.preventDefault();
    const method = editingEgreso ? "PUT" : "POST";
    const url = editingEgreso
      ? `http://localhost:8080/api/egreso/${editingEgreso.id}`
      : "http://localhost:8080/api/egreso";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();

    setEgresos(editingEgreso
      ? egresos.map(e => (e.id === data.id ? data : e))
      : [...egresos, data]);

    setShowForm(false);
    setEditingEgreso(null);
    setFormData({
      categoria: "",
      producto_servicio: "",
      cantidad: "",
      monto: "",
      fecha: "",
      descripcion: ""
    });
  };

  // Editar egreso
  const handleEdit = e => {
    setEditingEgreso(e);
    setFormData({ ...e });
    setShowForm(true);
  };

  // Eliminar egreso
  const handleDelete = id =>
    fetch(`http://localhost:8080/api/egreso/${id}`, { method: "DELETE" })
      .then(() => setEgresos(egresos.filter(e => e.id !== id)));

  // Renderizado
  return (
    <div className="egreso-container">
      <div className="egreso-header">
        <h2>Control Financiero</h2>
        <h3>Registro de Egreso</h3>
        <button className="btn-nuevo-egreso" onClick={() => { setShowForm(true); setEditingEgreso(null); }}>
          + Nuevo registro
        </button>
      </div>

      <table className="tabla-egreso">
        <thead>
          <tr>
            <th>ID</th><th>Categoría</th><th>Producto/Servicio</th>
            <th>Cantidad</th><th>Monto (C$)</th><th>Fecha</th><th>Descripción</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {egresos.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td><td>{e.categoria}</td><td>{e.producto_servicio}</td>
              <td>{e.cantidad}</td><td>C${e.monto}</td><td>{e.fecha}</td><td>{e.descripcion}</td>
              <td>
                <button className="btn-editar-egreso" onClick={() => handleEdit(e)}>✏️</button>
                <button className="btn-eliminar-egreso" onClick={() => handleDelete(e.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-egreso">
          <div className="modal-egreso-content">
            <h3>{editingEgreso ? "Editar Egreso" : "Nuevo Egreso"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required />
              <input type="text" name="producto_servicio" placeholder="Producto/Servicio" value={formData.producto_servicio} onChange={handleChange} required />
              <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required min="1" />
              <input type="number" name="monto" placeholder="Monto (C$)" value={formData.monto} onChange={handleChange} required min="1" />
              <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
              <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
              <button type="submit">{editingEgreso ? "Actualizar" : "Guardar"}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
