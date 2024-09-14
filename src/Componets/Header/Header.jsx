import React, { useState, useEffect } from 'react';
import './Header.css';
import logo_culiacan from '../Resources/logo_tecnm_culiacan.jpg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el usuario almacenado en localStorage
        const storedUsuario = localStorage.getItem('usuario'); // Asegúrate de que 'usuario' es la clave correcta
        if (storedUsuario) {
            setUsuario(storedUsuario);
        }
    }, []);

    const handleEditarPermisos = () => {
        const permisos = localStorage.getItem('permisos');
        if(permisos === '1'){
            navigate('/Editar_Administrador');
        }else if(permisos === '2'){
            navigate('/Editar_jefe_departamento');
        }else{
            alert('Permisos no validos para editar');
        }
    }

    return (
        <div>
            <div className='div-nombre-logo'>
                <span className='tam-letra-45px'>Control de Mantenimiento</span>
                <br />
                <span className='tam-letra-28px nombre-escuela'>Instituto Tecnológico de Culiacán</span>
                <img src={logo_culiacan} className='loco-culiacan' alt="" />
            </div>
            <div className='div-inf-actual tam-letra-18px'>
                <div>
                    <span>Periodo: </span>
                    <span> MIN-MFI AÑOO </span>
                    <button className='tam-letra-17px color-boton-azul color-blanco btn-sin-border tam-btn-header'>&#x21c4; Cambiar Periodo</button>
                </div>
                <div className='div-usuario-header'>
                    <button className='tam-letra-17px color-boton-lila color-blanco btn-sin-border tam-btn-header header-editar-btn' onClick={handleEditarPermisos}>&#x1f589;</button>
                    <span>Usuario: </span>
                    <span>{usuario}</span>
                </div>
            </div>
        </div>
    );
};