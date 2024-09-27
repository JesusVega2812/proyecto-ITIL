import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Equipo.css';

export const Equipos = () => {
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const [tiposEspacios, setTiposEspacios] = useState([]);
    const [selectedTipoEspacio, setSelectedTipoEspacio] = useState(null);
    const [nombresEspacio, setNombresEspacio] = useState([]);
    const [selectedNombreEspacio, setSelectedNombreEspacio] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [departamentoPertenece, setDepartamentoPertenece] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [radioCheckEquipo, setRadioCheckEquipo] = useState('Computadora');
    const [nombreEquipo, setNombreEquipo] = useState([]);
    const [claveEquipo, setClaveEquipo] = useState('');


    const permisos = localStorage.getItem('permisos');
    const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');

    useEffect(() => {
        const fetchEdificios = async () => {
            try {
                if(permisos === '1'){
                    const response = await axios.get('http://localhost:3000/SelectEdificios');
                    setEdificios(response.data.edificios);
                }else{
                    const response = await axios.get('http://localhost:3000/SelectEdificiosPorDepartamento',
                       {params: { id_departamento: idDepartamentoPertenece }}
                    )
                    setEdificios(response.data.edificios);
                }
                const departamentoResponse = await axios.get(`http://localhost:3000/SelectDepartamento`, {
                    params: { id_pertenece: idDepartamentoPertenece },
                });
                setDepartamentoPertenece(departamentoResponse.data.result);
            } catch (err) {
                alert('Error al cargar los edificios');
                console.error(err);
            }
        }; 
        fetchEdificios();
    }, [permisos, idDepartamentoPertenece]);

    const fetchEspacios = async (id_edificio) => {
        try {
            if (permisos === '2') {
                const response = await axios.get('http://localhost:3000/SelectEspaciosPorEdificio', {
                    params: { id_edificio: id_edificio, id_departamento: idDepartamentoPertenece },
                });
                setTiposEspacios(response.data.tiposEspacios || []);
            }
            else{
                const response = await axios.get('http://localhost:3000/SelectEspaciosPorEdificioADMON', {
                    params: {id_edificio: id_edificio},
                });
                setTiposEspacios(response.data.tiposEspacios || []);
            }
        } catch (err) {
            alert('Error al cargar los espacios');
            console.error(err);
        }
    };

    const fetchNombreEspacios = async (id_edificio, idTipoEspacio) => {
        try {
            if(permisos === '2'){
                const response = await axios.get('http://localhost:3000/SelectNombrePorEspacios', {
                    params: { id_tipoEspacio: idTipoEspacio, id_edificio: id_edificio, id_departamento: idDepartamentoPertenece },
                });
                setNombresEspacio(response.data.nombresEspacio || []);
            }else{
                const response = await axios.get('http://localhost:3000/SelectNombrePorEspaciosADMON', {
                    params: { id_tipoEspacio: idTipoEspacio, id_edificio: id_edificio},
                });
                setNombresEspacio(response.data.nombresEspacio || []);
            }
        } catch (err) {
            alert('Error al cargar los nombres de los espacios');
            console.error(err);
        }
    };

    const fetchEquipos = async (id_espacio, id_edificio, id_tipoEspacio) => {
        try {
            const response = await axios.get('http://localhost:3000/SelectEquiposPorEspacio', {
                params: { id_espacio: id_espacio, id_edificio: id_edificio, id_tipoEspacio: id_tipoEspacio },
            });
            setEquipos(response.data.equipos);
            
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdificioSelect = (edificio) => {
        if (selectedEdificio === edificio) {
            setSelectedEdificio(null);
            setTiposEspacios([]);
            setSelectedTipoEspacio(null);
            setNombresEspacio([]);
            setSelectedNombreEspacio(null);
        } else {
            setSelectedEdificio(edificio);
            fetchEspacios(edificio.id_edificio);
        }
    };

    const handleTipoEspacioSelect = (tipoEspacio) => {
        if (selectedTipoEspacio === tipoEspacio) {
            setSelectedTipoEspacio(null);
            setNombresEspacio([]);
            setSelectedNombreEspacio(null);
            setEquipos([]);
        } else {
            setSelectedTipoEspacio(tipoEspacio);
            fetchNombreEspacios(selectedEdificio.id_edificio, tipoEspacio.id_tipoEspacio);
        }
    };
    
    const handleNombreEspacioSelect = (nombreEspacio) => {
        if (selectedNombreEspacio === nombreEspacio) {
            setSelectedNombreEspacio(null);
            setEquipos([]);
        } else {
            setSelectedNombreEspacio(nombreEspacio);
            fetchEquipos(nombreEspacio.id_espacio, selectedEdificio.id_edificio, selectedTipoEspacio.id_tipoEspacio);
        }
    };

    const handleNewEquipo = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRadioChangeEquipo = (event) => {
        const valueCheckEquipo = event.target.value;
        setRadioCheckEquipo(valueCheckEquipo);
        console.log(valueCheckEquipo);
        limpiar();
    };

    const handleValidar = (event) => {
        event.preventDefault();
        if(nombreEquipo || claveEquipo){
            alert('Necesita completar los campos');
            return;
        }
        handleGuardarCambios();
    }

    const handleGuardarCambios = (event) => {
        event.preventDefault();
    }

    const limpiar = () => {
        
    }

    return (
        <div className="equipos-container">
            <h1 className="equipos-title">Gestión de Equipos </h1>
            <ul className="equipos-edificio-list">
                {Array.isArray(edificios) && edificios.length > 0 ? (
                    edificios.map((edificio) => (
                        <li key={edificio.id_edificio} className="equipos-edificio-item">
                            <div className="equipos-edificio-name" onClick={() => handleEdificioSelect(edificio)} >
                                {edificio.nombre}
                            </div>
                            {selectedEdificio && selectedEdificio.id_edificio === edificio.id_edificio && (
                                <ul className="equipos-espacio-list">
                                    {Array.isArray(tiposEspacios) && tiposEspacios.length > 0 ? (
                                        tiposEspacios.map((tipoEspacio) => (
                                            <li key={tipoEspacio.id_tipoEspacio} className="equipos-espacio-item">
                                                <div className="equipos-espacio-name" onClick={() => handleTipoEspacioSelect(tipoEspacio)}>
                                                    {tipoEspacio.nombre}
                                                </div>
                                                {selectedTipoEspacio && selectedTipoEspacio.id_tipoEspacio === tipoEspacio.id_tipoEspacio && (
                                                    <ul className="equipos-nombres-list">
                                                        {Array.isArray(nombresEspacio) && nombresEspacio.length > 0 ? (
                                                            nombresEspacio.map((nombreEspacio) => (
                                                                <li key={nombreEspacio.id_espacio} className="equipos-nombre-item">
                                                                    <div className="equipos-nombre-name" onClick={() => handleNombreEspacioSelect(nombreEspacio)}>
                                                                        {nombreEspacio.nombre}
                                                                    </div>
                                                                    {selectedNombreEspacio && selectedNombreEspacio.id_espacio === nombreEspacio.id_espacio && (
                                                                        <>
                                                                            <button className="equipos-select-button" onClick={handleNewEquipo}>New</button>
                                                                            <ul className="equipos-lista-equipos">
                                                                                {Array.isArray(equipos) && equipos.length > 0 ? (
                                                                                    equipos.map((equipo) => (
                                                                                        <li key={equipo.id_equipo} className="equipos-equipo-item">
                                                                                            <div className="equipos-equipo-name">
                                                                                                {equipo.numero_serie}
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                                ) : (
                                                                                    <span>No hay equipos disponibles</span>
                                                                                )}
                                                                            </ul>
                                                                        </>
                                                                    )}     
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <span>No hay nombres de espacios disponibles</span>
                                                        )}
                                                    </ul>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <span>No hay tipos de espacios disponibles</span>
                                    )}
                                </ul>
                            )}
                        </li>
                    ))
                ) : (
                    <span>No hay edificios disponibles</span>
                )}
            </ul>
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Equipo</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Computadora" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Computadora'} ></input>
                                            <label className="form-check-label" htmlFor="idRadioAgregar">Computadora</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Impresora" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Impresora'}></input>
                                            <label className="form-check-label" htmlFor="idRadioActualizar">Impresora</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Servidor" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Servidor'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Servidor</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Switch" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Switch'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Switch</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Router" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Router'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Router</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Escaner" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Escaner'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Escaner</label>
                                        </div>

                                        <div className="input-container">
                                            <label htmlFor="inputText" className="form-label">Selecciona el equipo</label>
                                            <select className="form-select" >
                                                <option value="" ></option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputText" className="form-label">Clave del equipo</label>
                                            <input type="text" className="form-control" id="inputText" placeholder="Ingresa la clave aquí" value={claveEquipo} onChange={(e) => setClaveEquipo(e.target.value)}></input>
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
};