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
    const [folios, setFolios] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [estados, setEstados] = useState([]);
    const [colores, setColores] = useState([]);
    const [selectedIncidencia, setSelectedIncidencia] = useState(null);
    const [especializaciones, setEspecializaciones] = useState([]);
    const [especializacion, setEspecializacion] = useState('');
    const [tecnicos, setTecnicos] = useState([]);
    const [tecnico, setTecnico] = useState('');
    const [hrEnvio, setHrEnvio] = useState('');
    const [hrInicio, setHrInicio] = useState('');
    const [hrFin, setHrFin] = useState('');
    const [nomPrioridad, setNombrePrioridad] = useState('');
    const [descPrioridad, setDescPrioridad] = useState('');
    const [nomEspacio, setNomEspacio] = useState('');
    const [ubiEspacio, setUbiEspacio] = useState('');
    const [ubiEdificio, setUbiEdificio] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoIncidencia, setTipoIncidencia] = useState('');
    const [estado, setEstado] = useState('');
    const [id_incidencia, setId_incidencia] = useState('');

    useEffect(() => {
        const storedPermisos = localStorage.getItem('permisos');
        if (storedPermisos) {
            setPermisos(storedPermisos);
        }
        handleDetalleTabla(storedPermisos);
    }, []);

    const handleDetalleTabla = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMON');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(prevDetalles => [
                        ...prevDetalles, 
                        ...tiposIncidenciaA.map((tipo, index) => ({ 
                            tipoIncidencia: tipo, 
                            descripcion: descripcionesA[index] 
                        }))
                    ]);
                    setEstados(estadosA);
                    setColores(coloresA);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamento',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(prevDetalles => [
                        ...prevDetalles, 
                        ...tiposIncidenciaA.map((tipo, index) => ({ 
                            tipoIncidencia: tipo, 
                            descripcion: descripcionesA[index] 
                        }))
                    ]);
                    setEstados(estadosA);
                    setColores(coloresA);
                }
            }
            else if(permisos === '4'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnico',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(prevDetalles => [
                    ...prevDetalles, 
                    ...tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    }))
                ]);
                setEstados(estadosA);
                setColores(coloresA);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const selectEspecializaciones = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectEspecializaciones');
            setEspecializaciones(response.data);
            setEspecializacion(response.data[0].id_especializacion);
            selectTecnicos(response.data[0].id_especializacion);
        }catch(error){
            console.error('Error al obtener las especializaciones', error);
        }
    }

    const handleEspecializacionChange = (e) => {
        const idEspecializacion = e.target.value;
        setEspecializacion(idEspecializacion);
        selectTecnicos(idEspecializacion);
    }

    const selectTecnicos = async (idEspecializacion) => {
        try{
            const response = await axios.get('http://localhost:3000/SelectTecnicos',{
                params: {id_especializacion: idEspecializacion}
            });
            setTecnicos(response.data);
            if (response.data.length > 0) {
                setTecnico(response.data[0].id_usuario);
            } else {
                alert('No hay técnicos disponibles para esta especialización.');
            }
        }catch(error){
            console.error('Error al obtener los tecnicos', error);
        }
    }

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

    const handleOrdenTrabajo = (incidencia) => {
        setSelectedIncidencia(incidencia);
        selectEspecializaciones();
        setShowModal2(true);
    };
    

    const handleCloseModal2 = () => {
        setShowModal2(false);
        handleDetalleTabla(permisos);
    };
    
    const handleEnviar = async () => {
        if(!especializacion || !tecnico){
            alert('Complete los espacios en blanco');
            return;
        }else{
            try {
                const response = await axios.put('http://localhost:3000/AsignarTecnico',{
                    id_incidencia: selectedIncidencia.id_incidencia,
                    id_usuario: tecnico
                })
                alert('Tecnico Asignado exitosamente');
            } catch (error) {
                alert('Hubo un problema al asignar al tecnico');
                console.error(error.message);
            }
            handleCloseModal2();
        }
    };

    const handleCloseModal3 = () => {
        setShowModal3(false);
        handleDetalleTabla(permisos);
    };
    
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleDetalles = async (incidencia) => {
        try {
            const response = await axios.get('http://localhost:3000/DetalleIncidencia',{
                params: {id_incidencia: incidencia.id_incidencia}
            })
            const detalle = response.data;
                if (detalle) {
                    setFecha(incidencia.fecha)
                    setTipoIncidencia(incidencia.tipoIncidencia);
                    setDescripcion(incidencia.descripcion);
                    setHrEnvio(formatTime(detalle.hora_envio));
                    setHrInicio(formatTime(detalle.hora_disponible_inicio));
                    setHrFin(formatTime(detalle.hora_disponible_fin));
                    setNombrePrioridad(detalle.nombre_prioridad);
                    setDescPrioridad(detalle.descripcion_prioridad);
                    setNomEspacio(detalle.nombre_espacio);
                    setUbiEspacio(detalle.ubicacion_esp);
                    setUbiEdificio(detalle.ubicacion_edificio);
                    setEstado(incidencia.estado);
                    setId_incidencia(detalle.id_incidencia);
                    setShowModal3(true);
                }
        } catch (error) {
            alert('Hubo un problema traer el detalle de la incidencia');
                console.error(error.message);
        }
    };

    const handleRechazarIncidencia = async (incidencia) => {
        try {
            const response = await axios.put('http://localhost:3000/RechazarIncidencia',{
                id_incidencia: incidencia,
            })
            alert('Incidencia Rechazada exitosamente');
        } catch (error) {
            alert('Hubo un problema al rechazar la incidencia');
            console.error(error.message);
        }
        handleDetalleTabla(permisos);
    }
    
    const handleLiberarIncidencia = async (incidencia) => {
        try {
            const response = await axios.put('http://localhost:3000/LiberarIncidencia',{
                id_incidencia: incidencia,
            })
            alert('Incidencia Liberada exitosamente');
        } catch (error) {
            alert('Hubo un problema al liberar la incidencia');
            console.error(error.message);
        }
        handleDetalleTabla(permisos);
    }

    const handleFinalizar = async  () => {
        try {
            const response = await axios.put('http://localhost:3000/FinalizarIncidencia', {
                id_incidencia: id_incidencia
            })
            alert('Incidencia Finalizada exitosamente');
        } catch (error) {
            alert('Hubo un problema al finalizar la incidencia');
            console.error(error.message);
        }
        handleCloseModal3();
    }

    return (
        <div className="principal-admin-container">
            <hr className="hr" />
            <div className="principal-admin-buttons">
                <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Inicio</button>
                {(permisos === '1' || permisos === '4') && (
                    <button className="btn btn-primary principal-admin-btn" onClick={handleEquipo}>Equipo</button>

                )}
                <button type="button" className="btn btn-danger principal-admin-btn" onClick={handleEquipodeIncidencia}>Nueva Solicitud</button>
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
                        {folios.map((folio, index) => (
                            <tr key={index} className='renglon pO-border-cuerpo-general'>
                                <td className='pO-border-cuerpo nito'>{folio}</td>
                                <td className='pO-border-cuerpo'>{fechas[index]}</td>
                                {(permisos === '1') && (
                                    <td className='pO-border-cuerpo'>{departamentos[index]}</td>
                                )}
                                <td className='pO-border-cuerpo'>Incidencia: {detalles[index]?.tipoIncidencia}
                                    <br />
                                    Descripción Adicional: {detalles[index]?.descripcion}
                                </td>
                                <td className='pO-border-cuerpo' style={{ backgroundColor: colores[index] }}>{estados[index]}</td>
                                <td className='pO-border-cuerpo'> 
                                    {(permisos === '1') && (
                                        <>
                                            {(estados[index] === 'Enviado' || estados[index] === 'En Proceso') && (
                                                <button className='pO-orden-trabajo color-blanco' onClick={() => handleOrdenTrabajo({
                                                        id_incidencia: folio,
                                                        fecha: fechas[index],
                                                        departamento: departamentos[index],
                                                        tipoIncidencia: detalles[index]?.tipoIncidencia,
                                                        descripcion: detalles[index]?.descripcion
                                                })}>Orden de Trabajo</button>
                                            )}
                                            {(estados[index] === 'Enviado' || estados[index] === 'En Proceso') && (
                                                <button 
                                                    className='pO-orden-trabajo color-blanco' 
                                                    onClick={() => handleRechazarIncidencia(folio)}>
                                                    Rechazar
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {((permisos === '1' || permisos === '2') && estados[index] === 'Terminado') && (
                                                <button 
                                                    className='pO-orden-trabajo color-blanco' 
                                                    onClick={() => handleLiberarIncidencia(folio)}>
                                                    Liberar
                                                </button>
                                            )}
                                    {(permisos === '4') && (
                                        <button className='pO-orden-trabajo color-blanco' onClick={() => handleDetalles({
                                            id_incidencia: folio,
                                            fecha: fechas[index],
                                            departamento: departamentos[index],
                                            tipoIncidencia: detalles[index]?.tipoIncidencia,
                                            descripcion: detalles[index]?.descripcion,
                                            estado: estados[index]
                                        })}>Detalles</button>
                                    )}
                                </td>
                            </tr>
                        ))}
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
                                            <span>{selectedIncidencia.id_incidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Fecha de Solicitud: </label>
                                            <span>{selectedIncidencia.fecha}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Departamento: </label>
                                            <span>{selectedIncidencia.departamento}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span>{selectedIncidencia.tipoIncidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span>{selectedIncidencia.descripcion}</span>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="" className="form-label nito">Especialización: </label>
                                            <select className="form-select" value={especializacion} onChange={handleEspecializacionChange}>
                                                {especializaciones.map((esp, index) => (
                                                    <option value={esp.id_especializacion} key={esp.id_especializacion}> {esp.nombre} </option>
                                                ))}
                                            </select>
                                            <label htmlFor="" className="form-label nito">Asignar a: </label>
                                            <select className="form-select" value={tecnico} onChange={(e) => setTecnico(e.target.value)}>
                                                {tecnicos.map((tec, index) => (
                                                    <option value={tec.id_usuario} key={tec.id_usuario}> {tec.nombre} </option>
                                                ))}
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
                    <div className="modal-dialog" style={{ maxWidth: '60%' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles de Incidencia</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div>
                                            <label htmlFor="inputText" className="form-label pO-fecha-solicitud">Fecha de Solicitud: </label>
                                            <span>{fecha}</span>
                                            <label htmlFor="inputText" className="form-label pO-hr-solicitud">Hora de Solicitud: </label>
                                            <span>{hrEnvio}</span>
                                            <button type="button" className="btn btn-outline-danger pO-btn-equipo">Equipo</button>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span>{tipoIncidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span>{descripcion}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Disponibilidad de Horario: </label>
                                            <span>{hrInicio} a {hrFin}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Prioridad: </label>
                                            <span>{nomPrioridad}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Prioridad: </label>
                                            <span>{descPrioridad}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Lugar </label>
                                            <div className='pO-div-lugar'>
                                                <span>Ubicación Edificio: {ubiEdificio}</span>
                                                <br />
                                                <span>Nombre Espacio: {nomEspacio}</span>
                                                <br />
                                                <span>Ubicación Espacio: {ubiEspacio}</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal3}>Cancelar</button>
                                {(estado === 'En Proceso') && (
                                    <button type="button" className="btn btn-primary" onClick={handleFinalizar}>Finalizar</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}