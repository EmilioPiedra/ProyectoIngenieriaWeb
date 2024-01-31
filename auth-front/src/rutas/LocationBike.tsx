import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Branch } from '../types/types';
import { API_URL } from '../auth/constants';

export default function LocationBike() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [recogidaUbicacion, setRecogidaUbicacion] = useState('');
  const [recogidaFecha, setRecogidaFecha] = useState('');
  const [recogidaHora, setRecogidaHora] = useState('');
  const [devolucionUbicacion, setDevolucionUbicacion] = useState('');
  const [devolucionFecha, setDevolucionFecha] = useState('');
  const [devolucionHora, setDevolucionHora] = useState('');
  const { branches, setBranches } = auth

  useEffect(() => {
    auth.getBranches()
    console.log(auth.getUser());

  }, [])


  const handleClick1 = () => {
    const currentLocation = '/Dashboard';
    auth.saveCurrentLocation(currentLocation);
    navigate('/Dashboard');

  };



  const handleClick2 = () => {
    const currentLocation = '/ItemList';
    auth.saveOrderDetails({
      recogidaUbicacion: auth.currentBranch!._id,
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

      <div className="container">
        <div className="row">
          <div className="col-6 d-flex justify-content-start">
            <button type="button" id="regresarButton" className="btn btn-danger" onClick={handleClick1}>
              Regresar
            </button>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button type="button" id="continuarButton" className="btn btn-danger" onClick={handleClick2} disabled={!recogidaFecha || !recogidaHora || !devolucionUbicacion || !devolucionFecha || !devolucionHora}>
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
                <input type="text" readOnly value={auth.currentBranch?.name} />
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
                <select onChange={(x) => setDevolucionUbicacion(x.target.value)}>
                  <option value="">Seleccione una opción</option>
                  {branches.map(x => <option key={x._id} value={x._id} >{x.name}</option>)}
                </select>
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
      <footer id="footer">
        <div className="nombrefooter-item">BikeRental@2023</div>
      </footer>
    </PortalLayout>
  );
}
