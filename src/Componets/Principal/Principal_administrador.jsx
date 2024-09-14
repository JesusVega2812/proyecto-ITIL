import './Principal_administrador.css';

export const Principal_administrador = () => {
    return (
        <div className="principal-admin-container">
            <hr className="hr" /> {/* Línea horizontal */}
            <div className="principal-admin-buttons">
                <button type="button" className="btn btn-light principal-admin-btn">Inicio</button>
                <button type="button" className="btn btn-danger principal-admin-btn">Solicitudes</button>
                <button type="button" className="btn btn-primary principal-admin-btn">Reportes</button>
                <button type="button" className="btn btn-success principal-admin-btn">Contraseña</button>
                <button type="button" className="btn btn-info principal-admin-btn">Cerrar Sesión</button>
            </div>
        </div>
    );
}