import './Principal_administrador.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from 'react';

export const Principal_otro = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [contrasenia, setContrasenia] = useState('');
    const [permisos, setPermisos] = useState('');
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    useEffect(() => {
        const storedPermisos = localStorage.getItem('permisos');
        if (storedPermisos) {
            setPermisos(storedPermisos);
        }
    }, []);

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/Principal');
    };

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('idDepartamentoPertenece');
        localStorage.removeItem('permisos');
        navigate('/Login');
    };

    const handleChangePasswordClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleValidar = (e) => {
        e.preventDefault();
        if(!contrasenia){
            alert('Necesita escribir una contraseña');
            return;
        }
        handleGuardarCambios();
    };

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

    const handleEquipo = () => {
        navigate('/EquipoBodega');
    };
    const handleEquipodeIncidencia = () => {
        navigate('/EquipodeIncidencia');
    };

    const handleOrdenTrabajo = () => {
        setShowModal2(true);
    };

    const handleCloseModal2 = () => {
        setShowModal2(false);
    };
    
    const handleEnviar = (e) => {
        e.preventDefault();
    };

    const handleCloseModal3 = () => {
        setShowModal3(false);
    };
    
    const handleDetalles = (e) => {
        setShowModal3(true);
    };

    

    return (
        <div className="principal-admin-container">
            <hr className="hr" />
            <div className="principal-admin-buttons">
                <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Inicio</button>
                {(permisos === '1' || permisos === '4') && (
                    <button className="btn btn-primary principal-admin-btn" onClick={handleEquipo}>Equipo</button>

                )}
                <button type="button" className="btn btn-danger principal-admin-btn" onClick={handleEquipodeIncidencia}>Nueva Solicitud</button>
                <button type="button" className="btn btn-warning principal-admin-btn">Computo</button>
                <button type="button" className="btn btn-success principal-admin-btn" onClick={handleChangePasswordClick}>Contraseña</button>
                <button type="button" className="btn btn-info principal-admin-btn" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
            <div className='pO-div-btns-group'>
                <button type="button" class="btn btn-outline-light pO-btns-border-color">Todos</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color">Enviados</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color">En Proceso</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color">Terminados</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color">Liberados</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color">Rechazados</button>
            </div>
            <div className='pO-div-tabla'>
                <table class="tabla" className='pO-tabla-centrado'>
                    <thead className='pO-tabla-encabezado color-blanco'>
                        <tr class="encabezado">
                            <th className='pO-folio pO-border-encabezado'>Folio</th>
                            <th className='pO-fecha pO-border-encabezado'>Fecha de Solicitud</th>
                            {(permisos === '1') && (
                                <th className='pO-departamento pO-border-encabezado'>Departamento</th>
                            )}
                            <th className='pO-descripcion pO-border-encabezado'>Descripción</th>
                            <th className='pO-estatus pO-border-encabezado'>Estatus</th>
                            <th className='pO-acciones pO-border-encabezado'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="renglon" className='pO-border-cuerpo-general' v-for="">
                            <td className='pO-border-cuerpo nito'></td>
                            <td className='pO-border-cuerpo'></td>
                            {(permisos === '1') && (
                                <td className='pO-border-cuerpo'>Departamentuki</td>
                            )}
                            <td className='pO-border-cuerpo'></td>
                            <td className='pO-border-cuerpo'></td>
                            <td className='pO-border-cuerpo'> 
                                {(permisos === '1') && (
                                    <>
                                        <button className='pO-orden-trabajo color-blanco' onClick={handleOrdenTrabajo}>Orden de Trabajo</button>
                                        <button className='pO-orden-trabajo color-blanco'>Rechazar</button>
                                    </>
                                )}
                                {(permisos === '4') && (
                                    <button className='pO-orden-trabajo color-blanco' onClick={handleDetalles}>Detalles</button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
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

            {showModal2 && (
                <div className="modal-overlay" onClick={handleCloseModal2}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Orden de Trabajo</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div className='pO-div-noEditable'>
                                            <label htmlFor="inputText" className="form-label">Folio: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Fecha de Solicitud: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Departamento: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span></span>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="" className="form-label nito">Especialización: </label>
                                            <select className="form-select">
                                                <option></option>
                                            </select>
                                            <label htmlFor="" className="form-label nito">Asignar a: </label>
                                            <select className="form-select">
                                                <option></option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal2}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleEnviar}>Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal3 && (
                <div className="modal-overlay" onClick={handleCloseModal3}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles de Incidencia</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div>
                                            <label htmlFor="inputText" className="form-label">Fecha de Solicitud: </label>
                                            <span></span>
                                            <label htmlFor="inputText" className="form-label">Hora de Solicitud: </label>
                                            <span></span>
                                            <br />
                                            <button type="button" class="btn btn-outline-danger">Equipo</button>
                                            <button type="button" class="btn btn-outline-info">Lugar</button>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Disponibilidad de Horario: </label>
                                            <span></span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Prioridad: </label>
                                            <span></span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal3}>Cancelar</button>
                                <button type="button" className="btn btn-primary">Finalizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}