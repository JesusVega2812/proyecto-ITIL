import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Departamentos/Departamento_Alta_Baja_Cambio.css';

export const Edificios = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [jefe, setJefe] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/SelectUsuarios');
                //setUsuario(response.data); // Guardar los usuarios en el estado
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };
        obtenerUsuarios();
    }, []); 

    const handleListo = async (e) => {
        e.preventDefault();
        if (radioCheck === 'Agregar') {
            await handleAgregar(); // Llamar a handleAgregar
        //} else if (radioCheck === 'Actualizar') {
        //    await handleActualizar(); // Llamar a handleActualizar
        //} else if (radioCheck === 'Eliminar') {
            //await handleEliminar(); // Asegúrate de definir handleEliminar si es necesario
        }
    };

    const handleAgregar = async () => {
        try {
            const response = await axios.post('http://localhost:3000/AltaUsuarios', {
                nombre: nombre,
                apellido: apellido,
                departamento: departamento,
                jefe: jefe,
                correo: correo,
                telefono: telefono,
                contrasenia: contrasenia
            });
            // Obtener y mostrar el resultado
            const resultado = response.data;
            console.log(resultado);
            alert('Usuario agregado exitosamente'); // Mensaje de éxito
        } catch (error) {
            alert("Hubo problemas al agregar el usuario");
            console.log(error.message);
        }
    };

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
    };

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };

    return (
        <>
            <div className="background-half"></div>
            <form className="form-container">
                <div className="form-wrapper">
                    <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Usuario</span>

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
                        <select className="form-select margin-top-20px" aria-label="Select usuario" value={nombre} onChange={(e) => setNombre(e.target.value)}>
                            <option value="">Selecciona el usuario</option>
                            {/* {usuario.map((user, index) => (
                                <option key={user.id} value={user.id}>{`${user.nombre} ${user.apellido}`}</option>
                            ))} */}
                        </select>
                    )}

                    {/* Campos de formulario */}
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="inputText" placeholder="Ingresa el nombre aquí" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputApellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="inputApellido" placeholder="Ingresa el apellido aquí" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDepartamento" className="form-label">Departamento al que pertenece</label>
                        <select className="form-select" id="inputDepartamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                            <option value="">Selecciona el departamento</option>
                            {/* {departamentos.map((dep, index) => (
                                <option key={index} value={dep.nombre}>{dep.nombre}</option>
                            ))} */}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputJefe" className="form-label">Jefe</label>
                        <select className="form-select" id="inputJefe" value={jefe} onChange={(e) => setJefe(e.target.value)}>
                            <option value="">Selecciona el Jefe</option>
                            {/* {departamentos.map((dep, index) => (
                                <option key={index} value={dep.nombre}>{dep.nombre}</option>
                            ))} */}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Ingresa el correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="inputPhone" placeholder="Ingresa el número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="mb-3 input-container">
                        <label htmlFor="inputContrasenia" className="form-label">Contraseña</label>
                        <input
                            type={mostrarContrasenia ? 'text' : 'password'}
                            className="form-control"
                            id="inputContrasenia"
                            placeholder="Ingresa la contraseña aquí"
                            value={contrasenia}
                            onChange={(e) => setContrasenia(e.target.value)}
                        />
                        <button
                            type="button"
                            className="show-password-button"
                            onClick={toggleMostrarContrasenia}
                        >
                            {mostrarContrasenia ? 'Ocultar' : 'Mostrar'}
                        </button>
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