import { useAuth } from '../auth/AuthProvider';
import PortalLayout from '../layout/PortalLayout';
import { useNavigate } from 'react-router-dom';

export default function PayMetod() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleClick1 = () => {
        // Navegar a la ruta 'ItemList' cuando se hace clic en el botón
        navigate('/ItemList');
    };

    const handleClick2 = () => {
        // Navegar a la ruta 'ItemList' cuando se hace clic en el botón
        navigate('/PayMetod');
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
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}
