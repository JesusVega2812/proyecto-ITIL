import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import logo_tecnm from '../Resources/logo_tecnm.jpg';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contra, setContra] = useState("");
    const navigate = useNavigate();
    
    const handledformsubmit = (e) => {
        e.preventDefault();
    }

    const handleValidar = (e) => {
        e.preventDefault();
        if (!usuario) {
            alert("Ingresa tu usuario");
            return;
        }
        if (!contra) {
            alert("Ingresa tu Contraseña");
            return;
        }
        handleLogin();
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Login', { usuario: usuario, contra: contra });
            alert('Envio datos a la api');
            const { esValido, idUsuario, idDepartamentoPertenece} = response.data;
            alert(`id usuario ${idUsuario}`)
            if (esValido) {
                localStorage.setItem('usuario', usuario);
                localStorage.setItem('idUsuario', idUsuario);
                alert(`Si se guardo el id usuario es: ${idUsuario}`);
                localStorage.setItem('idDepartamentoPertenece', idDepartamentoPertenece);
                alert(`Si se guardo el id departamento que pertenece es: ${idDepartamentoPertenece}`);
                await handlePermisos();
                alert('Bienvenido');
                navigate('/Principal');
            } else {
                alert('Usuario y/o Contraseña incorrectos');
            }
        } catch (error) {
            alert("Algo malo pasó :(");
            console.error("Error en la solicitud de inicio de sesión:", error.response ? error.response.data : error.message);
        }
    }

    const handlePermisos = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Permisos', { usuario: usuario });
            const resultado = response.data.permisos;

            console.log(resultado);
            alert(resultado);

            if (resultado > 0) {
                localStorage.setItem('permisos', resultado);
            } else {
                alert('No se pudo obtener sus permisos');
            }
        } catch (error) {
            alert("Algo malo pasó :( Permisos");  // Muestra el mensaje del error en una alerta
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
                    TechResolve - CULIACÁN
                </span>
                <br />
                <span className='IS-nombres tam-letra-25px tipo-letra-arial'>
                    Inicio de Sesión
                </span>

                <div className="form-group">
                    <label htmlFor="inputText" className="form-label-custom">Usuario</label>
                    <input type="text" className="input-custom" id="inputText" placeholder="Ingresa el usuario aquí" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputContrasenia" className="form-label-custom">Contraseña</label>
                    <input type="password" className="input-custom" id="inputContrasenia" placeholder="Ingresa la contraseña aquí" value={contra} onChange={(e) => setContra(e.target.value)} />
                </div>
                <div className="button-group">
                    <button onClick={handleValidar} className='button-custom'>
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </form>
    );
}