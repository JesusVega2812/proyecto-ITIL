import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import logo_tecnm from '../Resources/logo_tecnm.jpg'
import { useNavigate } from "react-router-dom";


export const Login =() => {

    const [usuario,setUsuario] = useState("");
    const [contra,setContra] = useState("");
    const navigate = useNavigate();
    
    const handledformsubmit =(e) => {
        e.preventDefault();
    }

    const handleValidar =(e) => {
        e.preventDefault();
        if (!usuario){
            alert("Ingresa tu usuario");
            return;
        }
        if(!contra){
            alert("Ingresa tu Contraseña")
        }
        handleLogin();
    }

    const handleLogin =async() => {
        try {
            const response = await axios.post('http://localhost:3000/Login',{usuario: usuario,contra: contra});
            const resultado = response.data.esValido;
            if (resultado){
                alert('Bienvenido');
                navigate('/Principal');
            }else{
                alert('Usuario y/o Contraseña incorrectos');
            }
            console.log(resultado);
            console.log(resultado);


        } catch (error) {
            alert("Algo malo paso :(");  // Muestra el mensaje del error en una alerta
            console.log(error.message);
        }
    }

    return (
        <form className='formLogin' onSubmit={handledformsubmit}>
            <div className='Login-div-azul'></div>
            <div className='Login-div-IS'>
                <img src={logo_tecnm} className='logo-IS' alt="" />
                <br />
                <span className='IS-nombres nito tam-letra-28px tipo-letra-arial'>
                    SISTEMA CULIACÁN
                </span>
                <br />
                <span className='IS-nombres tam-letra-25px tipo-letra-arial'>
                    Inicio de Sesión
                </span>
                <div className='Login-div-credenciales margin-left-25px'>
                    <label className='tam-letra-20px tipo-letra-arial'>Usuario</label>
                    <br />
                    <input className='tam-input' placeholder='Usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)}></input>
                    <p></p>
                </div>
                <div className='margin-left-25px tipo-letra-arial'>
                    <label className='tam-letra-20px'>Contraseña</label>
                    <br />
                    <input className='tam-input' placeholder='Contraseña' value={contra} onChange={(e) => setContra(e.target.value)} type='password'></input>
                </div>
                <div>
                    <button className='margin-left-25px tam-btn color-boton-azul color-blanco nito sombra-50px tipo-letra-arial' onClick={handleValidar}>
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </form>
    );
}