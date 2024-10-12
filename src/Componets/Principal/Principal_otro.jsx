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
    const [nomEdificio, setNomEdificio] = useState('');
    const [responsable, setResponsable] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoIncidencia, setTipoIncidencia] = useState('');
    const [estado, setEstado] = useState('');
    const [id_incidencia, setId_incidencia] = useState('');
    const [prioridades, setPrioridades] = useState([]);
    const [prioridad, setPrioridad] = useState('');
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [equipo, setEquipo] = useState({
        tipo: '', // Inicializa como string vacío
        equipo: {},
        detalles: {}, // Inicializa como objeto vacío
        softwares: [] // Inicializa como array vacío
    });

    useEffect(() => {
        const storedPermisos = localStorage.getItem('permisos');
        if (storedPermisos) {
            setPermisos(storedPermisos); // Actualiza el estado permisos
        }
        handleDetalleTabla(storedPermisos); // Pasas la variable local solo al cargar
    }, []);

    const handleTodos = () => {
        handleDetalleTabla(permisos);
    };

    const handleEnviados = () => {
        handleDetalleTablaEnviados(permisos);
    };

    const handleEnProceso = () => {
        handleDetalleTablaEnProceso(permisos);
    };

    const handleTerminados = () => {
        handleDetalleTablaTerminados(permisos);
    };

    const handleLiberados = () => {
        handleDetalleTablaLiberados(permisos);
    };

    const handleRechazados = () => {
        handleDetalleTablaRechazados(permisos);
    };

    const handleDetalleTablaRechazados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONRechazados');
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
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoRechazados',
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
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoRechazados',
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

    const handleDetalleTablaTerminados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONTerminados');
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
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoTerminados',
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
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoTerminados',
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

    const handleDetalleTablaLiberados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONLiberados');
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
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoLiberados',
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
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoLiberados',
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

    const handleDetalleTablaEnProceso = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONEnProceso');
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
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoEnProceso',
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
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoEnProceso',
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

    const handleDetalleTablaEnviados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONEnviado');
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
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoEnviado',
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
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoEnviado',
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
            selectPrioridad(response.data[0].id_prioridad);
            selectTecnicos(response.data[0].id_especializacion);
        }catch(error){
            console.error('Error al obtener las especializaciones', error);
        }
    }

    const selectPrioridad = async () => {
        try{
            const response = await axios.get('http://localhost:3000/Prioridad');
            setPrioridades(response.data);
            setPrioridad(response.data[0].id_prioridad);
        }catch(error){
            console.error('Error al obtener las prioridades', error);
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
                    id_usuario: tecnico,
                    id_prioridad: prioridad
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
                    setResponsable(detalle.responsable);
                    setNomEdificio(detalle.nombre_edificio);
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

   const handleDiagnostico = () => {
        setShowModal3(false);
        setShowModal5(true);
   }

   const handleCloseModal5 = () => {
    setShowModal5(false);
};

    //----------------- DETALLE EQUIPO
    const handleDetalleEquipo = async () => {
        try{
            const idEquipo = await axios.get(`http://localhost:3000/SelectEquipoDeIncidencia`,{
                params: {
                    id_incidencia: id_incidencia // Pasar id_incidencia como query param
                }
            }) // Obtener el id_equipo desde data-id-equipo
            //setIdEquipo(idEquipo);
            console.log(idEquipo.data[0].id_equipo);
            detalleEquipo(idEquipo.data[0].id_equipo); // Pasar el idEquipo correctamente
            setShowModal4(true);
        } catch (err) {
            setEquipo([]);
            alert('Error al obtener el equipo que se esta atendiendo en la incidencia');
            console.error(err);
        }
    };

    const handleCloseModal4 = () => {
        setShowModal4(false);
    };

    const detalleEquipo = async (idEquipo) => {
        try {
            //const idEquipo = idEquipo;
            const response = await axios.get(`http://localhost:3000/DetalleEquipo/${idEquipo}`);
            //alert(response.data.tipo)
            setEquipo(response.data || []);
            console.log(response.data);
        } catch (err) {
            setEquipo([]);
            alert('Error al cargar el detalle de equipo, al parecer el tipo de equipo no esta especificado');
            console.error(err);
        }
    };
    // ----------- TERMINA DETALLE EQUIPO

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
                <button type="button" class="btn btn-outline-light pO-btns-border-color" onClick={handleTodos}>Todos</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color" onClick={handleEnviados}>Enviados</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color" onClick={handleEnProceso}>En Proceso</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color" onClick={handleTerminados}>Terminados</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color" onClick={handleLiberados}>Liberados</button>
                <button type="button" class="btn btn-outline-light pO-btns-border-color" onClick={handleRechazados}>Rechazados</button>
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
                                            <label htmlFor="inputNewPassword" className="form-label nito">Prioridad: </label>
                                            <select className="form-select" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                                {prioridades.map((prio, index) => (
                                                    <option value={prio.id_prioridad} key={prio.id_prioridad}> {prio.nombre} </option>
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
                                            <button type="button" className="btn btn-outline-danger pO-btn-equipo" onClick={handleDetalleEquipo}>Equipo</button>
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
                                                <span>Edificio: {nomEdificio}</span>
                                                <br />
                                                <span>Ubicación Edificio: {ubiEdificio}</span>
                                                <br />
                                                <span>Nombre Espacio: {nomEspacio}</span>
                                                <br />
                                                <span>Ubicación Espacio: {ubiEspacio}</span>
                                                <br />
                                                <span>Responsable: {responsable}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="tam-letra-17px color-boton-lila color-blanco btn-sin-border btn-tam-diagnostico" onClick={handleDiagnostico}>Diagnóstico</button>
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

            {showModal4 && (
                <div className="modal-overlay" onClick={handleCloseModal4}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                        <p></p>
                        <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseModal4}></button>
                            <div className="modal-header">
                                <h5 className="modal-title nito">Detalle Equipo</h5>
                            </div>
                            <div className="modal-body">
                            <form>
                                <div className="mb-3">   
                                    {/* Computadora */}
                                    {(equipo.tipo === 'Computadora') && (
                                        <div className="input-container">
                                            <label htmlFor="tipoComputadora" className="form-label nito">Tipo de computadora: </label>
                                            <span className="form-span">{equipo.detalles.tipoComputadora}</span>
                                            <br />
                                            <label htmlFor="softwares" className="form-label nito">Softwares: </label>
                                            {/*{equipo.softwares.map((soft, index) => (
                                                <span key={index} className="form-span">{soft.nombre}</span>
                                            ))}*/}
                                            <br />
                                        </div>
                                    )}

                                    {/* Computadora y Servidor */}
                                    {(equipo.tipo === 'Computadora' || equipo.tipo === 'Servidor') && (
                                        <>
                                            <label htmlFor="procesador" className="form-label nito">Procesador: </label>
                                            <br />
                                            <span className="form-span">{equipo.detalles.procesador}</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.nucleos} nucleos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.hilos} hilos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.cache} GB</span>
                                            <br />

                                            <label htmlFor="ram" className="form-label nito">Memoria RAM: </label>
                                            <span className="form-span">{equipo.detalles.memoria_RAM}</span>
                                            <br />

                                            <label htmlFor="almacenamiento" className="form-label nito">Almacenamiento: </label>
                                            <span className="form-span">{equipo.detalles.almacenamiento}</span>
                                            <br />

                                            <label htmlFor="tarjetaGrafica" className="form-label nito">Tarjeta Gráfica: </label>
                                            <span className="form-span">{equipo.detalles.tarjeta_grafica}</span>
                                            <br />

                                            <label htmlFor="sistemaOperativo" className="form-label nito">Sistema Operativo: </label>
                                            <br />
                                            <span className="form-span">{equipo.detalles.sistemaOperativo}</span>
                                            <br />
                                            <span className="form-span">Tipo de interfaz: {equipo.detalles.interfaz}</span>
                                            <br />
                                            <span className="form-span">Licencia: {equipo.detalles.licencia}</span>
                                            <br />

                                            <label htmlFor="configuracionRed" className="form-label nito">Configuración de red: </label>
                                            <span className="form-span">{equipo.detalles.tarjetaRed}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Impresora */}
                                    {(equipo.tipo === 'Impresora') && (
                                        <>
                                            <label htmlFor="tipoImpresora" className="form-label nito">Tipo de Impresora: </label>
                                            <span className="form-span">{equipo.detalles.tipo_impresora}</span>
                                            <br />
                                            <label htmlFor="resolucion" className="form-label nito">Resolución: </label>
                                            <span className="form-span">{equipo.detalles.resolucion}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span">{equipo.detalles.conectividad}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Switch */}
                                    {(equipo.tipo === 'Switch') && (
                                        <>
                                            <label htmlFor="numeroPuertos" className="form-label nito">Número de puertos: </label>
                                            <span className="form-span">{equipo.detalles.numero_puertos}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span">{equipo.detalles.velocidad}</span>
                                            <br />
                                            <label htmlFor="tipoSwitch" className="form-label nito">Tipo de Switch: </label>
                                            <span className="form-span">{equipo.detalles.tipo_switch}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span">{equipo.detalles.conectividad}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Router */}
                                    {(equipo.tipo === 'Router') && (
                                        <>
                                            <label htmlFor="tipoConexion" className="form-label nito">Tipo de conexión: </label>
                                            <span className="form-span">{equipo.detalles.tipo_conexion}</span>
                                            <br />
                                            <label htmlFor="soporteVPN" className="form-label nito">Soporte VPN: </label>
                                            <span className="form-span">{equipo.detalles.soporte_vpn}</span>
                                            <br />
                                            <label htmlFor="numeroInterfaces" className="form-label nito">Número de Interfaces Giga, Fast: </label>
                                            <span className="form-span">{equipo.detalles.numero_interfaces}</span>
                                            <br />
                                            <label htmlFor="numeroSeriales" className="form-label nito">Número de Seriales: </label>
                                            <span className="form-span">{equipo.detalles.numero_seriales}</span>
                                            <br />
                                            <label htmlFor="frecuenciaRuta" className="form-label nito">Frecuencia de Ruta: </label>
                                            <span className="form-span">{equipo.detalles.frecuencia_ruta}</span>
                                            <br />
                                            <label htmlFor="protocolosRuta" className="form-label nito">Prótocolos de Ruta: </label>
                                            <span className="form-span">{equipo.detalles.protocolos_ruta}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Switch y Router */}
                                    {(equipo.tipo === 'Switch' || equipo.tipo === 'Router') && (
                                        <>
                                            <label htmlFor="capacidad" className="form-label nito">Capacidad: </label>
                                            <span className="form-span">{equipo.detalles.capacidad}</span>
                                            <br />
                                            <label htmlFor="consumoEnergia" className="form-label nito">Consumo de Energía: </label>
                                            <span className="form-span">{equipo.detalles.consumo_energia}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Escáner */}
                                    {(equipo.tipo === 'Escaner') && (
                                        <>
                                            <label htmlFor="tipoEscaner" className="form-label nito">Tipo de Escaner: </label>
                                            <span className="form-span">{equipo.detalles.tipo_escaner}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span">{equipo.detalles.velocidad}</span>
                                            <br />
                                        </>
                                    )}

                                </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal4}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal5 && (
                <div className="modal-overlay" onClick={handleCloseModal5}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Diagnóstico</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">

                                        <div>
                                            <button className="tam-letra-17px color-boton-lila color-blanco btn-sin-border btn-tam-diagnostico btn-posicion">RFC</button>
                                        </div>
                                        
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal5}>Cancelar</button>
                                <button type="button" className="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}