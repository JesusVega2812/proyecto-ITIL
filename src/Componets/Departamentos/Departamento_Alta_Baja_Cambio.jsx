import { useNavigate } from "react-router-dom"
import './Departamento_Alta_Baja_Cambio.css';
import React, { useState } from "react";
import axios from "axios";


export const Departamento_Alta_Baja_Cambio =() => {

    const [radioCheck,setRadioCheck] = useState('Agregar');
    const [nombre,setNombre] = useState('');
    const [departamentoPadre,setDepartamentoPadre] = useState('');
    const [correo,setCorreo] = useState('');
    const [telefono,setTelefono] = useState('');
    const [ubicacion,setUbicacion] = useState(null);

    const handleAgregar = async(e) => {
        e.preventDefault(); // Asegúrate de que esto esté al principio para prevenir el comportamiento predeterminado del formulario
        try{
            const response = await axios.post('http://localhost:3000/AltaDepartamentos',{
                nombre:nombre,
                departamentoPadre:departamentoPadre,
                correo:correo,
                telefono:telefono,
                ubicacion:ubicacion
            });
            // Obtener y mostrar el resultado
        const resultado = response.data;
        console.log(resultado);
        alert('Departamento insertado exitosamente'); // Mensaje de éxito
        }catch(error){
            alert("Hubo problemas");
            console.log(error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        setUbicacion(file); // Almacena la imagen en el estado
    };

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
    };
   
    return(
        <form>
            <div className='Login-div-azul'></div>

            <div className='Login-div-IS'>
                <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Departamento</span>

                <div className="depCheck ">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} ></input>
                        <label class="form-check-label" for="inlineRadio1">Agregar</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'}></input>
                        <label class="form-check-label" for="inlineRadio1">Actualizar</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'}></input>
                        <label class="form-check-label" for="inlineRadio1">Eliminar</label>
                    </div>
                </div>

                {(radioCheck === 'Actualizar' || radioCheck === 'Eliminar') && (
                    <select class="form-select" aria-label="Disabled select example" >
                        <option selected>Selecciona el departamento</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                )}

                <div className="mb-3">
                    <label htmlFor="inputText" className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="inputText" placeholder="Ingresa el departamento aquí" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputText" className="form-label">Departamento al que pertence</label>
                    <select class="form-select" aria-label="Disabled select example" value={departamentoPadre} onChange={(e) => setDepartamentoPadre(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Ingresa el correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label" value={'telefono'}>Teléfono</label>
                    <input type="tel" className="form-control" id="inputPhone" placeholder="Ingresa el número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputFile" className="form-label" >Cargar Imagen</label>
                    <input type="file" className="form-control" id="inputFile"  accept="image/*"  onChange={handleImageChange}/>
                </div>

                <div>
                    <button  onClick={handleAgregar} className='margin-left-25px tam-btn color-boton-azul color-blanco nito sombra-50px tipo-letra-arial'>
                        Listo
                    </button>
                </div>
            </div>
        </form>
    )
}