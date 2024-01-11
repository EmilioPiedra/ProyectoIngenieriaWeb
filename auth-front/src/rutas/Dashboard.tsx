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
      <h1 className="text-3xl font-bold">Dashboard de {auth.getUser()?.name}</h1>
      <button type="button" onClick={handleClick}>
        Continuar
      </button>
    </PortalLayout>
  );
}
