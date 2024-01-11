import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [recogidaUbicacion, setRecogidaUbicacion] = useState('');
    const [recogidaFecha, setRecogidaFecha] = useState('');
    const [recogidaHora, setRecogidaHora] = useState('');
    const [devolucionUbicacion, setDevolucionUbicacion] = useState('');
    const [devolucionFecha, setDevolucionFecha] = useState('');
    const [devolucionHora, setDevolucionHora] = useState('');

    const handleClick1 = () => {
        navigate('/Dashboard');
    };

    const handleClick2 = () => {
        navigate('/ItemList');
    };

    return (
        <PortalLayout>
            <h1 className="text-3xl font-bold">Información Ubicación de la Bicicleta</h1>
            <button type="button" onClick={handleClick1}>
                Regresar
            </button>
            <button type="button" onClick={handleClick2}>
                Continuar
            </button>
            <form>
                <div>
                    <label>Ubicación de Recogida:</label>
                    <input
                        type="text"
                        value={recogidaUbicacion}
                        onChange={(e) => setRecogidaUbicacion(e.target.value)}
                    />
                </div>
                <div>
                    <label>Fecha de Recogida:</label>
                    <input
                        type="date"
                        value={recogidaFecha}
                        onChange={(e) => setRecogidaFecha(e.target.value)}
                    />
                </div>
                <div>
                    <label>Hora de Recogida:</label>
                    <input
                        type="time"
                        value={recogidaHora}
                        onChange={(e) => setRecogidaHora(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ubicación de Devolución:</label>
                    <input
                        type="text"
                        value={devolucionUbicacion}
                        onChange={(e) => setDevolucionUbicacion(e.target.value)}
                    />
                </div>
                <div>
                    <label>Fecha de Devolución:</label>
                    <input
                        type="date"
                        value={devolucionFecha}
                        onChange={(e) => setDevolucionFecha(e.target.value)}
                    />
                </div>
                <div>
                    <label>Hora de Devolución:</label>
                    <input
                        type="time"
                        value={devolucionHora}
                        onChange={(e) => setDevolucionHora(e.target.value)}
                    />
                </div>
            </form>
        </PortalLayout>
    );
}
