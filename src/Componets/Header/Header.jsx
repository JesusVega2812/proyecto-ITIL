import './Header.css';
import logo_culiacan from '../Resources/logo_tecnm_culiacan.jpg';

export const Header = () => {
    return(
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
                    <button className='tam-letra-17px color-boton-lila color-blanco btn-sin-border tam-btn-header header-editar-btn'>&#x1f589;</button>
                    <span>Usuario: </span>
                    <span>NOMBREEEE Y APELLIDOOOO</span>
                </div>
            </div>
        </div>
    )
}