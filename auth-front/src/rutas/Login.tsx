import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import logoImage from "../imagenes/rueda-dentada.png";
export default function Login() {

    return (<>
        <header>
            <nav className="navbar navbar-dark bg-be0f30 custom-navbar">
                <div className="container-fluid" >
                    <div className="navbar-brand d-flex align-items-center">
                        <img
                            src={logoImage}
                            alt="Logo"
                            style={{ width: "50px", height: "50px", marginRight: "15px" }}
                        />
                        <Link to="/" className="nav-link">
                            <h1 style={{ display: "inline", color: "black" }}>BikeRental</h1>
                        </Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <Icon icon="bx:user" className="icono-usuario" style={{ color: 'white' }} />
                        <Link to="/login" className="nav-link mx-3" style={{ color: 'white' }}>
                            <h2>Iniciar Sesión</h2>
                        </Link>

                        <Link to="/signup" className="nav-link" style={{ color: 'white' }}>
                            <h2>Registrarse</h2>
                        </Link>
                    </div>
                </div >
            </nav >
        </header>
     <p></p>
        <div className="login-container">
      <h1>Iniciar Sessión</h1>
      <form className="login-form">
        <label htmlFor="username">Correo</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Iniciar Sessión</button>
      </form>
    </div>
    </>);
}