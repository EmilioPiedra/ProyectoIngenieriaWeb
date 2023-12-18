import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import logoImage from "../imagenes/rueda-dentada.png";

export default function Signup() {
    return <>
        <header>
            <nav className="navbar navbar-dark bg-primary custom-navbar">
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
    </>;
}