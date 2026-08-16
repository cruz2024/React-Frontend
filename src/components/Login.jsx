import React, { useState } from "react";
import "../styles/Form.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
        if (response.ok) {
        localStorage.setItem("usuario", JSON.stringify(data));
        window.location.href = "/dashboard";
        } else {
        alert("Credenciales incorrectas");
        }
    } catch (error) {
        alert("Problema de conexión con el servidor");
    }
};

    return (
    <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
        </form>
        <p>No tienes cuenta <a href="">Registrate aqui</a></p>
    </div>
    );
}
