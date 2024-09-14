import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from '../Login/Login'; // Asegúrate de que la ruta es correcta
import './Editar_Administrador.css';

export const Editar = () => {
    const [selectedContent, setSelectedContent] = useState(<Login />);

    const menuItems = [
        { label: 'Espacio', content: <Login /> },
        { label: 'Equipo', content: 'Contenido para Item 3' }
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