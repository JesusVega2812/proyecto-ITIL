import React, { useState, useEffect } from 'react';
import './Header.css';
import logo_tr from '../Resources/TechResolve.jpg';

export const Header_sin_editar = () => {
    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        if (storedUsuario) {
            setUsuario(storedUsuario);
        }
    }, []);

    return (
        <div className='div-general'>
            <div className='div-nombre-logo'>
                <span className='tam-letra nito'>T</span>
                <span className='tam-letra-17px'>ech</span>
                <span className='tam-letra nito'>R</span>
                <span className='tam-letra-17px'>esolve</span>
            </div>
            <div className='div-inf-actual tam-letra-18px'>
                <div className='div-usuario-header'>
                    <span className='nito'>{usuario}</span>
                </div>
            </div>
        </div>
    );
};