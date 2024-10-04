import React, { useState, useEffect } from 'react';
import './Header.css';
import logo_culiacan from '../Resources/logo_tecnm_culiacan.jpg';

export const Header_sin_editar = () => {
    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            setUsuario(storedUsuario);
        }
    }, []);

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
                    <span>Usuario: </span>
                    <span>{usuario}</span>
                </div>
            </div>
        </div>
    );
};