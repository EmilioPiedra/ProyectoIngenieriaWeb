import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        const previousLocation = auth.getCurrentLocation();
        auth.saveCurrentLocation('/UserInfo');
        navigate(previousLocation || '/Dashboard');
    };
    const user = auth.getUser();

    return (
        <PortalLayout>
            <h1 className="text-3xl font-bold">Información de {user?.name}</h1>
            <div className="user-info-container">

                <div>
                    <strong>Nombre de usuario:</strong> {user?.userName}
                </div>
                <div>
                    <strong>ID:</strong> {user?.id}
                </div>
                <div>
                    <strong>Nombre:</strong> {user?.name}
                </div>
                {/* Puedes mostrar más detalles según la estructura de tu modelo de usuario */}
                <button type="button" onClick={handleClick}>
                    Regresar
                </button>
            </div>

            <footer id="footer">
                <div className="nombrefooter-item">BikeRental@2023</div>
            </footer>
        </PortalLayout>
    );
}
