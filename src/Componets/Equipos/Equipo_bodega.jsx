import '../Departamentos/Departamento_Alta_Baja_Cambio.css';
import './EquipoBodega.css'
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EquipoBodega = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [radioCheckEquipo, setRadioCheckEquipo] = useState('Computadora');

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/SelectDepartamentos');
            } catch (error) {
                console.error('Error al obtener los departamentos cliente:', error);
            }
        };
    
        obtenerDepartamentos();
    }, []);

    const handleListo = async (e) => {
        e.preventDefault();
    
        if (radioCheck === 'Agregar') {
            handleAgregar();
        } else if (radioCheck === 'Actualizar') {
            handleActualizar();
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar();
        }
        const response = await axios.get('http://localhost:3000/SelectDepartamentos');
       // setDepartamentos(response.data);
    };

    const handleAgregar = async() => {
        try {
            const response = await axios.get('http://localhost:3000/SelectDepartamentos');
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
                        <input type="text" className="form-control" id="inputText" placeholder="Ingresa el número de serie aquí"></input>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Costo</label>
                        <input type="text" className="form-control" id="inputText" placeholder="Ingresa el costo aquí (00.00)"></input>
                    </div>

                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Modelo</label>
                        <select className="form-select" >
                            <option value="" ></option>
                        </select>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Garantia</label>
                        <select className="form-select" >
                            <option value="" ></option>
                        </select>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Estado equipo</label>
                        <select className="form-select" >
                            <option value="" ></option>
                        </select>
                    </div>
                </div>
                <hr />

                {(radioCheckEquipo === 'Computadora') && (
                    <div className='EquipoBodega-form-columns'>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de computadora</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Computadora' || radioCheckEquipo === 'Servidor' ) && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Procesador</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Memoria RAM</label>
                            <input type="text" className="form-control" placeholder="Ingresa la memoria ram"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Almacenamiento</label>
                            <input type="text" className="form-control" placeholder="Ingresa el almacenamiento"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tarjeta Gráfica</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Sistema Operativo</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Configuración red</label>
                            <select className="form-select" >
                                <option value="" ></option>
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Computadora') && (
                    <div className='EquipoBodega-form-columns'>
                        <label className='form-label'>Softwares</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label" for="flexCheckDefault">
                                Default checkbox
                            </label>
                        </div>
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