import '../Departamentos/Departamento_Alta_Baja_Cambio.css';
import './EquipoBodega.css'
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EquipoBodega = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [radioCheckEquipo, setRadioCheckEquipo] = useState('Computadora');
    const [modelos, setModelos] = useState([]);
    const [modelo,setModelo] = useState('');
    const [estadosEquipo, setEstadosEquipo] = useState(['En uso','En reparacion','Ya no sirve','Disponible']);
    const [estadoEquipo, setEstadoEquipo] = useState('Disponible');
    const [computadoraTipos, setComputadoraTipos] = useState([]);
    const [computadoraTipo, setComputadoraTipo] = useState('');
    const [procesadores, setProcesadores] = useState([]);
    const [procesador, setProcesador] = useState('');
    const [graficas, setGraficas] = useState([]);
    const [graficaSelected, setGraficaSelected] = useState('');
    const [sistemas, setSistemas] = useState([]);
    const [sistemaSelected, setSistemaSelected] = useState('');
    const [confiRedes, setConfiRedes] = useState([]);
    const [confiRed, setConfiRed] = useState('');
    const [softwares, setSoftwares] = useState([]);
    const [softwaresSelected, setSoftwaresSelected] = useState([]);
    const [numeroSerie, setNumeroSerie] = useState('');
    const [costoEquipo, setCostoEquipo] = useState('');
    const [ram, setRAM] = useState('');
    const [memoria, setMemoria] = useState('');


    useEffect(() => {
        selectModelo();
        selectTipoComputadora();
        selectProcesador();
        selectGrafica();
        selectSistemas();
        selectConfiguracionRed();
        selectSoftwares();
    }, []);

    const selectSoftwares = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectSoftwares');
            setSoftwares(response.data);
        } catch (error) {
            console.error('Error al obtener los softwares', error);
        }
    };

    const selectConfiguracionRed = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ConfiguracionRed');
            setConfiRedes(response.data);
            setConfiRed(response.data[0].id_tarjeta);
        } catch (error) {
            console.error('Error al obtener las configuraciones de red', error);
        }
    };

    const selectSistemas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectSistemasOperativos');
            setSistemas(response.data);
            setSistemaSelected(response.data[0].id_sistema);
        } catch (error) {
            console.error('Error al obtener los sistemas operativos', error);
        }
    };

    const selectGrafica = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectGrafica');
            setGraficas(response.data);
            setGraficaSelected(response.data[0].id_tarjeta);
        } catch (error) {
            console.error('Error al obtener las tarjetas graficas', error);
        }
    };

    const selectModelo = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectModelos');
            setModelos(response.data);
            setModelo(response.data[0].id_modelo);
        } catch (error) {
            console.error('Error al obtener loa modelos de equipos', error);
        }
    };

    const selectTipoComputadora = async () => {
        try {
            const response = await axios.get('http://localhost:3000/selectTipoComputadora');
            setComputadoraTipos(response.data);
            setComputadoraTipo(response.data[0].id_tipoComputadora);
        } catch (error) {
            console.error('Error al obtener los tipo de computadora:', error);
        }
    };

    const selectProcesador = async () => {
        try {
            const response = await axios.get('http://localhost:3000/selectProcesador');
            setProcesadores(response.data);
            setProcesador(response.data[0].id_procesador);
        } catch (error) {
            console.error('Error al obtener los procesadores:', error);
        }
    };

    const handleListo = async (e) => {
        e.preventDefault();
    
        if (radioCheck === 'Agregar') {
            handleAgregar();
        } else if (radioCheck === 'Actualizar') {
            handleActualizar();
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar();
        }
        //const response = await axios.get('http://localhost:3000/SelectDepartamentos');
       // setDepartamentos(response.data);
    };

    const handleAgregar = async() => {
        try {
            if(radioCheckEquipo === 'Computadora') {
                const response = await axios.post('http://localhost:3000/AltaComputadora', {
                    numeroSerie: numeroSerie,
                    costo: costoEquipo,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    tipo: computadoraTipo,
                    procesador: procesador,
                    RAM: ram,
                    memoria: memoria,
                    tarjetaGrafica: graficaSelected,
                    sistemaOperativo: sistemaSelected,
                    tarjetaRed: confiRed,
                    softwares: softwaresSelected
                    //Se ocupa mandar el id usuario, el que esta logeado y la fecha de compra, la actual
                    //Pero ya queria mimir no peye ser
                });
            }
            alert('Equipo insertado exitosamente');
            limpiar();
        } catch (error) {
            alert("Hubo problemas al agregar equipo");
            console.log(error.message);
        }
    };

    const handleActualizar = async () => {
        try {
            const response = await axios.put('http://localhost:3000/ActualizarDepartamento', {
                /*id_departamento: id,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                ubicacion_dep: ubicacion,
                id_departamentoPadre: idDepPadre*/
            });
    
            const resultado = response.data;
            console.log('Resultado de la actualización:', resultado);
            alert('Equipo actualizado exitosamente');
            limpiar();
        } catch (error) {
            console.error('Hubo problemas:', error.message);
            alert('Hubo problemas al actualizar el equipo');
        }
    };
    
    const handleEliminar = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/EliminarDepartamento/`);
            console.log('Departamento eliminado:', response.data);
            alert('Equipo eliminado exitosamente');
            limpiar();
        } catch (error) {
            console.error('Error al eliminar el equipo:', error.message);
            alert('Hubo problemas al eliminar el equipo');
        }
    };

    const handleSelectedCheck = async (e) => {
        e.preventDefault();

    };

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
        limpiar();
    };

    const handleRadioChangeEquipo = (event) => {
        const valueCheckEquipo = event.target.value;
        setRadioCheckEquipo(valueCheckEquipo);
        console.log(valueCheckEquipo);
        limpiar();
    };
    
    const handleSelectedComSer = (event) => {

    };

    const handleCheckboxChange = (id) => {
        const seleccionados = []
        if (softwaresSelected.includes(id)) {
            // Si ya está seleccionado, lo quitamos
            setSoftwaresSelected(softwaresSelected.filter((selectedId) => selectedId !== id));
            
        } else {
            // Si no está seleccionado, lo agregamos
            setSoftwaresSelected([...softwaresSelected, id]);
        }
        console.log(softwaresSelected);
        
    };

   const limpiar = () => {
        //setDepartamento('Seleccione el departamento')
        //setDepartamentoPadre('Seleccione el departamento');
        //setNombre('');
        //setNomPadre('No depende de otro departamento');
        //setCorreo('');
        //setTelefono('');
   }

    return (
        <form className="EquipoBodega-form-container">
            <div className='background-half'></div>
            <div className='EquipoBodega-form-wrapper'>
                <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Equipo</span>
                <div className="EquipoBodega-radio-group ">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} ></input>
                        <label className="form-check-label" htmlFor="idRadioAgregar">Agregar</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'}></input>
                        <label className="form-check-label" htmlFor="idRadioActualizar">Actualizar</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'}></input>
                        <label className="form-check-label" htmlFor="idRadioEliminar">Eliminar</label>
                    </div>
                </div>
                <hr />
                <div className="EquipoBodega-radio-group ">
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
                </div>

                <div className="EquipoBodega-form-columns">
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Número de serie</label>
                        <input value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} type="text" className="form-control" id="inputText" placeholder="Ingresa el número de serie aquí"></input>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Costo</label>
                        <input value={costoEquipo} onChange={(e) => setCostoEquipo(e.target.value)} type="text" className="form-control" id="inputText" placeholder="Ingresa el costo aquí (00.00)"></input>
                    </div>

                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Modelo</label>
                        <select className="form-select" value={modelo} onChange={(e) => setModelo(e.target.value)} >  
                            {modelos.map((mod, index) => (
                                <option key={mod.id} value={mod.id_modelo}>{mod.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Garantia</label>
                        <select className="form-select" >
                            <option value="" >No hay garantia</option>
                        </select>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Estado equipo</label>
                        <select className="form-select" value={estadoEquipo} onChange={(e) => setEstadoEquipo(e.target.value)}>
                            {estadosEquipo.map((est, index) => (
                                <option key={index} value={est}>{est}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr />

                {(radioCheckEquipo === 'Computadora') && (
                    <div className='EquipoBodega-form-columns'>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de computadora</label>
                            <select className="form-select" value={computadoraTipo} onChange={(e) => setComputadoraTipo(e.target.value)}>
                                {computadoraTipos.map((tipo, index) =>(
                                    <option key={tipo.id_tipoComputadora} value={tipo.id_tipoComputadora} >{tipo.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Computadora' || radioCheckEquipo === 'Servidor' ) && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Procesador</label>
                            <select className="form-select" value={procesador} onChange={(e) => setProcesador(e.target.value)}>
                                {procesadores.map((pro, index) => (
                                    <option value={pro.id_procesador} key={pro.id_procesador} >{`${pro.modelo}, ${pro.fabricante}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Memoria RAM</label>
                            <input value={ram} onChange={(e) => setRAM(e.target.value)}  type="text" className="form-control" placeholder="Capacidad en GB"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Almacenamiento</label>
                            <input value={memoria} onChange={(e) => setMemoria(e.target.value)}  type="text" className="form-control" placeholder="Capacidad en GB"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tarjeta Gráfica</label>
                            <select className="form-select" value={graficaSelected} onChange={(e) => setGraficaSelected(e.target.value)}>
                                {graficas.map((gra,index) => (
                                    <option value={gra.id_tarjeta} key={gra.id_tarjeta} >{`${gra.modelo}, ${gra.fabricante}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Sistema Operativo</label>
                            <select className="form-select" value={sistemaSelected} onChange={(e) => setSistemaSelected(e.target.value)}>
                                {sistemas.map((sis,index) => (
                                    <option value={sis.id_sistema} key={sis.id_sistema} >{`${sis.nombre}, ${sis.version_}, con ${sis.interfaz}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Configuración red</label>
                            <select className="form-select" value={confiRed} onChange={(e) => setConfiRed(e.target.value)}>
                                {confiRedes.map((conf,index) => (
                                    <option value={conf.id_tarjeta} key={conf.id_tarjeta} >{`${conf.modelo}, ${conf.fabricante}`}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Computadora') && (
                    <div>
                    <label htmlFor="inputText" className="form-label margin-top-sfw">Softwares</label>
                    {softwares.map((software) => (
                        <div className="form-check" key={software.id_software}>
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                value={software.id_software}
                                //checked={softwaresSelected.includes(software.id_software)}
                                onChange={() => handleCheckboxChange(software.id_software)}
                            />
                            <label className="form-check-label" htmlFor={software.id_software}>
                                {`${software.nombre}, ${software.version_}`}
                            </label>
                        </div>
                    ))}
                </div>
                )}

                {(radioCheckEquipo === 'Impresora') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de impresora</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Resolución</label>
                            <input type="text" className="form-control"  placeholder="Ingresa la resolución"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText"className="form-label">Conectividad</label>
                            <input type="text" className="form-control" placeholder="Ingresa la conectividad"></input>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Switch') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Números de puertos</label>
                            <input type="number" className="form-control"  placeholder="Ingresa los números de puertos"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Velocidad</label>
                            <input type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa la velocidad' />
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de switch</label>
                            <input type="text" className="form-control" placeholder="Ingresa el tipo de switch"></input>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Router') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de conexión</label>
                            <input type="text" className="form-control" placeholder="Ingresa el tipo de conexión"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            {/* (SI O NO) */}
                            <label htmlFor="inputText" className="form-label">Soporte VPN</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Números de interfases Giga fast</label>
                            <input type="number" className="form-control"  placeholder="Ingresa los números de interfases Giga fast"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Números de Seriales</label>
                            <input type="number" className="form-control"  placeholder="Ingresa los números de seriales"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Frecuencia ruta</label>
                            <input type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa la frecuencia ruta' />
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Protocolos ruta</label>
                            <input type="text" className="form-control" placeholder="Ingresa los protocolos ruta"></input>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Switch' || radioCheckEquipo === 'Router') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Capacidad</label>
                            <input type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa la capacidad' />
                        </div>
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Consumo de energía</label>
                            <input type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa el consumo de energía' />
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Escaner') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de Escaner</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Impresora' || radioCheckEquipo === 'Escaner') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Velocidad</label>
                            <input type="text" className="form-control" placeholder="Ingresa la velocidad"></input>
                        </div>
                    </div>
                )}

                <div className="d-grid gap-2">
                    <button className='color-boton-azul submit-btn color-blanco margin-top-btn-listo' type="submit" onClick={handleListo}>Listo</button>
                </div>
            </div>
        </form>
    );
}