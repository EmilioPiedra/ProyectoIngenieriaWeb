import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function LocationBike() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [recogidaUbicacion, setRecogidaUbicacion] = useState('');
  const [recogidaFecha, setRecogidaFecha] = useState('');
  const [recogidaHora, setRecogidaHora] = useState('');
  const [devolucionUbicacion, setDevolucionUbicacion] = useState('');
  const [devolucionFecha, setDevolucionFecha] = useState('');
  const [devolucionHora, setDevolucionHora] = useState('');
  const location = useLocation();

  const handleClick1 = () => {
    const currentLocation = '/Dashboard';
    auth.saveCurrentLocation(currentLocation);
    navigate('/Dashboard');

  };

  const handleClick2 = () => {
    const currentLocation = '/ItemList';
    auth.saveOrderDetails({
      recogidaUbicacion,
      recogidaFecha,
      recogidaHora,
      devolucionUbicacion,
      devolucionFecha,
      devolucionHora,
    });
    auth.saveCurrentLocation(currentLocation);
    navigate('/ItemList');
  };

  return (
    <PortalLayout>
      <div className="fondo-negro">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <button type="button" id="regresarButton" className="btn btn-danger btn-block" onClick={handleClick1}>
                Regresar
              </button>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button type="button" id="continuarButton" className="btn btn-danger" onClick={handleClick2}>
                Continuar
              </button>
            </div>
          </div>
        </div>
        <p></p>
        <p></p>
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
      </div>
      <footer id='footersing'>BikeRental@2023</footer>
    </PortalLayout>
  );
}
