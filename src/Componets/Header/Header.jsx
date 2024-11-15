import React, { useState, useEffect } from 'react';
import './Header.css';
import logo_culiacan from '../Resources/logo_tecnm_culiacan.jpg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();
    const [permisos, setPermisos] = useState('');

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        const storedPermisos = localStorage.getItem('permisos');
        if (storedUsuario) {
            setUsuario(storedUsuario);
        }
        if (storedPermisos) {
            setPermisos(storedPermisos);
        }
    }, []);

    const handleEditarPermisos = () => {
        if(permisos === '1'){
            navigate('/Editar_Administrador');
        }else if(permisos === '2'){
            navigate('/Editar_jefe_departamento');
        }else{
            alert('Permisos no validos para editar');
        }
    };

    return (
        <div>
            <div className='div-nombre-logo'>
                <span className='tam-letra-45px'>TechResolve</span>
                <br />
                <span className='tam-letra-28px nombre-escuela'>Instituto Tecnológico de Culiacán</span>
                <img src={logo_culiacan} className='loco-culiacan' alt="" />
            </div>
            <div className='div-inf-actual tam-letra-18px'>
                <div className='div-usuario-header'>
                    <button className='tam-letra-17px color-boton-lila color-blanco btn-sin-border tam-btn-header header-editar-btn' onClick={handleEditarPermisos}>&#x1f589;</button>
                    <span>Usuario: </span>
                    <span>{usuario}</span>
                </div>
            </div>
        </div>
    );
};