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
        <div>
            <label htmlFor="">Se esta trabajando</label>
        </div>
    );
}