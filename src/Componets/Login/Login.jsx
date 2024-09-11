import './Login.css';

export const Login =() => {
    return (
        <form className='formLogin'>
            <span>
                Inicio De Sesión
            </span>
            <div>
                <label>Usuario</label>
                <input></input>
            </div>
            <div>
                <label>Contraseña</label>
                <input></input>
            </div>
            <div>
                <button>
                    Iniciar Sesión
                </button>
            </div>
        </form>
    );
}