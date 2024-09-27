import './Principal_administrador.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { useState } from 'react';

export const Principal_otro = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [contrasenia, setContrasenia] = useState('');

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/Principal');
    }

    const handleEquipoBodega = (e) => {
        e.preventDefault();
        navigate('/EquipoBodega')
    }

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('idDepartamentoPertenece');
        navigate('/Login');
    }

    const handleChangePasswordClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleValidar = (e) => {
        e.preventDefault();
        if(!contrasenia){
            alert('Necesita escribir una contraseña');
            return;
        }
        handleGuardarCambios();
    } 

    const handleGuardarCambios = async() => {
        const idUsuario = localStorage.getItem('idUsuario');
        alert(`El id del usuario si llego a lo de la contra, es ${idUsuario}`);
        console.log('ID de Usuario:', idUsuario);
        try {
            const response = await axios.put('http://localhost:3000/CambiarContrasenia', {idUsuario, contrasenia});
            if (response.status === 200) {
                alert('Contraseña cambiada exitosamente');
                setShowModal(false);
            } else {
                alert('No se pudo cambiar la contraseña. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Hubo un error al cambiar la contraseña');
        }
    };

    return (
        <div className="principal-admin-container">
            <hr className="hr" /> {/* Línea horizontal */}
            <div className="principal-admin-buttons">
                <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Inicio</button>
                <button type="button" className="btn btn-danger principal-admin-btn">Nueva Solicitud</button>
                <button type="button" className="btn btn-primary principal-admin-btn" onClick={handleEquipoBodega}>Computo</button>
                <button type="button" className="btn btn-success principal-admin-btn" onClick={handleChangePasswordClick}>Contraseña</button>
                <button type="button" className="btn btn-info principal-admin-btn" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cambiar Contraseña</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="inputNewPassword" className="form-label">Nueva Contraseña</label>
                                        <div className="input-container">
                                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputNewPassword" placeholder="Ingresa la nueva contraseña aquí" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)}/>
                                            <button 
                                                type="button" 
                                                className="show-password-button" 
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? 'Ocultar' : 'Mostrar'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleValidar}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}