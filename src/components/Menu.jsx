import React from "react";
import "../styles/Menu.css";

export default function Menu({ onToggle }) {
    return (
    <div className="menu-icon" onClick={onToggle}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    );
}
