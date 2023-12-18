import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import logoImage from "../imagenes/rueda-dentada.png";

export default function Signup() {
    return <>
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
      <h1>Registrarse</h1>
      <form className="login-form">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="apellido">Apellido</label>
        <input type="text" id="apellido" name="apellido" />

        <label htmlFor="UserName">UserName</label>
        <input type="text" id="UserName" name="UserName" />

        <label htmlFor="pais">Pais</label>
        <input type="text" id="pais" name="pais" />

        <label htmlFor="email">Correo Electronico</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="cedula">Cédula</label>
        <input type="text" id="cedula" name="cedula" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" />

        
        <label htmlFor="password">Confirmar contraseña</label>
        <input type="password" id="password" name="password" />

        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
        <input type="date" id="fechaNacimiento" name="fechaNacimiento" />
        

        <button type="submit">Registrar</button>
      </form>
    </div>
    </>;
}