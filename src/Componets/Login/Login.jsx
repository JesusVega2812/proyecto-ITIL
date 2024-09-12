import './Login.css';
import { useState } from 'react';
import axios from 'axios';

export const Login =() => {

    const [usuario,setUsuario] = useState("");
    const [contra,setContra] = useState("");
    
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
            
            if (response.data.esValido){
                alert('Bienvenido');
            }else{
                alert('Usuario y/o Contraseña');
            }
            console.log(response.data.esValido);
        } catch (error) {
            alert("Algo malo paso :(");  // Muestra el mensaje del error en una alerta
            console.log(error.message);
        }
    }

    return (
        <form className='formLogin' onSubmit={handledformsubmit}>
            <span>
                Inicio De Sesión
            </span>
            <div>
                <label>Usuario</label>
                <input value={usuario} onChange={(e) => setUsuario(e.target.value)}></input>
            </div>
            <div>
                <label>Contraseña</label>
                <input value={contra} onChange={(e) => setContra(e.target.value)} type='password'></input>
            </div>
            <div>
                <button onClick={handleValidar}>
                    Iniciar Sesión
                </button>
            </div>
        </form>
    );
}