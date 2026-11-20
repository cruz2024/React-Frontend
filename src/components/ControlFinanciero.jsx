import React, { useState } from 'react';
import Inggreso from "./IngresoView";
import Egreso from "./EgresoView";


export default function ControlFinanciero() {
    const [vista, setVista] = useState(null);

    return (
        <div className="control-financiero-container">
            <h2>Control Financiero</h2>

            <div className="control-financiero-buttons">
                <button onClick={() => setVista('ingreso')}>Ingreso</button>
                <button onClick={() => setVista('egreso')}>Egreso</button>
            </div>

            <div className="control-financiero-view">
                {vista === 'ingreso' && <IngresoView />}
                {vista === 'egreso' && <EgresoView />}
            </div>
        </div>
    );
}