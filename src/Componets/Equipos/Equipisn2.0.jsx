import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Equipo.css';

export const Equipos = () => {
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [espaciosPorEdificio, setEspaciosPorEdificio] = useState({});
    const [nombresPorEspacio, setNombresPorEspacio] = useState({});
    const [equiposPorEspacio, setEquiposPorEspacio] = useState({});

    const permisos = localStorage.getItem('permisos');
    const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');

    useEffect(() => {
        const fetchEdificios = async () => {
            try {
                const response = await axios.get(permisos === '1' 
                    ? 'http://localhost:3000/SelectEdificios' 
                    : 'http://localhost:3000/SelectEdificiosPorDepartamento', 
                    { params: { id_departamento: idDepartamentoPertenece } }
                );
                setEdificios(response.data.edificios);
            } catch (err) {
                alert('Error al cargar los edificios');
                console.error(err);
            }
        };

        fetchEdificios();
    }, [permisos, idDepartamentoPertenece]);

    const fetchEspacios = async (idEdificio) => {
        try {
            if (permisos === '2') {
                const response = await axios.get('http://localhost:3000/SelectEspaciosPorEdificio', {
                    params: { id_edificio: idEdificio, id_departamento: idDepartamentoPertenece },
                });
                return response.data.tiposEspacios || [];
            }
        } catch (err) {
            alert('Error al cargar los espacios');
            console.error(err);
        }
    };

    const fetchNombreEspacios = async (idEdificio, idEspacio) => {
        try {
            const response = await axios.get('http://localhost:3000/SelectNombrePorEspacios', {
                params: { id_tipoEspacio: idEspacio, id_edificio: idEdificio, id_departamento: idDepartamentoPertenece },
            });
            return response.data.nombresEspacio || [];
        } catch (err) {
            alert('Error al cargar los nombres de los espacios');
            console.error(err);
        }
    };

    const fetchEquipos = async (idEspacio) => {
        try {
            const response = await axios.get('http://localhost:3000/SelectEquiposPorEspacio', {
                params: { id_espacio: idEspacio },
            });
            setEquiposPorEspacio(prev => ({
                ...prev,
                [idEspacio]: response.data.equipos || [],
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdificioSelect = async (edificio) => {
        if (selectedEdificio && selectedEdificio.id === edificio.id) {
            setSelectedEdificio(null);
            setSelectedEspacio(null);
            setEspaciosPorEdificio({});
            setNombresPorEspacio({});
            setEquiposPorEspacio({});
        } else {
            setSelectedEdificio(edificio);
            setSelectedEspacio(null);
            const espaciosObtenidos = await fetchEspacios(edificio.id_edificio);
            setEspaciosPorEdificio(prevState => ({
                ...prevState,
                [edificio.id_edificio]: espaciosObtenidos
            }));
        }
    };

    const handleEspacioSelect = async (espacio) => {
        if (selectedEspacio && selectedEspacio.id_tipoEspacio === espacio.id_tipoEspacio) {
            setSelectedEspacio(null);
            setNombresPorEspacio(prev => ({ ...prev, [espacio.id_tipoEspacio]: [] }));
        } else {
            setSelectedEspacio(espacio);

            // Obtener los nombres de los espacios seleccionados
            const nombresObtenidos = await fetchNombreEspacios(selectedEdificio.id_edificio, espacio.id_tipoEspacio);
            setNombresPorEspacio(prevState => ({
                ...prevState,
                [espacio.id_tipoEspacio]: nombresObtenidos
            }));

            // Cargar equipos para el espacio seleccionado
            await fetchEquipos(espacio.id_tipoEspacio);
        }
    };

    const handleNombreEspacioClick = (nombreEspacio) => {
        // Puedes agregar lógica aquí si necesitas manejar algo al hacer clic en un nombre de espacio.
        console.log('Nombre del espacio seleccionado:', nombreEspacio);
    };

    const equipos = selectedEspacio ? equiposPorEspacio[selectedEspacio.id_tipoEspacio] || [] : [];

    return (
        <div className="equipos-container">
            <h1 className="equipos-title">Equipos</h1>
            <ul className="equipos-edificio-list">
                {edificios.map((edificio) => (
                    <li key={edificio.id_edificio} className="equipos-edificio-item">
                        <span 
                            onClick={() => handleEdificioSelect(edificio)} 
                            className="equipos-edificio-name"
                        >
                            {edificio.nombre}
                        </span>
                        {selectedEdificio && selectedEdificio.id === edificio.id && (
                            <ul className="equipos-espacio-list">
                                {espaciosPorEdificio[edificio.id_edificio]?.map((espacio) => (
                                    <li key={espacio.id_tipoEspacio} className="equipos-espacio-item">
                                        <span 
                                            onClick={() => handleEspacioSelect(espacio)} 
                                            className="equipos-espacio-name"
                                        >
                                            {espacio.nombre}
                                        </span>
                                        {selectedEspacio && selectedEspacio.id_tipoEspacio === espacio.id_tipoEspacio && (
                                            <ul className="equipos-nombres-list">
                                                {nombresPorEspacio[espacio.id_tipoEspacio]?.length > 0 ? (
                                                    nombresPorEspacio[espacio.id_tipoEspacio].map((nombreEspacio, idx) => (
                                                        <li key={idx} className="equipos-nombre-item">
                                                            <span 
                                                                className="equipos-nombre-name"
                                                                onClick={() => handleNombreEspacioClick(nombreEspacio)}
                                                            >
                                                                {nombreEspacio.nombre}
                                                            </span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No hay nombres de espacio disponibles.</li>
                                                )}
                                                <button className="equipos-select-button">+</button>
                                                <ul className="equipos-lista-equipos">
                                                    {equipos.length > 0 ? (
                                                        equipos.map((equipo) => (
                                                            <li key={equipo.id_equipo} className="equipos-equipo-item">
                                                                <span className="equipos-equipo-name">
                                                                    {equipo.nombre}
                                                                </span>
                                                                <button className="equipos-edit-button">Actualizar</button>
                                                                <button className="equipos-delete-button">Eliminar</button>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>No hay equipos disponibles.</li>
                                                    )}
                                                </ul>
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};