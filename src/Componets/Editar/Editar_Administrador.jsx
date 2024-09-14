import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Editar_Administrador.css';
import { Departamento_Alta_Baja_Cambio } from '../Departamentos/Departamento_Alta_Baja_Cambio.jsx';

export const Editar_Administrador = () => {
    const [selectedContent, setSelectedContent] = useState(<Departamento_Alta_Baja_Cambio />);

    const menuItems = [
        { label: 'Departamento', content: <Departamento_Alta_Baja_Cambio /> },
        { label: 'Usuario', content: 'Contenido para Item 2' },
        { label: 'Espacio', content: 'Contenido para Item 3' },
        { label: 'Equipo', content: 'Contenido para Item 4' }
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 editar-sidebar">
                    <ul className="nav flex-column">
                        {menuItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <button
                                    className="editar-nav-link btn"
                                    onClick={() => setSelectedContent(item.content)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="col-md-9 col-lg-10 editar-content">
                    <h1>Contenido Central</h1>
                    <div>{selectedContent}</div>
                </main>
            </div>
        </div>
    );
};