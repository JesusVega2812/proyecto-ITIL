import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Edificios/Edificios.css';

export const Edificios = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [id_edificio, setId_edificio] = useState('');
    const [nombre, setNombre] = useState('');
    const [ubicacion_edificio, setUbicacion_edificio] = useState('');

    const handleListo = async (e) => {
        e.preventDefault();
        if (radioCheck === 'Agregar') {
            await handleAgregar(); // Llamar a handleAgregar
        } else if (radioCheck === 'Actualizar') {
            await handleActualizar(); // Llamar a handleActualizar
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar(); // Asegúrate de definir handleEliminar si es necesario
        }
    };

    const handleAgregar = async () => {
        if (!nombre || !ubicacion_edificio) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/AltaEdificio', {
                nombre: nombre,
                ubicacion_edificio: ubicacion_edificio
            });
            const resultado = response.data;
            console.log(resultado);
            alert('Edificio agregado exitosamente'); // Mensaje de éxito
        } catch (error) {
            console.error("Error al agregar el edificio:", error.message);
            alert(`Hubo problemas al agregar el edificio: ${error.message}`);
        }
    };

    const handleActualizar = async () => {
        try {
            const response = await axios.put('http://localhost:3000/ActualizarEdificio', {
                id_edificio: id_edificio,
                nombre: nombre,
                ubicacion_edificio: ubicacion_edificio
            });
    
            const resultado = response.data;
            console.log('Resultado de la actualización:', resultado);
            alert('Departamento actualizado exitosamente');
        } catch (error) {
            console.error('Hubo problemas:', error.message);
            alert('Hubo problemas al actualizar el departamento');
        }
    };

    const handleEliminar = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/EliminaEdificio`, {
                params: {
                    id_edificio: id_edificio
                }
            });
            const resultado = response.data;
            console.log(resultado);
    
            if (resultado.success) {
                alert('Edificio eliminado exitosamente'); // Mensaje de éxito
            } else {
                alert(`No se pudo eliminar el edificio: ${resultado.message}`);
            }
        } catch (error) {
            console.error("Error al eliminar el edificio:", error.message);
            alert(`Hubo problemas al eliminar el edificio: ${error.message}`);
        }
    };
    

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
        limpiar();
    };

    const limpiar = () => {
        setId_edificio('');
        setNombre('');
        setUbicacion_edificio('');
   }

    return (
        <>
            <div className="background-half"></div>
            <form className="form-container">
                <div className="form-wrapper">
                    <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Edificio</span>

                    <div className="depCheck margin-top-20px">
                        {/* Radio buttons */}
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} />
                            <label className="form-check-label" htmlFor="idRadioAgregar">Agregar</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'} />
                            <label className="form-check-label" htmlFor="idRadioActualizar">Actualizar</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'} />
                            <label className="form-check-label" htmlFor="idRadioEliminar">Eliminar</label>
                        </div>
                    </div>

                    {(radioCheck === 'Actualizar' || radioCheck === 'Eliminar') && (
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Id Edificio</label>
                        <input type="text" className="form-control" id="inputText" placeholder="Ingresa id de edificio aqui" value={id_edificio} onChange={(e) => setId_edificio(e.target.value)} />
                    </div>
                    )}

                    {/* Campos de formulario */}
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="inputText" placeholder="Ingresa nombre de edificio aqui" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputUbicacion" className="form-label">Ubicacion</label>
                        <input type="text" className="form-control" id="inputUbicacion" placeholder="Ingresa ubicacion aquí" value={ubicacion_edificio} onChange={(e) => setUbicacion_edificio(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <button onClick={handleListo} className='color-boton-azul submit-btn color-blanco'>
                            Listo
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
