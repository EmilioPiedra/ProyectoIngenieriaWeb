import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        // Navegar a la ruta 'Dashboard' cuando se hace clic en el botón
        navigate('/Dashboard');
    };

    const user = auth.getUser();

    return (
        <PortalLayout>
            <div className="fondo-negro">
            <div className="user-info-container">
                <h1 className="text-3xl font-bold">Información de {user?.name}</h1>
                <div>
                    <strong>Nombre de usuario:</strong> {user?.userName}
                </div>
                <div>
                    <strong>ID:</strong> {user?.id}
                </div>
                <div>
                    <strong>Email:</strong> {user?.email}
                </div>
                <div>
                    <strong>Pais:</strong> {user?.pais}
                </div>
                <div>
                    <strong>Cédula:</strong> {user?.cedula}
                </div>
                <div>
                    <strong>Fecha de Nacimiento:</strong> {user?.fechaNacimiento}
                </div>
                {/* Puedes mostrar más detalles según la estructura de tu modelo de usuario */}
                <button type="button" onClick={handleClick}>
                    Continuar
                </button>
            </div>
        </div>
        <footer id='footerhome'>BikeRental@2023</footer>
        </PortalLayout>
    );
}
