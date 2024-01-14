import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function LocationBike() {
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
        // Guardar la información en el contexto de autenticación
        auth.saveOrderDetails({
            recogidaUbicacion,
            recogidaFecha,
            recogidaHora,
            devolucionUbicacion,
            devolucionFecha,
            devolucionHora,
        });

        navigate('/ItemList');
    };

    return (
        <PortalLayout>
      <head>
    <title>
      <strong>Información Ubicación de la Bicicleta</strong>
    </title>
  </head>
        <body>
        <div className="button-container">
              <button type="button" id="regresarButton" onClick={handleClick1}>
                Regresar
              </button>
              <button type="button" id="continuarButton" onClick={handleClick2}>
                Continuar
              </button>
            </div>
          <div className="main-container">
            <h1 className="text-3xl font-bold">Información Ubicación de la Bicicleta</h1>
          
            <div className="centered-form-container">
              <form className="centered-form">
                <div className="column">
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
                </div>
                <div className="column">
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
                </div>
              </form>
            </div>
          </div>
        </body>
      </PortalLayout>
      

      
    );
}
