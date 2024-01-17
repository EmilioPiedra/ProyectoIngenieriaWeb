import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const currentLocation = '/LocationBike'; // Obtén la ruta actual dinámicamente
    auth.saveCurrentLocation(currentLocation);
    navigate('/LocationBike');
  };

  return (
    <PortalLayout>
      <div className="fondo-negro">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <button type="button" id="regresarButton" className="btn btn-danger btn-block" onClick={handleClick}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer id='footersing'>BikeRental@2023</footer>
    </PortalLayout>
  );
}
