import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar a la ruta 'ItemList' cuando se hace clic en el botón
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
    </PortalLayout>
  );
}
