import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import logoImage from "../imagenes/rueda-dentada.png";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <header>
                <nav className="navbar navbar-dark bg-be0f30 custom-navbar">
                    <div className="container-fluid" >
                        <div className="navbar-brand d-flex align-items-center">
                            <img
                                src={logoImage}
                                alt="Logo"
                                style={{ width: "40px", height: "40px", marginRight: "15px" }}
                            />
                            <Link to="/" className="nav-link">
                                <h1 className='name' style={{ display: "inline", color: "black" }}>BikeRental</h1>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center">
                            <Icon icon="bx:user" className="icono-usuario" style={{ color: 'white', fontSize: '40px' }} />
                            <Link to="/login" className="nav-link mx-3" style={{ color: 'white' }}>
                                <h2 className='login'>Iniciar Sesión</h2>
                            </Link>

                        </div>
                    </div >
                </nav >
            </header>
            <main>{children}</main>
        </>
    );
}