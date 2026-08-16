import React, { useState } from "react";
import "../styles/Form.css";

export default function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
    });
        const data = await response.json();
        if (response.ok) {
        alert("Registro exitoso, ahora inicia sesión.");
        window.location.href = "/login";
    } else {
        alert(data.message || "Error en el registro");
        if (data.message === "Email ya registrado"){
            window.location.href = "/login";
        }
    }
    } catch (error) {
        alert("Problema de conexión con el servidor");
    }
};

    return (
    <div className="form-container">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="/login">Inicia session aqui</a> </p>
    </div>
    );
}
